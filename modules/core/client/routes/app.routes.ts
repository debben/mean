import { Routes, RouterModule } from '@angular/router';
import { Home } from '../components/home.component';
import { AuthGuard } from '../providers/AuthGuard';
import { UiContainer } from '../components/uiContainer.component';

let addRouteChecks = function(routes:Array<Route>):Array<Route> {
  routes.forEach((route) => {
    if (route.children) {
      addRouteChecks(route.children);
    }

    if (!route.canActivate) {
      route.canActivate = [];
    }
    route.canActivate.push(AuthGuard);
  });
  return routes;
}

export const routes: Routes = [
  {
    path: '',
    component: UiContainer,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: Home,
        canActivate: [AuthGuard],
        data: {

        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  },
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
