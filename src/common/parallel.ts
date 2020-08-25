/**
 *
 * @description Promise 限流并发
 * @param {any[]} params
 * @param {Function} iteratorFunc
 * @param {number} [limit=6]
 * @returns {Promise<any>}
 */

import {iterratorFn } from '../../index'

export async function parallel(
  params: any[],
  iteratorFunc: iterratorFn,
  limit = 6
): Promise<any> {

  const excuting: Promise<any>[] = [];
  const excutingRet: Promise<any>[] = [];
  let i = 0;

  const sequence = async ():Promise<any> => {
    if (i === params.length) return Promise.resolve();

    const pItem = params[i++];

    const p:Promise<any> = Promise.resolve().then(() => iteratorFunc(pItem) )

    excutingRet.push(p);

    const exInstance:Promise<any> = p.then(() =>
      excuting.splice(excuting.indexOf(exInstance), 1)
    )

    excuting.push(exInstance);

    let res = Promise.resolve();

    if (excuting.length >= limit) {
      res = Promise.race(excuting);
    }

    await (res);

    return sequence();

  }

  await sequence();

  return await Promise.all(excutingRet);
}
