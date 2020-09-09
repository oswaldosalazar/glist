import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  AfterContentChecked
} from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state/app.state';
import { User } from './auth/models/user';

import * as UserActions from './auth/store/auth.actions';
import { Observable } from 'rxjs';
import {
  getCurrentUserStatus,
  getCurrentUserName
} from './auth/store/auth.reducer';
import { Router } from '@angular/router';
import { ListsService } from './lists/lists.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'glist';
  user: User;
  currentUserStatus$: Observable<boolean>;
  currentUserName$: Observable<string>;
  listActive: boolean;

  constructor(
    private store: Store<State>,
    private router: Router,
    private listsService: ListsService,
    private cdr: ChangeDetectorRef
  ) {
    this.currentUserStatus$ = this.store.select(getCurrentUserStatus);
  }

  ngOnInit() {
    this.currentUserName$ = this.store.select(getCurrentUserName);
    this.user = JSON.parse(localStorage.getItem('user'));
    if (!!this.user) {
      this.store.dispatch(UserActions.getUserFromLocalStorage());
    }
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  logout(): void {
    this.store.dispatch(UserActions.initAuth());
    this.router.navigate(['/auth/login']);
    localStorage.removeItem('user');
  }

  activeList() {
    return this.listsService.isListActive;
  }
}
