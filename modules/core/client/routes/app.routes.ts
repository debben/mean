import {provideRouter, RouterConfig} from '@angular/router';
import {Home} from '../components/home.component';

export const routes:RouterConfig = [
  {
    path: '',
    component: Home,
    data: {
      menu: {
          title: "Home",
          icon: 'ion-android-home',
          selected: false,
          expanded: false,
          order:0
      }
    }
  },
  {
    path: '**',
    redirectTo: '/'
  },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
