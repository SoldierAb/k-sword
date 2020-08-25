
/**
 * @description 求多个数组之间的交集
 * @param {...any[]} args
 * @returns {any[]}
 */
export function union(...args: any[]): any[] {
  if (args.length === 0) return [];
  if (args.length === 1) return args[0];
  const unionArr = args.reduce((cur, arg) => {
    return cur.filter((item: any) => arg.includes(item))
  })
  return unionArr;
}
