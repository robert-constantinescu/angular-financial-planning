import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IncomeHomeComponent} from './income-home/income-home.component';
import {IncomeRoutingModule} from './income-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {IncomeFormComponent} from './income-form/income-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  exports: [IncomeHomeComponent],
  declarations: [IncomeHomeComponent, IncomeFormComponent],
  imports: [
    CommonModule,
    IncomeRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ]
})
export class IncomeModule { }
