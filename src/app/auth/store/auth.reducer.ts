import { User } from '../models/user';

import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as UserActions from './auth.actions';

export interface UserState {
  isLoggedIn: boolean;
  user: User | null;
  errorMessage: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: { token: '' },
  errorMessage: null
};

const getUserFeatureState = createFeatureSelector<UserState>('currentUser');

export const getError = createSelector(
  getUserFeatureState,
  state => state.errorMessage
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.user
);

export const getCurrentUserStatus = createSelector(
  getUserFeatureState,
  state => state.isLoggedIn
);

export const authReducer = createReducer<UserState>(
  initialState,
  on(
    UserActions.loginUserSuccess,
    (state, action): UserState => ({
      ...state,
      isLoggedIn: true,
      user: action.user,
      errorMessage: ''
    })
  ),
  on(
    UserActions.loginUserFailure,
    (state, action): UserState => ({
      ...state,
      isLoggedIn: false,
      user: { token: '' },
      errorMessage: action.error
    })
  ),
  on(
    UserActions.signupUserSuccess,
    (state, action): UserState => ({
      ...state,
      isLoggedIn: true,
      user: action.user,
      errorMessage: ''
    })
  ),
  on(
    UserActions.signupUserFailure,
    (state, action): UserState => ({
      ...state,
      isLoggedIn: false,
      user: { token: '' },
      errorMessage: action.error
    })
  ),
  // on(
  //   UserActions.logoutUser,
  //   (state): UserState => ({
  //     ...state,
  //     ...initialState
  //   })
  // ),
  on(
    UserActions.initAuth,
    (state): UserState => ({
      ...state,
      errorMessage: ''
    })
  )
);
