/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import {BaImageLoaderService} from 'ng2-admin/src/app/theme/services/baImageLoader';
import {BaThemePreloader} from 'ng2-admin/src/app/theme/services/baThemePreloader';
import {BaThemeSpinner} from 'ng2-admin/src/app/theme/services/baThemeSpinner';
import {layoutPaths, BaThemeConfigProvider, BaThemeConfig} from 'ng2-admin/src/app/theme';
import {BaThemeRun} from 'ng2-admin/src/app/theme/directives/baThemeRun';
import { GlobalState } from 'ng2-admin/src/app/global.state';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [BaThemeConfigProvider, BaThemeConfig, BaImageLoaderService, BaThemeSpinner],
  encapsulation: ViewEncapsulation.None,
  styles: [require('../css/app.scss')],
  template: `
    <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
    `
})
export class App {
  loading = false;
  appTitle = 'MEAN';

  isMenuCollapsed:boolean = false;

  constructor(private _state: GlobalState,
              private _imageLoader: BaImageLoaderService,
              private _spinner: BaThemeSpinner,
              private _config: BaThemeConfig) {
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
