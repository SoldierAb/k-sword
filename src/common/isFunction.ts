import {type} from './type'

export function isFunction(param?:any):boolean{
  return type(param) === 'Function'
}
