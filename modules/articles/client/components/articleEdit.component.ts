import { Component, ViewEncapsulation } from '@angular/core';

class Article {
  public title:string;
  public content:string;
  public _id;
};

@Component({
  selector: 'article-edit',
  pipes: [],
  providers: [],
  directives: [],
  styles: [],
  template: require('../views/form-article.client.view.html')
})
export class ArticleEdit {
  public article = {};
  constructor() {

  }

  ngOnInit(){
  }
};
