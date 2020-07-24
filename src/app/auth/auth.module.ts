import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';



@NgModule({
  declarations: [SignupComponent, LoginComponent, LandingComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SignupComponent,
    LoginComponent,
    LandingComponent
  ]
})
export class AuthModule { }
