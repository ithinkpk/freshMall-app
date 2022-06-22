import Vue from 'vue';
import VueRouter from 'vue-router';
<<<<<<< HEAD
import HomeView from '../views/layout/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = new VueRouter({
  routes,
});

=======
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
  },
  component: HomeView,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
    },
    component: () => import('../views/page/productList.vue'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '商品添加',
    },
    component: () => import('../views/page/productAdd.vue'),
  }, {
    path: 'category',
    name: 'Category',
    meta: {
      title: '类目管理',
    },
    component: () => import('../views/page/productCategory.vue'),
  }],

}];

const routes = [{
  path: '/',
  name: 'home',
  component: HomeView,
  meta: {
    title: '首页',
  },
  children: [{
    path: 'index',
    name: 'index',
    meta: {
      title: '统计',
    },
    cpmponent: () => import('../views/page/productIndex.vue'),
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
        router.addRoutes(menuRoutes);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes));
        isAddRouter = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

>>>>>>> 5eb329f (菜单权限设置)
export default router;
