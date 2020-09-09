export type Procedure = (...args:any[])=>void

import {isFunction} from './isFunction'


export function throttle<T extends Procedure>(
  fn:T,
  delay = 300
):(this:ThisParameterType<T>,...args:Parameters<T>)=>void{
    let timer:any = null;
    if (!isFunction(fn)){
      throw new Error(`the 1st param must be a Function at throttleUtil`);
    }

    let startTime = Date.now();

    return function(this:ThisParameterType<T>,...args:Parameters<T>){

      const ctx = this;
      const curTime = Date.now();
      const remaining = delay - (curTime - startTime);
      clearTimeout(timer);

      if (remaining <= 0) {
          fn.apply(ctx, args);
          startTime = Date.now();
      } else {
          timer = setTimeout(() => {
              fn.apply(ctx, args);
          }, remaining);
      }
    }
}
