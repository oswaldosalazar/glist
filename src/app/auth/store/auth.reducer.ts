import { User } from '../models/user';

import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as UserActions from './auth.actions';
import * as AppState from '../../state/app.state'

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

const getUserFeatureState = createFeatureSelector<AuthState>('users');

export const getError = createSelector(
  getUserFeatureState,
  state => state.errorMessage
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.user
);

export const userReducer = createReducer<AuthState>(
  initialState,
  on(UserActions.loginUserSuccess, (state, action): AuthState => {
    return {
      ...state,
      user: action.user,
      errorMessage: ''
    };
  }),
  on(UserActions.loginUserFailure, (state, action) => {
    return {
      ...state,
      errorMessage: action.error
    }
  })
);
