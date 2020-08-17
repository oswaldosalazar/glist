import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './../models/user';
import { State } from '../../../app/state/app.state';

import * as UserActions from '../store/auth.actions';
import {
  getCurrentUser,
  getError,
  getCurrentUserStatus,
  getCurrentUserName
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
  currentUserName: string;
  @Output() closeSidenavEvent = new EventEmitter<void>();

  constructor(private store: Store<State>, private router: Router) {
    this.currentUserStatus$ = this.store.select(getCurrentUserStatus);
  }

  ngOnInit(): void {
    // this.currentUser$ = this.store.select(getCurrentUser);
    // if(this.currentUser$) this.currentUserName = this.currentUser$.firstName
    this.currentUserStatus$ = this.store.select(getCurrentUserStatus);
    this.currentUser$ = this.store.select(getCurrentUser);
    console.log(this.currentUser$);
    this.error$ = this.store.select(getError);
  }

  logout(): void {
    this.store.dispatch(UserActions.initAuth());
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
