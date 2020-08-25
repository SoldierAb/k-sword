import {type} from './type'

export function isArray(param?:any):boolean{
  return type(param) === 'Array'
}
