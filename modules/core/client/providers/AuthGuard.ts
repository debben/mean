import {Injectable, Inject} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Authentication} from '../../../users/client/services/authentication.client.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(Authentication) private _authentication:Authentication, private router:Router)
  {

  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    console.log("called canActivate");
    if (route.data && route.data.roles && route.data.roles.length > 0)
    {
      let allowed = false;

      for(let i = 0, roles = route.data.roles; i < roles.length; i++){
        if((roles[i] === 'guest') || (this._authentication.user && this._authentication.user.roles !== undefined && this._authentication.user.roles.indexOf(roles[i]) !== -1)){
          allowed = true;
          break;
        }
      }

      if(!allowed)
      {
        if(this._authentication.user !== undefined && typeof this._authentication.user === 'object')
        {
          console.log('transition to forbidden')
        }
        else
        {
          console.log('transitioning to login screen')
          // navigate to login screen
          this.router.navigate(['/login']);
        }
      }
      return allowed;
    }
    return true;
  }
}
