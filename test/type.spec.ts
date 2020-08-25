import {type} from '../src'


describe('type unit',()=>{
  it('get Undefined',()=>{
    expect(type()).toMatchSnapshot()
  })
  it('get Number',()=>{
    expect(type(1)).toMatchSnapshot()
  })
  it('get String',()=>{
    expect(type(`dasdasd`)).toMatchSnapshot()
  })
  it('get Function',()=>{
    expect(type(new Function())).toMatchSnapshot()
  })
  it('get Array',()=>{
    expect(type([])).toMatchSnapshot()
  })
  it('get Symbol',()=>{
    expect(type(Symbol(1))).toMatchSnapshot()
  })
})
