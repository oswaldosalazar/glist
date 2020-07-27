import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

import * as UserActions from '../state/user.actions';
import { getMaskUserName } from '../state/user.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  pageTitle = 'Sign Up';
  signupForm: FormGroup;
  passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

  maskUserName$: Observable<boolean>;


  constructor(
    // private store: Store<State>,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
    })

  }

  // "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"


  // checkChanged(): void {
  //   this.store.dispatch(UserActions.maskUserName());
  // }

  signup(): void {
    if (this.signupForm && this.signupForm.valid) {
      const firstName = this.signupForm.value.firstName;
      const lastName = this.signupForm.value.lastName
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;
      this.authService.signup(firstName, lastName, email, password);
      this.router.navigate(['/']);


      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/']);
      }
    }
  }
}
