import {flat} from '../src'

describe('flat unit',()=>{
  it('去扁平化，默认depth = 1',()=>{
    const arr = [1,[2],[[3]],[[[4]]]]
    expect(flat(arr)).toMatchSnapshot()
  })
  it('flat 2 depth',()=>{
    const arr = [1,[2],[[3]],[[[4]]]]
    expect(flat(arr,2)).toMatchSnapshot()
  })
  it('flat Infinity depth',()=>{
    const arr = [1,[2],[[3]],[[[4]]]]
    // const res = [1,2,3,4]
    expect(flat(arr,Infinity)).toMatchSnapshot()
  })
})
