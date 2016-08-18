/*
 * These are globally available directives in any template
 */
// Angular 2
import { PLATFORM_DIRECTIVES } from '@angular/core';
// Angular 2 Router
import { ROUTER_DIRECTIVES } from '@angular/router';
// Angular 2 forms
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
// bootstrap components
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/components/pagination';

// application_directives: directives that are global through out the application
export const APPLICATION_DIRECTIVES = [
  ...ROUTER_DIRECTIVES,
  ...REACTIVE_FORM_DIRECTIVES,
  ...PAGINATION_DIRECTIVES
];

export const DIRECTIVES = [
  { provide: PLATFORM_DIRECTIVES, multi: true, useValue: APPLICATION_DIRECTIVES }
];
