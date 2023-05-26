/*
 * @Author: www
 * @Date: 2023-05-22 08:48:49
 * @LastEditors: www 
 * @LastEditTime: 2023-05-22 16:33:43
 * @FilePath: \tspace\src\main.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by www , All Rights Reserved. 
 */

import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import i18n from './locals'
import { Boot } from '@wangeditor/editor'
import attachmentModule from '@wangeditor/plugin-upload-attachment'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
// 路由守卫
import './router/permission'


// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
Boot.registerModule(attachmentModule)

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
})
app.use(VXETable)
app.use(i18n)
app.use(router)
app.use(store)

app.mount('#app')
