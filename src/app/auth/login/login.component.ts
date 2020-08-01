import { getCurrentUser } from './../store/auth.reducer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

import { User } from './../models/user';

/* NgRx */
import { Store } from '@ngrx/store';
import { State } from './../../state/app.state';
import * as UserActions from '../store/auth.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  loginForm: FormGroup;
  currentUser$: Observable<User>;

  maskUserName$: Observable<boolean>;

  constructor(
    // private store: Store<State>,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    console.log(this.currentUser$);

    this.currentUser$ = this.store.select(getCurrentUser).pipe(
      tap((currentUser) => {
        if (currentUser) localStorage.setItem('token', currentUser.token);
      })
    );
  }

  // checkChanged(): void {
  //   this.store.dispatch(UserActions.maskUserName());
  // }

  onSubmit(): void {
    if (this.loginForm && this.loginForm.valid) {
      const user = this.loginForm.value;
      console.log(user);

      this.store.dispatch(UserActions.loginUser({ user }));

      // this.authService.login(this.user);

      // this.router.navigate(['/']);

      // if (this.authService.redirectUrl) {
      //   this.router.navigateByUrl(this.authService.redirectUrl);
      // } else {
      //   this.router.navigate([ '/' ]);
      // }
    }
  }
}
