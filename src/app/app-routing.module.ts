import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: '/signin', pathMatch: 'full'},
  {
    path: 'income',
    canLoad: [AuthGuard],
    loadChildren: () => import('./income/income.module').then(mod => mod.IncomeModule)
  },
  {
    path: 'home',
    canLoad: [AuthGuard],
    loadChildren: () => import('./shared/shared.module').then(mod => mod.SharedModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
