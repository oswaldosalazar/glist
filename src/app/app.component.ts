import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state/app.state';
import { getCurrentUser } from './auth/store/auth.reducer';
import { User } from './auth/models/user';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as UserActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'glist';
  user: User;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    // this.store.select(getCurrentUser).subscribe(user => {
    //   localStorage.setItem('user', JSON.stringify(user));
    //   return user;
    // });
    // console.log(this.userState$.subscribe(data => data));
    this.user = JSON.parse(localStorage.getItem('user'));
    if (!!this.user.token) {
      localStorage.setItem('token', this.user.token);
      console.log(this.user);
      this.store.dispatch(UserActions.getUserFromLocalStorage());
    }
  }
}
