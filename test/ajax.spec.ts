import {ajax} from '../src'

describe('ajax',()=>{
  it('基本使用',()=>{
    const mockRes = {data:'',code:1,msg:'success'}
    ajax.requestConfig = config =>{
      config.baseURL = 'http:192.168.50.12:9000'
      config.headers.token = 'Bear saJKajhalsdoi1Ss56sahkdfahijvbks6_dfh2saYpa'
      return config
    }
    ajax.get('/testApi').then( (res: any) =>expect(res).toEqual(mockRes))

  })

})
