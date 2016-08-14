import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthBase } from './authBase';
import { Router } from '@angular/router';
import { LastRouteService } from '../../../core/client/services/lastRouteService.service';
import { Window, IWindow } from '../../../core/client/platform/Window';
import { Http } from '@angular/http';
import { Authentication } from '../services/authentication.client.service';

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  template: require('../views/authentication/signin.client.view.html'),
  styles: [require('../css/users.scss'), require('../css/users.css')]
})
export class Login extends AuthBase {

  public form: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  constructor(fb: FormBuilder,
              router: Router,
              @Inject(Window) window: IWindow,
              lastRoute: LastRouteService,
              http: Http,
              @Inject(Authentication) authentication) {
    super(router, window, lastRoute, authentication, http);
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  public signIn(values: Object): Promise<any> {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      return this.postAuthRequest('/api/auth/signin', values);
    }
    else {
      return Promise.reject(false);
    }
  }
}
