import { createStore } from 'vuex';
import routeModule from './routeModule';

const store = createStore({
  modules: {
    routeModule // 将 routeModule 添加到模块列表中
    // 其他模块...
  },
  // 其他配置...
});

export default store;
