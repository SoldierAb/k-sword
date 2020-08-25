import {type} from './type'

export function isString(param?:any):boolean{
  return type(param) === 'String'
}
