import { ArticleList } from '../components/articleList.component';
import { ArticleEdit } from '../components/articleEdit.component';
import { ArticleView } from '../components/articleView.component';

export const ArticleRoutes = [{
  path: 'articles',
  data: {
    menu: {
      title: 'Articles',
      icon: 'ion-ios-paper',
      selected: false,
      expanded: false,
      order:1
    }
  },
  children: [
    {
      path: '',
      component: ArticleList,
      data: {
        menu: {
          title: 'List Articles',
          selected: false,
          expanded: false,
          order: 2
        }
      }
    },
    {
      path: 'create',
      component: ArticleEdit,
      data: {
        menu: {
          title: 'Create Article',
          selected: false,
          expanded: false,
          order: 3
        },
        roles: ['user', 'admin']
      }
    },
    {
      path: ':articleId',
      component: ArticleView
    }
  ]
}];
