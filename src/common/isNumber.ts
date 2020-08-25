import {type} from './type'

export function isNumber(param?:any):boolean{
  return type(param) === 'Number'
}
