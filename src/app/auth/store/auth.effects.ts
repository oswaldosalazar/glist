import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';

import { AuthService } from '../../auth/auth.service';
import * as UserActions from './auth.actions';
import { User } from '../models/user';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loginUser),
      exhaustMap(action =>
        this.authService.login(action.user).pipe(
          map((user: User) => {
            this.authService.afterAuthentication(user);
            return UserActions.loginUserSuccess({ user });
          }),
          catchError(error =>
            of(UserActions.loginUserFailure({ error: error.error.status }))
          )
        )
      )
    );
  });

  signupUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.signupUser),
      exhaustMap(action =>
        this.authService.signup(action.user).pipe(
          map((user: User) => {
            this.authService.afterAuthentication(user);
            return UserActions.signupUserSuccess({ user });
          }),
          catchError(error =>
            of(
              UserActions.signupUserFailure({
                error: error.error.status.detail
              })
            )
          )
        )
      )
    );
  });
}
