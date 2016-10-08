import { Component } from '@angular/core';

import { GlobalState } from 'ng2-admin/src/app/global.state';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  // We need to tell Angular's compiler which custom pipes are in our template.
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('../css/core.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('../views/home.client.view.html')
})
export class Home {
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor(public appState: GlobalState) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
  }
}
