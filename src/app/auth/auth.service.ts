import { getCurrentUser } from './store/auth.reducer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './models/user';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from './../state/app.state';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // currentUser: User | null;
  // redirectUrl: string;
  url = 'http://localhost:3000';
  // headers = {
  //   'Access-Control-Allow-Origin': '*',
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json',
  //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  // };
  // sub: Subscription;

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) return user.token;
  }

  signup(user: User): Observable<User> {
    const body = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      passwd: user.password
    };

    return this.http.post<User>(
      `${this.url}/auth/signup`,
      body
      // , {
      //   headers: this.headers
      // }
    );
  }

  login(user: User): Observable<User> {
    const body = {
      email: user.email,
      passwd: user.password
    };

    return this.http.post<User>(
      `${this.url}/auth/login`,
      body
      // , {
      //   headers: this.headers
      // }
    );
  }

  afterAuthentication(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/lists']);
  }

  getStatus() {
    return this.http.get<any>(`${this.url}/auth/status`);
  }
}
