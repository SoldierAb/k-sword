/**
 * @description 模板字符串替换
 *
 * @export
 * @param {string} str                        eg: my name is {name},I'm {age} years old.
 * @param {(object|any)} obj                  eg: { name:"Jane", age:12 }
 * @returns {string}                          eg: my name is Jane,I'm 12 years old.
 */
export function tpl(str:string,obj:any):string{
  return str.replace(/\{(\w+)\}/g,function (...args):any{
    const [,key] = args;
    return obj[key]
  })
}
