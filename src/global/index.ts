import { App } from 'vue'
import registerElement from './register-element'

export function registerApp(app: App) {
    //注册element-plus
    registerElement(app)
}
