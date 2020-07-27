import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User | null;
  redirectUrl: string;

  constructor() { }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): void {

    console.log(firstName, lastName, email, password)

  }

  login(email: string, password: string): void {
    // Code here would log into a back end service
    // and return user information
    // This is just hard-coded here.
    console.log(email, password)
  }

  logout(): void {
    this.currentUser = null;
  }
}
