import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {SignoutComponent} from './signout/signout.component';
import {SignupComponent} from "./signup/signup.component";


const routes: Routes = [
  {path: 'signin', component: SigninComponent},
  {path: 'signout', component: SignoutComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
