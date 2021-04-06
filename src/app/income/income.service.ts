import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IncomeDto} from './income-dto';
import {ConfigurationConstants} from '../shared/configuration-constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private incomeApi = `${ConfigurationConstants.BASE_URL}/income`;

  incomeList: IncomeDto[] = [
    {id: 1, type: 'SALARY', currentAmount: 30, goalAmount: 45, recurrence: 'MONTHLY', yearlyAmount: 0},
    {id: 2, type: 'SALARY', currentAmount: 45, goalAmount: 45, recurrence: 'MONTHLY', yearlyAmount: 0},
    {id: 3, type: 'DIVIDENDS', currentAmount: 26, goalAmount: 61, recurrence: 'YEARLY', yearlyAmount: 0},
    {id: 4, type: 'RENT', currentAmount: 30, goalAmount: 57, recurrence: 'YEARLY', yearlyAmount: 0},
    {id: 5, type: 'INTEREST', currentAmount: 31, goalAmount: 48, recurrence: 'QUARTERLY', yearlyAmount: 0},
  ];

  constructor(private http: HttpClient) { }

  saveIncomeList(incomeList: IncomeDto[]) {
    return this.http.post(`${this.incomeApi}/list`, incomeList);
  }

  getIncomeList(): Observable<IncomeDto[]> {
    return this.http.get<IncomeDto[]>(`${this.incomeApi}/list`);
  }


}
