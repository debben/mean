import { provideRouter, RouterConfig, Route } from '@angular/router';
import { Login } from '../components/login.component';
import { Register } from '../components/register.component';

export const UserRoutes: RouterConfig = [];

export const LoginRoutes: RouterConfig = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  }
];
