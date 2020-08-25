import {Procedure} from '../../index'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function bind(fn:Procedure,thisArg:any):Procedure{
  return  (...args:any[])=>{
    return fn.apply(thisArg,args)
  }
}
