import {type} from './type'

export function isObject(param?:any):boolean{
  return type(param) === 'Object'
}
