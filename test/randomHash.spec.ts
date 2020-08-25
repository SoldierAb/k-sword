import { randomHash } from '../src'

describe('randomHash',()=>{
 it('每次生成不一样的随机字符串',()=>{
  const diff = [randomHash(),randomHash(),randomHash()].reduce( (prev:string[],cur:string) => {
    return prev.includes(cur)?prev:[...prev,cur]
  },[])
  expect(diff.length).toEqual(3)
 })
})
