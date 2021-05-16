import { RecurrenceOption} from '../shared/etc/recurrence';

export interface IncomeDto {

 type: string;
 currentAmount: number;
 yearlyAmount: number;
 recurrence: RecurrenceOption;
 goalAmount: number;
 id?: number;

}
