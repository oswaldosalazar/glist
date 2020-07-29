import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AuthEffects } from './store/auth.effects';

@NgModule({
  declarations: [ SignupComponent, LoginComponent, LandingComponent ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([ AuthEffects ])
  ],
  exports: [
    SignupComponent,
    LoginComponent,
    LandingComponent
  ]
})
export class AuthModule { }
