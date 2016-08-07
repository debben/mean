/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import {BaImageLoaderService} from 'ng2-admin/src/app/theme/services/baImageLoader';
import {BaThemePreloader} from 'ng2-admin/src/app/theme/services/baThemePreloader';
import {BaThemeSpinner} from 'ng2-admin/src/app/theme/services/baThemeSpinner';
import {layoutPaths, BaThemeConfigProvider, BaThemeConfig} from 'ng2-admin/src/app/theme';
import {BaThemeRun} from 'ng2-admin/src/app/theme/directives/baThemeRun';
//
import {BaPageTop} from 'ng2-admin/src/app/theme/components/baPageTop';
import {BaContentTop} from 'ng2-admin/src/app/theme/components/baContentTop';
import {BaSidebar} from 'ng2-admin/src/app/theme/components/baSidebar';
import {BaBackTop} from 'ng2-admin/src/app/theme/components/baBackTop';
import { AppState } from 'ng2-admin/src/app/app.state';

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
    require('../css/app.scss')
  ],
  template: `
  <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
    <div class="additional-bg"></div>
    <ba-sidebar></ba-sidebar>
    <ba-page-top [title]="appTitle"></ba-page-top>
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

export class App {
  loading = false;
  appTitle = 'MEAN';

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

  private _loadImages():void {
    // register some loaders
    BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'sky-bg.jpg'));
  }
}
