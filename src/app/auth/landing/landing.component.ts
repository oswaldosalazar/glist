import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../app/state/app.state';

import * as UserActions from '../store/auth.actions';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit(): void {}

  logout(): void {
    this.store.dispatch(UserActions.logoutUser());
  }
}
