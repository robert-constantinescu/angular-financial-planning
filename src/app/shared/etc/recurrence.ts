export type RecurrenceOption = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'HALF-YEARLY' | 'YEARLY'

export const Recurrence: Record<RecurrenceOption, number> = {
  'DAILY' : 365,
  'WEEKLY' : 52,
  'MONTHLY': 12,
  'QUARTERLY': 4,
  'HALF-YEARLY': 2,
  'YEARLY': 1
}

//
// export enum Recurrence {
//   DAILY = 'DAILY',
//   WEEKLY = 'WEEKLY',
//   MONTHLY = 'MONTHLY',
//   QUARTERLY= 'QUARTERLY',
//   SEMESTRIAL= 'SEMESTRIAL',
//   YEARLY= 'YEARLY'
// }
