import { User } from '../models/user';

import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as UserActions from './auth.actions';
// import * as AppState from '../../state/app.state';

// export interface State extends AppState.State {
//   userState: AuthState;
// }

export interface UserState {
  isAuthenticated: boolean;
  currentUser: User | null;
  errorMessage: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  currentUser: null,
  errorMessage: null,
};

const getUserFeatureState = createFeatureSelector<UserState>('currentUser');

export const getError = createSelector(
  getUserFeatureState,
  (state) => state.errorMessage
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  (state) => state.currentUser
);

export const getCurrentUserStatus = createSelector(
  getUserFeatureState,
  (state) => state.isAuthenticated
);

export const authReducer = createReducer<UserState>(
  initialState,
  on(
    UserActions.loginUserSuccess,
    (state, action): UserState => {
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.user,
        errorMessage: '',
      };
    }
  ),
  on(
    UserActions.loginUserFailure,
    (state, action): UserState => {
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
        errorMessage: action.error,
      };
    }
  )
);
