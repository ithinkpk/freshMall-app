import Vue from 'vue';
import Vuex from 'vuex';
import {
  setCookie,
  getUserCookie,
  removeCookie,
} from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 导航收放状态 false为展开 true为收回
    collapsed: false,
    // 用户路由
    menuRoutes: [],
    // 用户信息
    user: getUserCookie(),
  },
  getters: {},
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    logout(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    changeCollapsed({
      commit,
    }) {
      commit('changeCollapsed');
    },
    setUserInfo({
      commit,
    }, userInfo) {
      commit('setUserInfo', userInfo);
      setCookie(userInfo);
    },
    logout({ commit }) {
      commit('logout');
      removeCookie();
    },
    changeMenuRoutes({ commit }, routes) {
      commit('changeMenuRoutes', routes);
    },
  },
  modules: {},
});
