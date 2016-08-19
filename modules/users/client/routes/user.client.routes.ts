import { provideRouter, RouterConfig, Route } from '@angular/router';
import { Login } from '../components/login.component';
import { Register } from '../components/register.component';
import { ListUsers } from '../components/admin/listUsers.component';
import { User } from '../components/admin/user.component';
import { EditUser } from '../components/admin/editUser.component';

export const AdminRoutes: RouterConfig = [
  {
    path: 'admin',
    children: [{
      path: 'users',
      component: ListUsers
  },
  {
    path: 'users/:userId',
    component: User
  },
  {
    path: 'users/:userId/edit',
    component: EditUser
  }]
  }
];

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
