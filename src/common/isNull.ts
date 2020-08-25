import {type} from './type'

export function isNull(param?:any):boolean{
  return type(param) === 'Null'
}
