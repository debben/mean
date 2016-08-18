import { Component, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../../services/users.client.service.ts';

@Component({
  selector: 'list-users',
  encapsulation: ViewEncapsulation.None,
  template: require('../../views/admin/list-users.client.view.html'),
  styles: [require('../../css/users.css')]
})
export class ListUsers {
  public filterItems: Number;
  public currentPage: any;
  public search: string;
  public pagedItems = [];

  constructor(private userService: UsersService) {

  }

  ngOnInit() {
    this.pagedItems = this.userService.query();
  }

  public figureOutItemsToDisplay(): void {

  }
}
