import {NgModule} from '@angular/core';
import {CommonModule, NgSwitch} from '@angular/common';
import {IncomeHomeComponent} from './income-home/income-home.component';
import {IncomeRoutingModule} from './income-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IncomeFormComponent} from './income-form/income-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {AppModule} from '../app.module';
import {MatTableModule} from '@angular/material/table';


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
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    FormsModule,
  ]
})
export class IncomeModule { }
