import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';
import { ArticleList } from './components/articleList.component.ts';

@Component({
  selector: 'articles',
  pipes: [],
  providers: [],
  directives: [],
  styles: [],
  template: '<router-outlet></router-outlet>'
})
@RouteConfig([
  {
    name: 'Articles',
    path: '/',
    component: ArticleList,
    useAsDefault: true
  }
])
// todo, perhaps write a module base class
export class Articles /*extends Module */ {
  constructor() {

  }
};
