export type Procedure = (...args:any[])=>void

export type iterratorFn = (...arg:any[])=>Promise<any>

export interface UploadOptions {
  file: File
  action: string
  headers?: any
  data?: any
  withCredentials?: boolean
  filename?: string
  method?:string
  onProgress: Procedure
  onSuccess: Procedure
  onError: Procedure
}

