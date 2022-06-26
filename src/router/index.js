import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getMenuRoute from '@/utils/permission';
import HomeView from '../views/layout/HomeView.vue';
import LoginView from '../views/layout/loginView.vue';
import About from '../views/AboutView.vue';

Vue.use(VueRouter);

const ayncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    icon: 'shopping',
  },
  component: HomeView,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      icon: 'ordered-list',
    },
    component: () => import('../views/page/productList.vue'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '商品添加',
      icon: 'file-add',
    },
    component: () => import('../views/page/productAdd.vue'),
  }, {
    path: 'category',
    name: 'Category',
    meta: {
      title: '类目管理',
      icon: 'project',
    },
    component: () => import('../views/page/productCategory.vue'),
  }],

}];

const routes = [{
  path: '/',
  name: 'home',
  component: HomeView,
  redirect: '/index',
  meta: {
    title: '首页',
    icon: 'home',
  },
  children: [{
    path: 'index',
    name: 'index',
    meta: {
      title: '统计',
      icon: 'bar-chart',
    },
    component: () => import('../views/page/productChart.vue'),
  }],
},
{
  path: '/login',
  name: 'login',
  meta: {
    title: '登录',
    hidden: true,
  },
  component: LoginView,
},
{
  path: '/about',
  name: 'about',
  meta: {
    title: '关于我们',
    icon: 'usergroup-delete',
  },
  component: About,
},
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

let isAddRouter = false;

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRouter) {
        const menuRoutes = getMenuRoute(store.state.user.role, ayncRouterMap);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => { next(); router.addRoutes(menuRoutes); });
        isAddRouter = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
