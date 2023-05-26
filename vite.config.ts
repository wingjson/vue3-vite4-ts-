
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        }
    },
    // 配置开发端口及跨域
    server: {
        // port: 4500,
        proxy: {
            '/back': {
                target: 'server/api/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/back/, ''),
            }
        }
    },

})
