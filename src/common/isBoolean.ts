import {type} from './type'

export function isBoolean(param?:any):boolean{
  return type(param) === 'Boolean'
}
