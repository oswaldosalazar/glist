import { User } from '../models/user';

import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
// import * as UserActions from './auth.actions';

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

// const getUserFeatureState = createFeatureSelector<AuthState>('users');

// export const getMaskUserName = createSelector(
//   getUserFeatureState,
//   state => state.maskUserName
// );

// export const getCurrentUser = createSelector(
//   getUserFeatureState,
//   state => state.currentUser
// );

// export const userReducer = createReducer<AuthState>(
//   initialState,
//   on(
//     UserActions.maskUserName,
//     (state): AuthState => {
//       return {
//         ...state,
//         maskUserName: !state.maskUserName
//       };
//     }
//   )
// );
