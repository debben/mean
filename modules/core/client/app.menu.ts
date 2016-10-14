import { USERS_MENU } from '../../users/client/users.menu';

export const MENU = [
  {
    path: '/',
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
  ...USERS_MENU
];
