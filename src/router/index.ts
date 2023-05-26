

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import LocalCache from '@/utils/cache'
import store from '@/store'
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/main',
    },
    {
        path: '/main',
        meta: {
            roles: ['admin', 'user'] // 允许管理员和用户角色访问
        },
        component: () => import('@/views/main/main.vue'),
    },
    {
        path: '/teditor',
        meta: {
            roles: ['admin', 'user'] // 允许管理员和用户角色访问
        },
        component: () => import('@/views/about/teditor.vue'),
    },
    {
        path: '/tree',
        meta: {
            roles: ['admin', 'user'] // 允许管理员和用户角色访问
        },
        component: () => import('@/views/tree/tree.vue'),
    },
    // {
    //   path: '/wangeditor',
    //   component: () => import('@/views/about/wangeditor.vue'),
    // },
]
const router = createRouter({
    routes,
    history: createWebHashHistory(),
})



export default router