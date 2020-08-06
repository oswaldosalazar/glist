import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

import { User } from './../models/user';
import { getCurrentUser } from './../store/auth.reducer';

/* NgRx */
import { Store } from '@ngrx/store';
import { State } from './../../state/app.state';
import * as UserActions from '../store/auth.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  pageTitle = 'Sign Up';
  signupForm: FormGroup;
  currentUser$: Observable<User>;

  passwordPattern =
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

  constructor(
    // private store: Store<State>,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          )
        ]
      ]
    });

    this.currentUser$ = this.store.select(getCurrentUser).pipe(
      tap(currentUser => {
        localStorage.setItem('token', currentUser.token);
        if (!!currentUser.token) this.router.navigate(['/landing']);
      })
    );
  }

  onSubmit(): void {
    const user = this.signupForm.value;
    if (this.signupForm && this.signupForm.valid) {
      this.store.dispatch(UserActions.signupUser({ user }));

      // this.router.navigate(['/']);

      // if (this.authService.redirectUrl) {
      //   this.router.navigateByUrl(this.authService.redirectUrl);
      // } else {
      //   this.router.navigate(['/']);
      // }
    }
  }
}
