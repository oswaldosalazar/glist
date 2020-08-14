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
import { tap, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isUserLoggedIn = this.store.select(getCurrentUserStatus);

    if (!isUserLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
