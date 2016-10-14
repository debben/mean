import { Routes, RouterModule } from '@angular/router';
import { Login } from '../components/login.component';
import { Register } from '../components/register.component';
import { ListUsers } from '../components/admin/listUsers.component';
import { User } from '../components/admin/user.component';
import { EditUser } from '../components/admin/editUser.component';

export const AdminRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'users',
      component: ListUsers,
      data: {
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

export const LoginRoutes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  }
];

export const routing = RouterModule.forChild([...LoginRoutes, ...AdminRoutes]);
