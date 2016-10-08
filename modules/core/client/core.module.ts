import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './platform/environment';
import { routing } from './routes/app.routes';

// App is our top level component
import { App } from './components/app.component';
import { UiContainer } from './components/uiContainer.component';
import { Home } from './components/home.component';
import { AppState, InteralStateType } from 'ng2-admin/src/app/app.service';
import { GlobalState } from 'ng2-admin/src/app/global.state';

import { NgaModule } from './nga.module';
import { UsersModule } from '../../users/client/users.module';

import { AuthGuard } from './providers/AuthGuard';
import { LastRouteService } from './services/lastRouteService.service';
import { Window } from './platform/Window';

// menus
import { MENU } from './app.menu';
import { MENU_TOKEN } from 'ng2-admin/src/app/app.menu';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
  AuthGuard,
  LastRouteService,
  {
    provide: Window,
    useValue: window
  },
  {
    provide: MENU_TOKEN,
    useValue: MENU
  }
];

type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    UiContainer,
    Home
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    UsersModule,
    routing
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})

export class CoreModule {

  constructor(public appRef: ApplicationRef, public appState: AppState) {
  }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
