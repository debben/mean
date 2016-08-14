/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { BaPageTop } from 'ng2-admin/src/app/theme/components/baPageTop';
import { BaContentTop } from 'ng2-admin/src/app/theme/components/baContentTop';
import { BaSidebar } from 'ng2-admin/src/app/theme/components/baSidebar';
import { BaBackTop } from 'ng2-admin/src/app/theme/components/baBackTop';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'ui-container',
  directives: [BaPageTop, BaSidebar, BaContentTop, BaBackTop],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top [title]="appTitle"></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <ba-back-top position="200"></ba-back-top>
  `
})

export class UiContainer{
  loading = false;
  appTitle = 'MEAN';

  constructor(){
  }
}
