import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeHomeComponent } from './income-home/income-home.component';
import {IncomeRoutingModule} from './income-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { IncomeFormComponent } from './income-form/income-form.component';



@NgModule({
  exports: [IncomeHomeComponent],
  declarations: [IncomeHomeComponent, IncomeFormComponent],
  imports: [
    CommonModule,
    IncomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class IncomeModule { }
