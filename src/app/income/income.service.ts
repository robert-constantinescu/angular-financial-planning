import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IncomeDto} from './income-dto';
import {ConfigurationConstants} from '../shared/configuration-constants';
import {Observable} from 'rxjs';
import {Recurrence} from '../shared/interfaces/recurrence';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private incomeApi = `${ConfigurationConstants.BASE_URL}/income`;

  incomeList: IncomeDto[] = [
    {id: 1, type: 'SALARY', currentAmount: 30, goalAmount: 45, recurrence: Recurrence.MONTHLY, yearlyAmount: 0},
    {id: 2, type: 'SALARY', currentAmount: 45, goalAmount: 45, recurrence: Recurrence.MONTHLY, yearlyAmount: 0},
    {id: 3, type: 'DIVIDENDS', currentAmount: 26, goalAmount: 61, recurrence: Recurrence.YEARLY, yearlyAmount: 0},
    {id: 4, type: 'RENT', currentAmount: 30, goalAmount: 57, recurrence: Recurrence.MONTHLY, yearlyAmount: 0},
    {id: 5, type: 'INTEREST', currentAmount: 31, goalAmount: 48, recurrence: Recurrence.QUARTERLY, yearlyAmount: 0},
  ];

  constructor(private http: HttpClient) { }

  saveIncomeList(incomeList: IncomeDto[]) {
    console.log('sending data to the API: ', incomeList);
    return this.http.post(`${this.incomeApi}/list`, incomeList);
  }

  getIncomeList(): Observable<IncomeDto[]> {
    return this.http.get<IncomeDto[]>(`${this.incomeApi}/list`);
  }

  removeIncome(removedIncomeIds: number[]) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        ids: removedIncomeIds
      }
    };

    console.log('options: ', options);
    return this.http.delete(`${this.incomeApi}/list`, options).subscribe(
      response => {
        console.log(response);
      }
    );
  }
}
