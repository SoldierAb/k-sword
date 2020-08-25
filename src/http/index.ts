import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import { bind } from '../common/bind'
import { extend } from '../common/extend'

export interface HttpInstance extends AxiosInstance {
  [key: string]: any
}

export class Ajax {
  [key:string]:any

  public _config: AxiosRequestConfig

  __CREATED__ = false

   $: HttpInstance

  public requestConfig: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>

  public responseRes: (res: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>

  public requestError: (error: any) => any

  public responseError: (error: any) => any

  constructor(opt: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    method:'GET',
    timeout: 5000,
  }) {
    this._config = opt
    this.$ = axios.create(this._config)
    this.requestConfig = opt => (opt.baseURL = '/', opt)
    this.requestError = err => Promise.reject(err)
    this.responseRes = res => res
    this.responseError = err => Promise.reject(err)
    this.setInterceptors()
    this.__CREATED__ = true
  }

  setInterceptors():void {
    this.$.interceptors.request.use(conf => {
      return this.requestConfig(conf)
    }, err => {
      return this.requestError(err)
    })
    this.$.interceptors.response.use(res => {
      return this.responseRes(res)
    }, err => {
      return this.responseError(err)
    })
  }
}

export function createAjax():Ajax{
  const ajax = new Ajax()
  const instance =  bind(ajax.$.request,ajax)
  const _a = extend(instance, ajax)
  for (const key in ajax) {
    Object.defineProperty(_a, key, {
      get() {
        return ajax[key]
      },
      set(newVal) {
        ajax[key] = newVal;
      }
    })
  }
  for (const key in ajax.$) {
    Object.defineProperty(_a, key, {
      get() {
        return ajax.$[key]
      },
      set(newVal) {
        ajax.$[key] = newVal;
      }
    })
  }
  return _a
}

export const ajax = createAjax()
