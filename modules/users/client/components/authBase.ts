import { Router } from '@angular/router';
import { LastRouteService } from '../../../core/client/services/lastRouteService.service';
import { IWindow } from '../../../core/client/platform/Window';

export class AuthBase {
  public method: string;
  // OAuth provider request
  constructor(public router: Router,
              private window: IWindow,
              public lastRoute: LastRouteService ) {
  }

  public callOauthProvider(url) {
    if (this.lastRoute && this.lastRoute.lastUrl) {
       url += '?redirect_to=' + this.lastRoute.lastUrl;
    }

    // Effectively call OAuth authentication route:
    window.location.assign(url);
  }
};
