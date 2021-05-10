import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {IncomeDto} from '../income-dto';
import {IncomeService} from '../income.service';
import {Recurrence} from '../../shared/etc/recurrence';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {

  displayedColumns: string[] = ['type', 'recurrence', 'currentAmount', 'goalAmount', 'yearlyAmount', 'delete'];
  displayedHead: string[] = ['Type', 'Recurrence', 'Current Amount', 'Goal Amount', 'Yearly Amount'];
  displayedFields: string[] = ['type', 'recurrence', 'currentAmount', 'goalAmount', 'yearlyAmount', 'id'];
  columnsWithSelect: string[] = ['recurrence'];
  columnSelect = -1;
  formArray = new FormArray([]);
  dataSource = this.formArray.controls;
  columns: number = this.displayedFields.length;
  recurrence = Object.keys(Recurrence);
  toRemoveIds: number[] = [];
  @Input() incomeList: IncomeDto[];
  hideSuccessMessage = false;


  constructor(private incomeService: IncomeService,
              private toastrService: ToastrService) {
  }


  ngOnInit(): void {
    console.log(this.incomeList);
    this.addDataInTable();
  }

  addRow() {
    const newGroup = new FormGroup({});
    this.displayedFields.forEach(field => {
      newGroup.addControl(field, new FormControl('', Validators.required));
    });
    newGroup.controls['id'].setValue(0);
    this.formArray.push(newGroup);
    this.dataSource = [...this.formArray.controls];
  }

  addDataInTable() {
    for (const income of this.incomeList) {
      const newGroup = new FormGroup({});
      this.displayedFields.forEach(field => {
        newGroup.addControl(field, new FormControl(income[field], Validators.required));
      });
      this.formArray.push(newGroup);
    }
  }


  deleteRow(index: number) {
    this.toRemoveIds.push(this.formArray.at(index).value.id);
    this.formArray.removeAt(index);
    this.dataSource = [...this.formArray.controls];
  }

  onSubmit(dataSource: AbstractControl[]) {
    if (!this.formArray.dirty) {
      this.toastrService.info('The form was not modified', 'INFO')
      return;
    }
    this.saveIncomes(dataSource);
    let removedIncomeIds = [];
    if (this.toRemoveIds.length > 0) {
      removedIncomeIds = this.toRemoveIds;
      this.toRemoveIds = [];
      this.incomeService.removeIncome(removedIncomeIds);
    }
    this.formArray.markAsPristine();
  }


  saveIncomes(dataSource: AbstractControl[]) {
    console.log('submit: ', dataSource);
    const updatedIncome: IncomeDto[] = [];
    for (const field of dataSource) {
      if (field.dirty) {
        updatedIncome.push(field.value);
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
          this.formArray.markAsPristine();
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


  FadeOutSuccessMsg() {
    setTimeout( () => {
      this.hideSuccessMessage = true;
    }, 4000);
  }

  updateYearlyAmount(row: FormGroup) {
    console.log('logChanges')
    const currentAmount = row.get('currentAmount').value
    console.log(`recurrence: ${row.get('recurrence').value}, value: ${Recurrence[row.get('recurrence').value]}`)
    row.get('recurrence').valueChanges.subscribe(
      (recurrence) => {
        let recurrenceValue = Recurrence[recurrence]
        row.get('yearlyAmount').setValue(currentAmount * recurrenceValue)
      }
    );

  }
}
