import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeHomeComponent } from './income-home/income-home.component';
import {IncomeRoutingModule} from './income-routing.module';



@NgModule({
  exports: [IncomeHomeComponent],
  declarations: [IncomeHomeComponent],
  imports: [
    CommonModule,
    IncomeRoutingModule
  ]
})
export class IncomeModule { }
