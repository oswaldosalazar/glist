import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
