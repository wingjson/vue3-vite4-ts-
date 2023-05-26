// service统一出口
import TURequest from './request'
import LocalCache from '@/utils/cache'

const tuRequest = new TURequest({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: import.meta.env.TIME_OUT,
    interceptors: {
        requestInterceptor: (config) => {
            // 携带token的拦截
            const token = LocalCache.getCache('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        requestInterceptorCatch: (err) => {
            return err
        },
        responseInterceptor: (res) => {
            return res
        },
        responseInterceptorCatch: (err) => {
            return err
        }
    }
})

export default tuRequest
