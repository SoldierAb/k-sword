// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function extend(a:any,b:any):any{
  Object.keys(b).forEach(key=>{
    a[key] = b[key]
  })
  return a
}
