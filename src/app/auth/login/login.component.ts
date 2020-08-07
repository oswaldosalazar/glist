import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './../models/user';
import { getCurrentUser, getError } from './../store/auth.reducer';

/* NgRx */
import { Store } from '@ngrx/store';
import { State } from './../../state/app.state';
import * as UserActions from '../store/auth.actions';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  loginForm: FormGroup;
  currentUser$: Observable<User>;
  errorMessage$: Observable<string>;
  getState: Observable<State>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.currentUser$ = this.store.select(getCurrentUser).pipe(
      tap(user => {
        console.log('CurrentUser from login: ', user);
      })
    );

    this.errorMessage$ = this.store.select(getError);
  }

  onSubmit(): void {
    const user = this.loginForm.value;
    if (this.loginForm && this.loginForm.valid) {
      this.store.dispatch(UserActions.loginUser({ user }));
    }
  }
}
