import { Injectable, Injector } from '@angular/core';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Http } from '@angular/http';
import { User } from '../models/user';

interface IQueryInput {

};

@Injectable()
@ResourceParams({
  path: '/api/users/{id}'
})
export class UsersService extends Resource {

  constructor(http: Http, injector:Injector) {
    super(http, injector);
  }

  @ResourceAction({
    isArray: true
  })
  query: ResourceMethod<IQueryInput, User[]>;

  @ResourceAction({
  })
  get: ResourceMethod<string, User>;
}
