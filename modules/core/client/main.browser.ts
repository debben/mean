/*
 * Providers provided by Angular
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './platform/environment';
import { bootloader } from '@angularclass/hmr';
/*
 * Core module to load
 */
import { CoreModule } from './core.module';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(CoreModule)
    .then(decorateModuleRef)
    .catch(err => console.error(err));
}


bootloader(main);
