import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl, Form} from '@angular/forms';
import {IncomeDto} from '../income-dto';
import {IncomeService} from '../income.service';
import {Recurrence} from '../../shared/etc/recurrence';
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {

  @Input() incomeList: IncomeDto[];
  incomeForm: FormGroup;
  columns: string[];
  allIncomeControls: string[] = ['type', 'recurrence', 'currentAmount', 'goalAmount', 'yearlyAmount', 'id'];
  displayedControls: string[] = ['type', 'recurrence', 'currentAmount', 'goalAmount', 'yearlyAmount'];
  recurrence = Object.keys(Recurrence);
  hideSuccessMessage = false;
  toRemoveIds: number[] = [];


  constructor(private incomeService: IncomeService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder) {
    this.columns = ['Type', 'Recurrence', 'Current Amount', 'Goal Amount', 'Yearly Amount'];
  }


  ngOnInit(): void {
    this.createForm();
    console.log(this.incomeFormArray)
    this.addDataInTable();
  }

  private createForm() {
    this.incomeForm = this.formBuilder.group(
      {
        incomeArray: this.formBuilder.array([
          this.createNewRow()
        ])
      }
    );
  }

  private createNewRow(): FormGroup {
    const newGroup = new FormGroup({});
    this.allIncomeControls.forEach(field => {
      newGroup.addControl(field, new FormControl('', Validators.required));
    });
    newGroup.controls['id'].setValue(0);
    return newGroup;
  }

  addRow(): void {
    this.incomeFormArray.push(this.createNewRow());
  }

  addDataInTable() {
    for (const income of this.incomeList) {
      const newGroup = new FormGroup({});
      this.allIncomeControls.forEach(field => {
        newGroup.addControl(field, new FormControl(income[field], Validators.required));
      });
      this.incomeFormArray.insert(0, newGroup);
    }
  }

  get incomeFormArray(): FormArray {
    return this.incomeForm.get('incomeArray') as FormArray
  }

  deleteRow(index: number) {
    this.toRemoveIds.push(this.incomeFormArray.at(index).value.id);
    this.incomeFormArray.removeAt(index);
  }

  onSubmit() {
    if (!this.incomeFormArray.dirty) {
      this.toastrService.info('The form was NOT modified', 'INFO')
      return;
    }
    this.saveIncomes(this.incomeFormArray);
    let removedIncomeIds = [];
    if (this.toRemoveIds.length > 0) {
      removedIncomeIds = this.toRemoveIds;
      this.toRemoveIds = [];
      this.incomeService.removeIncome(removedIncomeIds);
    }
    this.incomeForm.markAsPristine();
  }

  saveIncomes(incomeFormArray: FormArray) {
    console.log('submit: ', incomeFormArray);
    const updatedIncome: IncomeDto[] = [];
    console.log('incomeFormArray.controls: ', incomeFormArray.controls)
    for (const control of incomeFormArray.controls) {
      console.log('control: ', control)
      if (control.dirty) {
        updatedIncome.push(control.value);
      }
    }

    this.incomeService.saveIncomeList(updatedIncome).subscribe(
      {
        next: resp => {
          console.log('save income api responded: ', resp);
          this.toastrService.success('Incomes were saved successfully', 'Success!');
        },
        complete: () => {
          console.log('the form was PRISTINED');
          this.incomeForm.markAsPristine();
        },
        error: err => {
          console.log('this error was catched in the saveIncomeList" ', err);
          this.toastrService.error(err.message, 'Something went wrong!')
        }
      }
    );
  }

  hasSelectDropdown(column: string) {
    return column === 'recurrence';
  }

   updateYearlyAmount(row: AbstractControl) {
    const recurrence = Recurrence[row.get('recurrence').value];
    const currentAmount = row.get('currentAmount').value;
    const yearlyAmount = recurrence * currentAmount;
    // console.log('recurrence: ', recurrence)
    // console.log('currentAmount: ', currentAmount)
    // console.log('yearlyAmount: ', yearlyAmount)

    row.get('yearlyAmount').setValue(yearlyAmount)
  }

  FadeOutSuccessMsg() {
    setTimeout( () => {
      this.hideSuccessMessage = true;
    }, 7000);
  }

}
