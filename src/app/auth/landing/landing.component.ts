import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../app/state/app.state';
import { Observable } from 'rxjs';
import { User } from './../models/user';

import * as UserActions from '../store/auth.actions';
import {
  getCurrentUser,
  getError,
  getCurrentUserStatus
} from './../store/auth.reducer';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  error$: Observable<string>;
  currentUserStatus$: Observable<boolean>;
  currentUser$: Observable<User>;

  constructor(private store: Store<State>) {
    this.currentUserStatus$ = this.store.select(getCurrentUserStatus);
  }

  ngOnInit(): void {
    this.currentUser$ = this.store.select(getCurrentUser);
    this.error$ = this.store.select(getError);
  }

  logout(): void {
    this.store.dispatch(UserActions.logoutUser());
  }
}
