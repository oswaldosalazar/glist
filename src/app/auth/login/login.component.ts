import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

import { User } from './../models/user';
import { getCurrentUser } from './../store/auth.reducer';

/* NgRx */
import { Store } from '@ngrx/store';
import { State } from './../../state/app.state';
import * as UserActions from '../store/auth.actions';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  loginForm: FormGroup;
  currentUser$: Observable<User>;
  errorMessage: string | null;

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

    console.log(this.currentUser$);

    this.currentUser$ = this.store.select(getCurrentUser).pipe(
      tap(currentUser => {
        localStorage.setItem('token', currentUser.token);
        if (!!currentUser.token) this.router.navigate(['/landing']);
      })
      // catchError(currentUser => (this.errorMessage = currentUser.error))
    );
  }

  onSubmit(): void {
    const user = this.loginForm.value;
    if (this.loginForm && this.loginForm.valid) {
      console.log(user);

      this.store.dispatch(UserActions.loginUser({ user }));

      // if (this.authService.redirectUrl) {
      //   this.router.navigateByUrl(this.authService.redirectUrl);
      // } else {
      //   this.router.navigate(['/landing']);
      // }
    }
  }
}
