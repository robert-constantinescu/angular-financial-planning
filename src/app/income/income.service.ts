import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IncomeDto} from './income-dto';
import {ConfigurationConstants} from '../shared/configuration-constants';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private incomeApi = `${ConfigurationConstants.BASE_URL}/income`;

  constructor(private http: HttpClient) { }

  saveIncomeList(incomeList: IncomeDto[]) {
    return this.http.post(`${this.incomeApi}/list`, incomeList);
  }
}
