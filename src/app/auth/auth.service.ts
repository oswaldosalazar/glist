import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './models/user';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null;
  redirectUrl: string;
  url = 'http://localhost:3000';
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  };
  sub: Subscription;

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): boolean {
    // return !!this.currentUser;
    return;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  signup(user: User): Observable<User> {
    const body = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      passwd: user.password
    };

    return this.http.post<User>(`${this.url}/auth/signup`, body, {
      headers: this.headers
    });
  }

  login(user: User): Observable<User> {
    const body = {
      email: user.email,
      passwd: user.password
    };

    return this.http.post<User>(`${this.url}/auth/login`, body, {
      headers: this.headers
    });
  }
}
