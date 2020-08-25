import {type} from './type'

export function isDate(param?:any):boolean{
  return type(param) === 'Date'
}
