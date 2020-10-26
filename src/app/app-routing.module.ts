import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {PasswordcodeComponent} from './forgotpassword/passwordcode/passwordcode.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'login', component: LoginComponent, data: {title: 'Login'}},
  { path:'signup', component: SignupComponent},
  { path:'forgotpassword', component: ForgotpasswordComponent},
  { path:'passwordcode', component: PasswordcodeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
