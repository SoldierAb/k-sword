/**
 *
 *
 * @description 数组去扁平化
 * @param {any[]} arr
 * @param {number} [depArg]
 * @returns {any[]}
 */
export function flat(arr: any[], depArg?: number): any[] {
  const res: any[] = [];
  const depth = depArg || 1;
  let depNum = 0;
  const flatMap = (arr: any[]) => {
    arr.map((item, index, array) => {
      if (Array.isArray(item)) {
        if (depNum < depth) {
          depNum++;
          flatMap(item);
        } else {
          res.push(item);
        }
      } else {
        res.push(item);
        if (array.length === index + 1) depNum = 0;
      }
    })
  };
  flatMap(arr);
  return res;
}
