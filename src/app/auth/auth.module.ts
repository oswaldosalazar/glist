import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [SignupComponent, LoginComponent, LandingComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SignupComponent,
    LoginComponent,
    LandingComponent
  ]
})
export class AuthModule { }
