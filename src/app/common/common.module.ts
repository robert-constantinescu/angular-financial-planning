import { NgModule } from '@angular/core';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { HomeComponent } from './home/home.component';
import {CommonRoutingModule} from './common-routing.module';



@NgModule({
    declarations: [DashboardMenuComponent, HomeComponent],
    exports: [
        DashboardMenuComponent,
    ],
    imports: [
      CommonRoutingModule
    ]
})
export class CommonModule { }
