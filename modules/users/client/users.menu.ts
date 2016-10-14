export const USERS_MENU = [
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
    }]
  }
];
