import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceResult } from 'ng2-resource-rest';
import { ArticlesService } from '../services/articles.client.service';

@Component({
  selector: 'article-view',
  pipes: [],
  providers: [],
  directives: [],
  styles: [],
  template: require('../views/view-article.client.view.html')
})
export class ArticleView {
  public article: ResourceResult;

  constructor(private route: ActivatedRoute,
              private articlesService: ArticlesService) {
    this.article = {};
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.article = this.articlesService.get({id: params.articleId})
    });
  }
}
