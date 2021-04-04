import { NgModule } from '@angular/core';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { HomeComponent } from './home/home.component';
import {SharedRoutingModule} from './shared-routing.module';



@NgModule({
    declarations: [DashboardMenuComponent, HomeComponent],
    exports: [
        DashboardMenuComponent,
    ],
    imports: [
      SharedRoutingModule
    ]
})
export class SharedModule { }
