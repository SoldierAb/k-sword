import {isFunction} from './isFunction'


export type Procedure = (...args:any[])=>void


/**
 *
 * @description 防抖， [一段时间内，若干个函数调用合成一次，并在给定时间过去之后只执行一次]
 * @author SoldierAb
 * @template F
 * @param {F} fn
 * @param {number} [delay=300]
 * @param {boolean} [immediately=true]
 * @returns {(this: ThisParameterType<F>, ...args: Parameters<F>) => void}
 */
export function debounce<F extends Procedure>(
  fn:F,
  immediately = false,
  delay = 300
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {

  let timer:any = null;

  if(!isFunction(fn)){
    throw new Error(`the first param must be a Function at debounce`)
  }
  if (!delay) {
    delay = 300;                       //默认时间间隔300毫秒
  }
  return function (this: ThisParameterType<F>, ...args: Parameters<F>){

    const ctx = this;

    if (timer) clearTimeout(timer);

    if (immediately) {
        const doImmediately = !timer;
        timer = setTimeout(() => {
            fn.apply(ctx, args);
        }, delay);
        if (doImmediately) {
            fn.apply(ctx, args);
        }
    } else {
        timer = setTimeout(() => {
            fn.apply(ctx, args);
        }, delay)
    }
  }

}
