import {isString} from '../src'

describe('isStrng unit',()=>{
  it('get true',()=>{
    expect(isString('')).toBe(true)
  })

  it('get false',()=>{
    expect(isString()).toBe(false)
  })
})
