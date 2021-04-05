import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IncomeDto} from '../income-dto';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {IncomeService} from '../income.service';


@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {

  incomeList: IncomeDto[] = [
    { id: 1, type: 'SALARY', currentAmount: 30, goalAmount: 45, recurrence: 'MONTHLY', yearlyAmount: 0 },
    { id: 2, type: 'SALARY', currentAmount: 45, goalAmount: 45, recurrence: 'MONTHLY', yearlyAmount: 0 },
    { id: 3, type: 'DIVIDENDS', currentAmount: 26, goalAmount: 61, recurrence: 'YEARLY', yearlyAmount: 0 },
    { id: 4, type: 'RENT', currentAmount: 30, goalAmount: 57, recurrence: 'YEARLY', yearlyAmount: 0 },
    { id: 5, type: 'INTEREST', currentAmount: 31, goalAmount: 48, recurrence: 'QUARTERLY', yearlyAmount: 0 },
  ];

  constructor(private fb: FormBuilder, private incomeService: IncomeService) { }

  incomeTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: IncomeDto[];

  ngOnInit(): void {
    this.touchedRows = [];
    this.incomeTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();
  }

  ngAfterOnInit() {
    this.control = this.incomeTable.get('tableRows') as FormArray;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      type: [''],
      currentAmount: [''],
      goalAmount: [''],
      recurrence: [''],
      yearlyAmount: [''],
      isEditable: [true],
      userId: [localStorage.getItem('sub')]
    });
  }

  addRow() {
    const control =  this.incomeTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control =  this.incomeTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  saveUserDetails() {
    console.log(this.incomeTable.value);
  }

  get getFormControls() {
    const control = this.incomeTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.incomeTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.touchedRows);
    this.incomeService.saveIncomeList(this.touchedRows).subscribe();
  }

  toggleTheme() {
    this.mode = !this.mode;
  }


}
