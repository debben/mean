import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ArticlesService } from '../services/articles.client.service';
import { ResourceResult } from 'ng2-resource-rest';
import { Router } from '@angular/router';

class Article {
  public title: string;
  public content: string;
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
  public title: AbstractControl;
  public content: AbstractControl;
  public form: FormGroup;

  public error;

  constructor(fb: FormBuilder,
              private articlesService: ArticlesService,
              private router: Router) {
    this.form = fb.group({
      'title': ['', Validators.compose([Validators.required])],
      'content': ['', Validators.compose([Validators.required])]
    });

    this.title = this.form.controls['title'];
    this.content = this.form.controls['content'];
  }

  public save(values: Object): Promise<boolean> {
    let promise;
    if (this.form.valid) {
      let res: ResourceResult;
      if(!this.article._id) {
        res = this.articlesService.save(values);
      }
      else {
        res = this.articlesService.update(values)
      }
      promise = res.$observable.toPromise();
      promise.subscribe(res => this.router.navigate('/articles', this.article_id));
      promise.catch(err => this.error = err);
    }
    return promise;
  }

  ngOnInit() {
  }
};
