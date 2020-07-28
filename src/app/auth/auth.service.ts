import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  currentUser: User | null;
  redirectUrl: string;
  url = 'http://localhost:3000/auth/signup';

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  signup(newUser): void {
    const body = {
      first_name: newUser.firstName,
      last_name: newUser.lastName,
      email: newUser.email,
      passwd: newUser.password
    };

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    };

    console.log(newUser)
    this.http.post<any>(this.url, body, { headers }).subscribe(data => {
      console.log(data)
    })

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
