import {ArticleList} from '../components/articleList.component';
import {ArticleEdit} from '../components/articleEdit.component';

export const ArticleRoutes = [{
  path: 'articles',
  data: {
    menu: {
      title: "Articles",
      icon: "ion-ios-paper",
      selected: false,
      expanded: false,
      order:1
    }
  },
  children: [
    {
      path: '',
      component:ArticleList
    },
    {
      path: 'create',
      component: ArticleEdit,
      data: {
//        roles: ['user', 'admin']
      }
    }
  ]
}];
