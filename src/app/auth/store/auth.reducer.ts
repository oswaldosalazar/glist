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

export const getCurrentUserName = createSelector(
  getUserFeatureState,
  state => state.user.firstName
);

export const authReducer = createReducer<UserState>(
  initialState,
  on(
    UserActions.loginUserSuccess,
    (state, action): UserState => ({
      ...state,
      isLoggedIn: true,
      user: {
        token: action.user.token,
        firstName: action.user.firstName,
        id: action.user.id
      },
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
      user: {
        token: action.user.token,
        firstName: action.user.firstName,
        id: action.user.id
      },
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
  on(
    UserActions.initAuth,
    (state): UserState => ({
      ...state,
      ...initialState
    })
  ),
  on(
    UserActions.getUserFromLocalStorage,
    (state): UserState => ({
      ...state,
      isLoggedIn: true,
      user: JSON.parse(localStorage.getItem('user')),
      errorMessage: ''
    })
  )
);
