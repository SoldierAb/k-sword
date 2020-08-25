import {throttle} from '../src'

jest.useFakeTimers()

describe('throttle',()=>{
  it('基本使用',()=>{
    const fn = jest.fn()
    const mockFn = throttle(fn)
    for(let i=0;i<10;i++){
      mockFn()
    }
    jest.runAllTimers()
    expect(fn.mock.calls.length).toBe(1)
  })
})
