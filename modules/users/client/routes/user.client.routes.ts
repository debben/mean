import { provideRouter, RouterConfig, Route } from '@angular/router';
import { Login } from '../components/login.component';
import { Register } from '../components/register.component';
import { ListUsers } from '../components/admin/listUsers.component';
import { User } from '../components/admin/user.component';
import { EditUser } from '../components/admin/editUser.component';

export const AdminRoutes: RouterConfig = [
  {
    path: 'admin',
    data: {
      menu: {
        title: 'Administration',
        icon: 'ion-android-person',
        selected: false,
        expanded: false,
        order: 9999
      }
    },
    children: [{
      path: 'users',
      component: ListUsers,
      data: {
        menu: {
          title: 'Manage Users',
          icon: 'ion-android-person',
          selected: false,
          expanded: false,
          order: 1
        },
        roles: [
          'admin'
        ]
      }
  },
  {
    path: 'users/:userId',
    component: User,
    data: {
      roles: [
        'admin'
      ]
    }
  },
  {
    path: 'users/:userId/edit',
    component: EditUser,
    data: {
      roles: [
        'admin'
      ]
    }
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
