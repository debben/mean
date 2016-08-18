/*
 * These are globally available services in any component or any other service
 */

// Angular 2
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provide } from '@angular/core';

// browser interfaces
import { Window } from './Window';

// Angular 2 Http
import { HTTP_PROVIDERS } from '@angular/http';
// ng2 resource providers
import { RESOURCE_PROVIDERS } from "ng2-resource-rest";

// Angular 2 Router
import { provideRouter } from '@angular/router';
// Angular 2 forms
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { routes } from '../routes/app.routes';

import { AuthGuard } from '../providers/AuthGuard';
import { LastRouteService } from '../services/lastRouteService.service';
/*
 * Application Providers/Directives/Pipes
 * providers/directives/pipes that only live in our browser environment
 */
export const APPLICATION_PROVIDERS = [
  // new Angular 2 forms
  disableDeprecatedForms(),
  provideForms(),

  provideRouter(routes),

  ...HTTP_PROVIDERS,
  RESOURCE_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  provide(Window, { useValue: window }),
  AuthGuard,
  LastRouteService
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
