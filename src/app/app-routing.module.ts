import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)},
  {
    path: 'income',
    canLoad: [AuthGuard],
    loadChildren: () => import('./income/income.module').then(mod => mod.IncomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
