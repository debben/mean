import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Authentication } from '../../services/authentication.client.service';
import { UsersService } from '../../services/users.client.service.ts';
import { BaseUser } from './baseUser.component';

@Component({
selector: 'edit-user',
  encapsulation: ViewEncapsulation.None,
  template: require('../../views/admin/edit-user.client.view.html'),
styles: [require('../../css/users.css')]
})
export class EditUser extends BaseUser {
  public form: FormGroup;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public userRoles: AbstractControl;
  public submitted: boolean = false;
  public error;

  constructor(fb: FormBuilder,
              route: ActivatedRoute,
              userService: UsersService,
              @Inject(Authentication) authentication,
              private router: Router) {
    super(authentication, userService, route);
    this.form = fb.group({
      'firstName': ['', Validators.compose([Validators.required])],
      'lastName': ['', Validators.compose([Validators.required])],
      'userRoles': ['', Validators.required] // todo maybe have a regex vaildator for roles
    });

    this.firstName = this.form.controls['firstName'];
    this.lastName = this.form.controls['lastName'];
    this.userRoles = this.form.controls['userRoles'];
  }

  public update(values: Object): Promise<boolean> {
    if (this.form.valid) {
      if(typeof this.user.roles === 'string') // nglist directive, manually convert
      {
        this.user.roles = this.user.roles.split(',');
      }

      let up = this.usersService.update({
        id: this.user._id,
        roles: this.user.roles,
        firstName: this.user.firstName,
        lastName: this.user.lastName
      });

      up.$observable
      .subscribe(res => {
        this.router.navigate('/users', this.user._id);
      },
      err => {
        this.error = err;
      });
    }
    else {
      return Promise.reject(false);
    }
  }
}
