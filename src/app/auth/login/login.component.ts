import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './../models/user';
import { getCurrentUser, getError } from './../store/auth.reducer';
import { UIService } from './../../ui/ui.service';

/* NgRx */
import { Store } from '@ngrx/store';
import { State } from './../../state/app.state';
import * as UserActions from '../store/auth.actions';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Login';
  loginForm: FormGroup;
  // currentUser$: Observable<User>;
  errorMessage$: Observable<string>;
  getState: Observable<State>;

  constructor(
    private fb: FormBuilder,
    private uiService: UIService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    // this.currentUser$ = this.store.select(getCurrentUser).pipe(
    //   tap(user => {
    //     console.log('CurrentUser from login: ', user);
    //   })
    // );

    this.errorMessage$ = this.store.select(getError).pipe(
      map(error => {
        if (!!error) {
          this.uiService.showSnackBar(error, null, 2500);
          this.store.dispatch(UserActions.initAuth());
        }
        return error;
      })
    );
  }

  onSubmit(): void {
    const user = this.loginForm.value;
    this.store.dispatch(UserActions.loginUser({ user }));
  }
}
