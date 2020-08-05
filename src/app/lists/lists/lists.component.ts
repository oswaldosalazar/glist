import {
  getCurrentUserStatus,
  getCurrentUser
} from '../../auth/store/auth.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../../state/app.state';
import * as UserActions from '../../auth/store/auth.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  getState: Observable<any>;
  isAuthenticated: false;
  user$: any;
  errorMessage: any;

  constructor(private store: Store<State>) {
    this.getState = this.store.select(getCurrentUserStatus);
  }

  ngOnInit(): void {
    this.getState.subscribe(state => {
      console.log(state);
      // this.isAuthenticated = state.currentUser.isAuthenticated;

      this.user$ = this.store.select(getCurrentUser);
      console.log(state.user);
      // .pipe(
      //   tap(currentUser => {
      //   })
      // );
      // this.errorMessage = state.currentUser.user.errorMessage;
    });
  }

  logout(): void {
    this.store.dispatch(UserActions.logoutUser());
  }
}
