/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';
import {BaPageTop, BaContentTop, BaSidebar, BaBackTop} from './theme/components';
import {BaImageLoaderService, BaThemePreloader, BaThemeSpinner} from './theme/services';
import {BaThemeConfigProvider, BaThemeConfig} from './theme';
import {BaThemeRun} from './theme/directives';

import { AppState } from './app.state';
import { Home } from './home';
import { RouterActive } from './router-active';

import {layoutPaths} from './theme/theme.constants';

import { MenuConfig } from './theme/components/baSidebar/baSidebar.config.ts';

// import the module listing to attach to the primary router
import { Articles } from '../../../index.ts';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [BaThemeConfigProvider, BaThemeConfig, BaImageLoaderService, BaThemeSpinner],
  directives: [BaPageTop, BaSidebar, BaContentTop, BaBackTop, BaThemeRun],
  encapsulation: ViewEncapsulation.None,
  styles: [
    //require('normalize.css'),
    require('./app.scss')
  ],
  template: `
  <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
    <div class="additional-bg"></div>
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <ba-back-top position="200"></ba-back-top>
  </main>
  `
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/articles/...',      name: 'Articles', component: Articles },
  { path: '/home',  name: 'Home',  component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
])
@MenuConfig
([{
  title: "Articles",
  component: Articles,
  icon: "ion-ios-paper-outline",
}])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  isMenuCollapsed:boolean = false;

  constructor(private _state:AppState, private _imageLoader:BaImageLoaderService, private _spinner:BaThemeSpinner, private _config:BaThemeConfig) {
    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public ngAfterViewInit():void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  ngOnInit() {
    console.log('Initial App State', this._state);
  }

  private _loadImages():void {
    // register some loaders
    BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'sky-bg.jpg'));
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
