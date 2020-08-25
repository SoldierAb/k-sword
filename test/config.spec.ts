import { conf } from '../src'

const _data = {
  name:'vizier',
  age:12,
  address:'dadadad'
}
conf.init(_data)

describe('conf unit',()=>{
  it('init 配置数据初始化',() => {
    expect(conf.name).toEqual(_data.name)
  })
  it('get 获取',()=>{
    expect(conf.name).toEqual(conf.get('name'))
  })
  it('delete 删除',()=>{
    expect(conf.name).toEqual(_data.name)
    expect(conf.age).toEqual(_data.age)
    conf.delete('age')
    expect(conf.hasOwnProperty('name')).toBe(true)
    expect(conf.config.hasOwnProperty('age')).toBe(false)
    expect(conf.age).toBe(undefined)
  })
  it('setState ',()=>{
    const obj = {
      age:24,
      address:'street-1',
      company:'dianchu'
    }
    conf.setState(obj)
    expect(conf.address).toEqual(obj.address)
    expect(conf.hasOwnProperty('company')).toBe(false)
  })
  it('add',()=>{
    conf.add('company','dianchu')
    expect(conf.hasOwnProperty('company')).toBe(true)
  })
})

