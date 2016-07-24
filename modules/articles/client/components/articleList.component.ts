import { Component, ViewEncapsulation } from '@angular/core';
import { ArticlesService } from '../services/articles.client.service.ts'
import {RESOURCE_PROVIDERS} from "ng2-resource-rest";

@Component({
  selector: 'article-list',
  pipes: [],
  providers: [ArticlesService, RESOURCE_PROVIDERS],
  directives: [],
  styles: [],
  template: require('../views/list-articles.client.view.html')
})
// todo, perhaps write a module base class
export class ArticleList /*extends Module */ {
  public articles:Array<any>;
  constructor(private _articlesService:ArticlesService) {

  }

  ngOnInit(){
      this.articles = this._articlesService.query()
  }
};
