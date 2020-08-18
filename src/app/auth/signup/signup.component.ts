import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from './../models/user';
import { getError } from './../store/auth.reducer';
import { UIService } from './../../ui/ui.service';

/* NgRx */
import { Store } from '@ngrx/store';
import { State } from './../../state/app.state';
import * as UserActions from '../store/auth.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  pageTitle = 'GList Signup';
  signupForm: FormGroup;
  currentUser$: Observable<User>;

  passwordPattern =
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
  errorMessage$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private uiService: UIService,
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

    this.errorMessage$ = this.store.select(getError).pipe(
      map(error => {
        if (!!error) {
          this.uiService.showSnackBar(error, null, 2500);
          this.store.dispatch(UserActions.initAuth());
        }
        return error;
      })
    );
  }

  onSubmit(): void {
    const user = this.signupForm.value;
    if (this.signupForm && this.signupForm.valid) {
      this.store.dispatch(UserActions.signupUser({ user }));
    }
  }
}
