import {UploadOptions} from '../../index'

// extends Error
export class UploadError extends Error {
  status?: number
  method?: string
  url?: string
  constructor(m: string) {
    super(m)
    Object.setPrototypeOf(this, UploadError);
  }
}


export class UploadProgressEvent extends ProgressEvent{
  percent?: number
  constructor(m: string) {
    super(m)
    Object.setPrototypeOf(this, UploadProgressEvent);
  }
}


/**
 *
 * @description 上传
 * @param {UploadOptions} option
 * @returns {void}
 */
export function upload(option: UploadOptions): void {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }

  const xhr = new XMLHttpRequest();
  const action = option.action;      //请求url
  const {method = 'POST'} =  option

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e:UploadProgressEvent) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      option.onProgress(e);
    };
  }
  //文件formData
  const formData = new FormData();
  if (option.data) {
    Object.keys(option.data).map(key => {
      formData.append(key, option.data[key]);
    });
  }
  if (option.filename && option.file) formData.append(option.filename, option.file);


  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, xhr, method), getBody(xhr));
    }

    option.onSuccess(getBody(xhr));
  };

  xhr.open(method, action, true);

  //是否cookie
  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.headers || {};

  // if (headers['X-Requested-With'] !== null) {
  //   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  // }

  for (const item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }

  xhr.send(formData);
}


export function getError(action: string, xhr: XMLHttpRequest, method: string): UploadError {
  const msg = `fail to ${method} ${action} ${xhr.status}`;
  const err = new UploadError(msg);
  err.status = xhr.status;
  err.method = method;
  err.url = action;
  return err;
}


export function getBody(xhr: XMLHttpRequest): string {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

