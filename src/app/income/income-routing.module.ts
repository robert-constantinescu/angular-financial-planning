import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {IncomeHomeComponent} from './income-home/income-home.component';
import {IncomeResolverService} from './income-resolver.service';

const routes: Routes = [
  {path: '', component: IncomeHomeComponent, resolve: { incomeList: IncomeResolverService }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeRoutingModule { }

