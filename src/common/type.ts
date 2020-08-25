const toString = Object.prototype.toString

export function type(obj?:any):string{
  return toString.call(obj).replace(/\[object\s|\]/g,'')
}
