import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'article-list',
  pipes: [],
  providers: [],
  directives: [],
  styles: [],
  template: require('../views/list-articles.client.view.html')
})
// todo, perhaps write a module base class
export class ArticleList /*extends Module */ {
  constructor() {

  }
};
