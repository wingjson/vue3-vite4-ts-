
import router from '@/router/index'
import store from '@/store'
import { toRaw } from 'vue'
const whiteList = ['/login', '/noPermission', '/404']
const role = 'user'
router.beforeResolve(async(to, from,next) => {
    // if (whiteList.indexOf(to.path) !== -1) {
    //     next()
    // }
    // //通过权限判断
    // if(to.meta.roles.includes(role)){
    //   next() //放行
    //  }else{
    //   next({path:"/404"}) //跳到404页面
    //  }

  //  长度为0时,重新加载动态路由
   if(to.matched.length == 0){
    let dynamicRoutes:any = [
      {
          path: '/wangeditor',
          name: 'Wang',
          component:() => import('@/views/about/wangeditor.vue'),
          meta: {
          roles: ['admin', 'user'] // 允许管理员和用户角色访问
          }
      },
      // 其他动态路由...
      ];
         JSON
      localStorage.setItem("dynamicRoutes",dynamicRoutes)
      // 刷新时从localStroge重新获取  权限变更时同时同步localstroge
      store.commit('routeModule/setRoutes', dynamicRoutes);
      const getRoutes = store.getters['routeModule/getRoutes']
      
      // 根据需要的逻辑，使用 Vuex 的操作添加动态路由[]
      await store.dispatch('routeModule/addRoute', toRaw(getRoutes)).then(()=>{
        next({ ...to, replace: true });
      })
   }else{
        next()
   }
    // 
    // if (!store.getters['routeModule/getRoutes']) {
    //     // 从 localStorage 中获取动态路由信息
    //     const dynamicRoutes = JSON.parse(localStorage.getItem('dynamicRoutes') || '[]');
    
    //     // 存储动态路由到 Vuex
    //     store.commit('routeModule/setRoutes', dynamicRoutes);
    
    //     // 根据需要的逻辑，使用 Vuex 的操作添加动态路由
    //     await store.dispatch('routeModule/addRoute', toRaw(dynamicRoutes));
    
    //     // 执行页面导航
    //     next({ ...to, replace: true });
    //   } else {
    //     next();
    //   }
})
 
 
