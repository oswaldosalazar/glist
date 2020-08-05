import { getCurrentUserStatus } from './../../auth/store/auth.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../../state/app.state';
import * as UserActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  getState: Observable<any>;

  constructor(private store: Store<State>) {
    this.getState = this.store.select(getCurrentUserStatus);
    console.log(this.getState);
  }

  ngOnInit(): void {}

  logout(): void {
    this.store.dispatch(UserActions.logoutUser());
  }
}
