import { App } from 'vue'
//导入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import { ElButton } from 'element-plus'

const components = [ElButton]

//全局注册常用组件
export default function registerApp(app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
