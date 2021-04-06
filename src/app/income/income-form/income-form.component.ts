import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IncomeDto} from '../income-dto';
import {IncomeService} from '../income.service';


@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {

  displayedColumns: string[] = ['id', 'type', 'currentAmount', 'goalAmount', 'recurrence', 'yearlyAmount', 'delete'];
  displayedHead: string[] = ['Id', 'Type', 'Current Amount', 'Goal Amount', 'Recurrence', 'Yearly Amount'];
  displayedFields: string[] = ['id', 'type', 'currentAmount', 'goalAmount', 'recurrence', 'yearlyAmount'];
  columnSelect = -1;
  formArray = new FormArray([]);
  dataSource = this.formArray.controls;
  columns: number = this.displayedFields.length;


  constructor(private incomeService: IncomeService) {
  }

  ngOnInit(): void {
    this.addDataInTable()
  }

  addRow() {
    const newGroup = new FormGroup({});
    this.displayedFields.forEach(x => {
      newGroup.addControl(x, new FormControl());
    });

    this.formArray.push(newGroup);
    this.dataSource = [...this.formArray.controls];
  }

  addDataInTable() {

    const data = this.incomeService.incomeList;
    for (const income of data) {
      const newGroup = new FormGroup({});
      this.displayedFields.forEach(field => {
        newGroup.addControl(field, new FormControl(income[field]));
      });
      this.formArray.push(newGroup);
    }

  }


  deleteRow(index: number) {
    this.formArray.removeAt(index);
    this.dataSource = [...this.formArray.controls];
  }

  onSubmit(dataSource) {
    console.log(dataSource);
  }
}
