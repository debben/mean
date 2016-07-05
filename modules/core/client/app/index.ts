// App
export * from './app.component';
export * from './app.service';

import { AppState } from './app.state';

// Application wide providers
export const APP_PROVIDERS = [
  AppState
];
