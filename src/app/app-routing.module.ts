import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { LandingComponent } from './auth/landing/landing.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent
    // ,
    // canActivate: [AuthGuard]
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
