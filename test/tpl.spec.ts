import { tpl } from '../src'

describe('tpl unit',()=>{
  it("string replace",()=>{
    const str = `my name is {name},I'm {age} years old.`
    const obj = { name:"Jane", age:12 }
    expect(tpl(str,obj)).toMatchSnapshot()
  })
})

