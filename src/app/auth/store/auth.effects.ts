import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { AuthService } from '../../auth/auth.service';
import * as UserActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loginUser),
      switchMap(action =>
        this.authService.login(action.user).pipe(
          map(user => UserActions.loginUserSuccess({ user })),
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
      switchMap(action =>
        this.authService.signup(action.user).pipe(
          map(user => UserActions.signupUserSuccess({ user })),
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

  logoutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.logoutUser),
      tap(user => localStorage.removeItem('token'))
    );
  });
}
