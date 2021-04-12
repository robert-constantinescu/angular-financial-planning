import {Recurrence} from '../shared/etc/recurrence';

export interface IncomeDto {

 type: string;
 currentAmount: number;
 yearlyAmount: number;
 recurrence: Recurrence;
 goalAmount: number;
 id?: number;

}
