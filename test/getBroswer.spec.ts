import {getBroswer} from '../src'

Object.defineProperty(window.navigator,'userAgent',{
  writable:true
})

describe('getBroswer',()=>{

  it('Firefox',()=>{
    // @ts-ignore
    window.navigator.userAgent = 'sadasd Firefox 3213'
    expect(getBroswer()).toBe('Firefox')
  })
  it('Chrome',()=>{
     // @ts-ignore
     window.navigator.userAgent = 'sadasd Chrome 3213'
    expect(getBroswer()).toBe('Chrome')
  })
  it('Safari',()=>{
     // @ts-ignore
     window.navigator.userAgent = 'sadasd Safari 3213'
    expect(getBroswer()).toBe('Safari')
  })
  it('IE',()=>{
    Object.defineProperty(window,'ActiveXObject',{
      enumerable:true
    })
    expect(getBroswer()).toBe('IE')
  })
})
