import { getCurrentUserStatus } from './store/auth.reducer';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUserStatus$: Observable<boolean>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store
  ) {}
  canActivate(): boolean {
    this.currentUserStatus$ = this.store.select(getCurrentUserStatus);
    if (!this.currentUserStatus$) {
      this.router.navigate(['/login']);
      return false;
    } else {
      // this.router.navigate(['/landing']);
      return true;
    }

    // if (!this.auth.getToken()) {
    //   this.router.navigate(['/login']);
    // }
    // console.log(this.store.select(getCurrentUserStatus));

    // return this.store.select(getCurrentUserStatus);
  }
}
