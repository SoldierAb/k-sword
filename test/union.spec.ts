import {union} from '../src'

describe('union unit',()=>{
  it('无参数',()=>{
    expect(union()).toMatchSnapshot()
  })
  it('单个参数',()=>{
    expect(union([1])).toMatchSnapshot()
  })
  it('多个参数',()=>{
    expect(union([1],[1,2],[1,2,3,4])).toMatchSnapshot()
  })
})
