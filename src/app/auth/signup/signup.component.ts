import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

import { User } from './../models/user';
import { getCurrentUser, getError } from './../store/auth.reducer';

/* NgRx */
import { Store } from '@ngrx/store';
import { State } from './../../state/app.state';
import * as UserActions from '../store/auth.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  pageTitle = 'Sign Up';
  signupForm: FormGroup;
  currentUser$: Observable<User>;

  passwordPattern =
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
  errorMessage$: Observable<string>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          )
        ]
      ]
    });

    this.currentUser$ = this.store.select(getCurrentUser).pipe(
      tap(user => {
        console.log('CurrentUser from signup: ', user);
      })
    );

    this.errorMessage$ = this.store.select(getError);
  }

  onSubmit(): void {
    const user = this.signupForm.value;
    if (this.signupForm && this.signupForm.valid) {
      this.store.dispatch(UserActions.signupUser({ user }));
    }
  }
}
