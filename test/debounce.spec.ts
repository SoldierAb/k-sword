import {debounce} from '../src'

jest.useFakeTimers()

describe('debounce ',()=>{
  it('基本使用',()=>{
    const mockFn = jest.fn()
    const _fn  = debounce(mockFn)
    for(let i=0;i<1000;i++){
      _fn(i)
    }
    jest.runAllTimers()
    expect(mockFn.mock.calls.length).toBe(1)
  })
  it('首次立即触发',()=>{
    const mockFn = jest.fn()
    const _fn  = debounce(mockFn,true)
    for(let i=0;i<1000;i++){
      _fn(i)
    }
    jest.runAllTimers()
    expect(mockFn.mock.calls.length).toBe(2)
  })
})
