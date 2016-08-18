import { Injectable } from '@angular/core';
import { Resource, ResourceParams } from 'ng2-resource-rest';

@Injectable()
@ResourceParams({
  path: '/api/users/{id}'
})
export class UsersService extends Resource {

}
