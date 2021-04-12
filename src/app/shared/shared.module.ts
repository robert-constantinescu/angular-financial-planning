import { NgModule } from '@angular/core';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { HomeComponent } from './home/home.component';
import {SharedRoutingModule} from './shared-routing.module';
import { CustomInputComponent } from './custom-input/custom-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { DisplayMessageComponent } from './display-message/display-message.component';



@NgModule({
    declarations: [DashboardMenuComponent, HomeComponent, CustomInputComponent, DisplayMessageComponent],
  exports: [
    DashboardMenuComponent,
    CustomInputComponent,
    DisplayMessageComponent,
  ],
    imports: [
        SharedRoutingModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class SharedModule { }
