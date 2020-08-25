import {cookies } from '../src'

const testKey = 'testKey'
const testValue = 'testValue'

describe('cookies',()=>{
  it('read write',()=>{
    cookies.write(testKey, testValue)
    expect(cookies.read(testKey)).toEqual(testValue)
  })
  it('remove',()=>{
    cookies.remove(testKey)
    expect(cookies.read(testKey)).toBe(null)
  })
})
