import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {IncomeDto} from '../income-dto';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {

  editField: string;
  incomeList: IncomeDto[] = [
    { id: 1, type: 'SALARY', currentAmount: 30, goal: 45, recurrence: 'MONTHLY', yearlyAmount: 0 },
    { id: 2, type: 'SALARY', currentAmount: 45, goal: 45, recurrence: 'MONTHLY', yearlyAmount: 0 },
    { id: 3, type: 'DIVIDENDS', currentAmount: 26, goal: 61, recurrence: 'YEARLY', yearlyAmount: 0 },
    { id: 4, type: 'RENT', currentAmount: 30, goal: 57, recurrence: 'YEARLY', yearlyAmount: 0 },
    { id: 5, type: 'INTEREST', currentAmount: 31, goal: 48, recurrence: 'QUARTERLY', yearlyAmount: 0 },
  ];

  awaitingPersonList: IncomeDto[] = [
    { id: 1, type: 'SALARY', currentAmount: 30, goal: 45, recurrence: 'Spain', yearlyAmount: 0 },
    { id: 2, type: 'SALARY', currentAmount: 45, goal: 45, recurrence: 'USA', yearlyAmount: 0 },
    { id: 3, type: 'DIVIDENDS', currentAmount: 26, goal: 61, recurrence: 'Germany', yearlyAmount: 0 },
    { id: 4, type: 'RENT', currentAmount: 30, goal: 57, recurrence: 'Spain', yearlyAmount: 0 },
    { id: 5, type: 'INTEREST', currentAmount: 31, goal: 48, recurrence: 'United Kingdom', yearlyAmount: 0 }
  ];

  constructor() { }

  ngOnInit() {

  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.incomeList[id][property] = editField;
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.incomeList[id]);
    this.incomeList.splice(id, 1);
  }

  add() {
    this.incomeList.push({ id: 0, type: '', currentAmount: 0, goal: 0, recurrence: '', yearlyAmount: 0 });
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }


}
