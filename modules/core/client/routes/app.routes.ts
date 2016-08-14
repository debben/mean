import { provideRouter, RouterConfig, Route } from '@angular/router';
import { Home } from '../components/home.component';
import { AuthGuard } from '../providers/AuthGuard';
import { UiContainer } from '../components/uiContainer.component';
import { UserRoutes, LoginRoutes } from '../../../users/client/routes/user.client.routes';
import { Login } from '../../../users/client/components/login.component';
import { ArticleRoutes } from '../../../articles/client/routes/articles.routes';

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

const otherRoutes = addRouteChecks([
  ...ArticleRoutes,
  ...UserRoutes
]);

export const routes: RouterConfig = [
  ...LoginRoutes,
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
          menu: {
            title: 'Home',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      ...otherRoutes,
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
