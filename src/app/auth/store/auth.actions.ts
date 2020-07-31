import { createAction, props } from '@ngrx/store';

import { User } from '../models/user';

export const loginUser = createAction('[User] Login',
  props<{ user: User }>()
);

export const loginUserSuccess = createAction('[User] Login Success',
  props<{ user: User }>()
);

export const loginUserFailure = createAction('[User] Login Failure',
  props<{ error: string }>()
);
