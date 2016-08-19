import { ActivatedRoute } from '@angular/router';
import { Authentication } from '../../services/authentication.client.service';
import { UsersService } from '../../services/users.client.service.ts';
import { ResourceResult } from 'ng2-resource-rest';

export class BaseUser {
  public user: ResourceResult;
  public error: string;
  
  constructor(public authentication,
             public usersService: UsersService,
             private route: ActivatedRoute) {
    this.user = {};
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.user = this.usersService.get({id: params.userId});
    });
  }
}
