import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface TURequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: any) => any
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface TURequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: TURequestInterceptors<T>
  showLoading?: boolean
}
