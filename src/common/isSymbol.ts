import {type} from './type'

export function isSymbol(param?:any):boolean{
  return type(param) === 'Symbol'
}
