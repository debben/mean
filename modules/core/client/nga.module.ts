// pick what we want from ng2 admin ala-cart
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  BaThemeConfig
} from 'ng2-admin/src/app/theme/theme.config';

import {
  BaThemeConfigProvider
} from 'ng2-admin/src/app/theme/theme.configProvider';

import { BaBackTop } from 'ng2-admin/src/app/theme/components/baBackTop/baBackTop.component';
import { BaContentTop } from 'ng2-admin/src/app/theme/components/baContentTop/baContentTop.component';
import { BaCard } from 'ng2-admin/src/app/theme/components/baCard/baCard.component';
import { BaMenuItem } from 'ng2-admin/src/app/theme/components/baMenu/components/baMenuItem/baMenuItem.component';
import { BaMenu } from 'ng2-admin/src/app/theme/components/baMenu/baMenu.component';
import { BaPageTop } from 'ng2-admin/src/app/theme/components/baPageTop/baPageTop.component';
import { BaSidebar } from 'ng2-admin/src/app/theme/components/baSidebar/baSidebar.component';
import { BaMsgCenter } from 'ng2-admin/src/app/theme/components/baMsgCenter/baMsgCenter.component';

import { BaCardBlur } from 'ng2-admin/src/app/theme/components/baCard/baCardBlur.directive';

import { BaScrollPosition } from 'ng2-admin/src/app/theme/directives/baScrollPosition/baScrollPosition.directive';
import { BaSlimScroll } from 'ng2-admin/src/app/theme/directives/baSlimScroll/baSlimScroll.directive';
import { BaThemeRun } from 'ng2-admin/src/app/theme/directives/baThemeRun/baThemeRun.directive';

import { BaImageLoaderService } from 'ng2-admin/src/app/theme/services/baImageLoader/baImageLoader.service';
import { BaThemePreloader } from 'ng2-admin/src/app/theme/services/baThemePreloader/baThemePreloader.service';
import { BaThemeSpinner } from 'ng2-admin/src/app/theme/services/baThemeSpinner/baThemeSpinner.service';

import { BaProfilePicturePipe } from 'ng2-admin/src/app/theme/pipes/baProfilePicture/baProfilePicture.pipe';

import { EmailValidator } from 'ng2-admin/src/app/theme/validators/email.validator';
import { EqualPasswordsValidator } from 'ng2-admin/src/app/theme/validators/equalPasswords.validator';

const NGA_COMPONENTS = [
  BaBackTop,
  BaCard,
  BaContentTop,
  BaMenuItem,
  BaMenu,
  BaPageTop,
  BaSidebar,
  BaMsgCenter
];

const NGA_DIRECTIVES = [
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun,
  BaCardBlur
];

const NGA_PIPES = [
  BaProfilePicturePipe
];

const NGA_SERVICES = [
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner
];

const NGA_VALIDATORS = [
  EmailValidator,
  EqualPasswordsValidator
];

@NgModule({
  declarations: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    BaThemeConfigProvider,
    BaThemeConfig,
    ...NGA_VALIDATORS,
    ...NGA_SERVICES
  ],
  exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ]
})
export class NgaModule {
}
