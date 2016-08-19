import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { UsersService } from '../../services/users.client.service.ts';
import { ActivatedRoute } from '@angular/router';
import { Authentication } from '../../services/authentication.client.service';
import { BaseUser } from './baseUser.component';

@Component({
  selector: 'user',
  encapsulation: ViewEncapsulation.None,
  template: require('../../views/admin/view-user.client.view.html'),
  styles: [require('../../css/users.css')]
})
export class User extends BaseUser {

  constructor(userService: UsersService,
              route: ActivatedRoute,
              @Inject(Authentication) authentication: any) {
    super(authentication, userService, route);
  }

  // ngOnInit() {
  //   super.ngOnInit();
  // }

  remove() {

  }
}
