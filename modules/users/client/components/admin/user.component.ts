import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { UsersService } from '../../services/users.client.service.ts';
import { ActivatedRoute } from '@angular/router';
import { Authentication } from '../../services/authentication.client.service';

@Component({
  selector: 'user',
  encapsulation: ViewEncapsulation.None,
  template: require('../../views/admin/view-user.client.view.html'),
  styles: [require('../../css/users.css')]
})
export class User {
  public user: any;

  constructor(private userService: UsersService,
              private route: ActivatedRoute,
              @Inject(Authentication) public authentication: any) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user = this.userService.get({id:params['userId']});
    });
  }

  remove() {

  }
}
