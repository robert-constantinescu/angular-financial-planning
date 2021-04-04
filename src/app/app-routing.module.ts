import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {SigninComponent} from './auth/signin/signin.component';


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
    loadChildren: () => import('./common/common.module').then(mod => mod.CommonModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
