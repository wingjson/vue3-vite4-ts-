import { Module } from 'vuex';
import { RouteRecordRaw } from 'vue-router';
import router from '@/router/index'

interface RouteState {
  routes: RouteRecordRaw[]; // 存储动态路由信息
}

const routeModule: Module<RouteState, any> = {
  namespaced: true, 
  state: {
    routes: [] // 初始化为空数组
  },
  mutations: {
    addRoute(state, route) {
      route.forEach((v: any) => {
        router.addRoute(v)
      });
    },
    setRoutes(state, routes) {
      state.routes = routes; // 设置路由信息
    },
    // 其他 mutations，例如删除路由等
  },
  actions: {
    addRoute({ commit }, route) {
      commit('addRoute', route); // 调用 mutation 添加路由
    },
    // 其他 actions
  },
  getters: {
    getRoutes(state) {
      return state.routes; // 返回存储的路由信息
   }
  }
};

export default routeModule;
