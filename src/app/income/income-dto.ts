import {Recurrence} from '../shared/interfaces/recurrence';

export interface IncomeDto {

 type: string;
 currentAmount: number;
 yearlyAmount: number;
 recurrence: Recurrence;
 goalAmount: number;
 id?: number;

}
