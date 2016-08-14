import { Router } from '@angular/router';
import { LastRouteService } from '../../../core/client/services/lastRouteService.service';
import { IWindow } from '../../../core/client/platform/Window';
import { Authentication } from '../services/authentication.client.service';
import { Http } from '@angular/http';

export class AuthBase {
  public method: string;
  public error: string;
  // OAuth provider request
  constructor(public router: Router,
              private window: IWindow,
              public lastRoute: LastRouteService,
              public authentication,
              private http: Http) {
  }

  public ngOnInit() {
    if (this.authentication.user) {
      this.router.navigateByUrl('/');
    }
  }

  public callOauthProvider(url) {
    if (this.lastRoute && this.lastRoute.lastUrl) {
       url += '?redirect_to=' + this.lastRoute.lastUrl;
    }

    // Effectively call OAuth authentication route:
    window.location.assign(url);
  }

  public postAuthRequest(url: string, data: Object): Promise<any> {
    return this.http.post(url, data)
      .map(this.extractData.bind(this))
      .toPromise()
      .then((response) => {
        // And redirect to the pr1evious or home page
        if (this.lastRoute.lastUrl &&
            this.lastRoute.lastUrl !== '/register' &&
            this.lastRoute.lastUrl !== '/login') {
          this.router.navigateByUrl(this.lastRoute.lastUrl);
          this.lastRoute.lastUrl = ''; // clear the last url
        }
        else {
          this.router.navigate(['/home']);
        }
      })
      .catch((err) => {
        err = JSON.parse(err._body).message;
        this.error = err;
        console.error(err);
      });
  }

  private extractData(response) {
    // If successful we assign the response to the global user model
    this.authentication.user = JSON.parse(response._body);
  }
};
