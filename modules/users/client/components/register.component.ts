import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from 'ng2-admin/src/app/theme/validators';
import { AuthBase } from './authBase';
import { Router, ActivatedRoute } from '@angular/router';
import { LastRouteService } from '../../../core/client/services/lastRouteService.service';
import { Window, IWindow } from '../../../core/client/platform/Window';
import { Authentication } from '../services/authentication.client.service';

@Component({
  selector: 'register',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('../css/users.scss'), require('../css/users.css')],
  template: require('../views/authentication/signup.client.view.html'),
})
export class Register extends AuthBase {
  public form: FormGroup;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public username: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;
  public error: string;
  public submitted: boolean = false;

  constructor(fb: FormBuilder,
              router: Router,
              @Inject(Window) window: IWindow,
              lastRoute: LastRouteService,
              @Inject(Authentication) authentication,
              http: Http) {
    super(router, window, lastRoute, authentication, http);
    this.form = fb.group({
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      // todo add async username availability validator.
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    // client-side validation of the password rules enforced on the server-side.
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.firstName = this.form.controls['firstName'];
    this.lastName = this.form.controls['lastName'];
    this.username = this.form.controls['username'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public signUp(values: Object): Promise<boolean> {
    this.submitted = true;
    if (this.form.valid) {
      values.password = values.passwords.password;
      delete values.passwords;
      return this.postAuthRequest('/api/auth/signup', values);
    }
    else {
      // Todo broadcast a notification about the invalid.
      return Promise.reject(false);
    }
  }

}
