import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IncomeHomeComponent} from './income-home/income-home.component';
import {IncomeRoutingModule} from './income-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IncomeFormComponent} from './income-form/income-form.component';
import {ToastrModule} from "ngx-toastr";
import {TableModule} from "primeng/table";


@NgModule({
  exports: [IncomeHomeComponent],
  declarations: [IncomeHomeComponent, IncomeFormComponent],
  imports: [
    CommonModule,
    IncomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ToastrModule.forRoot()
  ]
})
export class IncomeModule { }
