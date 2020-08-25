import {parallel} from '../src'

// jest.useFakeTimers();

describe('parallel',()=>{

  it('基础使用',async ()=>{
    const params = [1,2,3,4]
    const fn = async (...args:any[])=>args
    const res = await parallel(params,fn)
    expect(res).toStrictEqual([
      [1],[2],[3],[4]
    ])
  })
  it('限流测试 limit= 5；（默认limit = 6）', async ()=>{
    let requestCount = 0,
        maxCount = 0;

    const limit = 5

    const params = [1,2,3,4,5,6,7,8]

    const fn = (arg:any):Promise<any>=>{
      // 请求发起
      const count = ++requestCount

      if(count>=maxCount) maxCount = count

      return new Promise((resolve)=>{
        setTimeout(()=>{
          // 请求返回
          --requestCount
          resolve(arg)
        },Math.random()*100)
      })
    }

    const res = await parallel(params,fn,limit)
    // 结果正常返回
    expect(res).toStrictEqual(params)

    // 所有请求都已发送
    expect(requestCount).toEqual(0)

    // 最大并发数为限制并发数
    expect(maxCount).toEqual(limit)

  })
})
