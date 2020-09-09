export interface configProvider{
  [key:string]:any
}

let inited = false

export class Config{

  [key:string]:any

  constructor(opt:configProvider = {}){
    this.config = opt;
  }

  init(conf:configProvider):void{
    if(inited){
      throw new Error('[V.conf error]: Only perform configuration data initialization once, please call other methods if you need to update data')
    }
    this.config = conf
    this.proxy()
    inited = true;
  }

  proxy():void{
    Object.keys(this.config).forEach(key=>{
      this.reactive(key,this.config)
    })
  }

  reactive(key:string,target:Config):void{
    Object.defineProperty(this, key, {
      get(){
        return target[key]
      },
      set(){
        throw new Error('[V.conf error]: Please use setState instead of direct assignment')
      }
    })
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  add(key:string,val:any):void{
    this.config[key] = val
    this.reactive(key,this.config)
  }

  setState(obj:configProvider):void{
    Object.keys(obj).forEach(key=>{
      if(this.config.hasOwnProperty(key)){
        this.config[key] = obj[key]
      }
    })
  }

  get(key:string):any{
    return this.config[key]
  }

  delete(key:string):void{
    delete this.config[key]
  }

}

export const conf = new Config()
