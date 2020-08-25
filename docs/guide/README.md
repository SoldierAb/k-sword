# 通用方法

## debounce

|参数|说明|类型|默认值|是否必须|
|----|---|-------|-------|---|
| fn| 函数 |Function| -| 是|
|immediately|是否立即执行|boolean|false|-|
|delay|延迟|number|300|-|-|

#### 基本使用
  ```js
    let i=0;
    const mockFn = ()=>++i
    const _fn  = K.debounce(mockFn)
    for(let i=0;i<1000;i++){
      _fn(i)
    }
    // 只会执行一次 , 默认 300ms 后执行 i = 1
  ```

#### 首次立即执行 （默认 false）
  ```js
    let i=0;
    const mockFn = ()=>++i
    const _fn  = K.debounce(mockFn,true)
    for(let i=0;i<1000;i++){
      _fn(i)
    }
    // 执行2次 ， 首次立即执行后i=1 , 默认300 ms 后 i = 2
  ```
#### 执行延迟设置
  ```js
    let i=0;
    const mockFn = ()=>console.log(++i)
    const _fn  = K.debounce(mockFn,true,1000)
    for(let i=0;i<1000;i++){
      _fn(i)
    }
    // 先输出 1 ， 停留 1秒 后输出 2

  ```

## EventBus
#### 可订阅发布
  ```js
    const bus = new K.EventBus()
    const enterCallback = ()=>{}
    bus.on('enter', enterCallback)
    bus.emit('enter')
  ```
#### 取消订阅
  ```js
    const bus = new K.EventBus()
    const enterCallback1 = ()=>{ console.log(1) }
    const enterCallback2 = ()=>{ console.log(2) }
    bus.on('enter', enterCallback1)
    bus.on('enter', enterCallback2)
    bus.emit('enter')  //  1,2
    bus.off('enter', enterCallback2)
    bus.emit('enter')  //  1
    bus.off('enter')
    bus.emit('enter')  //
  ```
#### 订阅发布多次
  ```js
    let i=0;
    const bus = new K.EventBus()
    const enterCallback = ()=>++i
    const enterCallback2 = ()=>++i
    bus.on('enter', enterCallback)
    bus.on('enter', enterCallback2)
    bus.emit('enter')
    bus.emit('enter')
    bus.emit('enter')
    // i= 6
  ```
#### 传参
  ```js
    const bus = new K.EventBus()
    const errorCallback = ({message})=>{
      console.log(message)
    }
    bus.on('error', errorCallback)
    bus.emit('error', { message: 'unexpected error' })
    // unexpected error
  ```
#### 只订阅一次
  ```js
    let i = 0;
    const bus = new K.EventBus()
    const enterCallback = ()=>++i
    bus.on('enter', enterCallback)
    bus.emit('enter')
    bus.emit('enter')
    bus.emit('enter')
    bus.emit('enter')
    bus.emit('enter')
    // i = 1
  ```

## flat


|参数|说明|类型|默认值|是否必须|
|----|---|-------|-------|---|
| arr| 数组 |any[ ]| - | - |
| depth | 去扁平化深度 ( 支持`Infinity` ) |number| 1 | - |
#### 基础使用
```js
  K.flat([1,[2],[[3]]])
  // [1,2,[3]]
  K.flat([1,[2],[[3]]],Infinity)
  // [1,2,3]
```

## formatNumber

|参数|说明|类型|默认值|是否必须|
|----|---|-------|-------|---|
| thousandsSeparator| 整数部分的千分位分隔符 |string| ， | - |
| thousandthsSeparator |小数部分的千分位分隔符 | string |  | - |

#### 基本使用
  ```js
  K.formatNumber(1314.56789) // => '1,314.56789'
  K.formatNumber(1314.56789, { thousandsSeparator: ' ' }) // => '1 314.56789'
  K.formatNumber(1314.56789, { thousandthsSeparator: ',' }) // => '1,314.567,89'
  ```


## readFile

|参数|说明|类型|默认值|是否必须|
|----|---|-------|-------|---|
| file | 要读取的文件 |File|| 是 |

#### 返回 Promise < T \>
  ```js
    //  T 类型：ReadFileReader
    { text, json, dataUrl, base64, arrayBuffer }
  ```

#### 使用
  ```html
    <input type="file" onchange="getFile(event)" />
    <script>
      function getFile(e){
        console.log(e.target.files[0])
        K.readFile(e.target.files[0]).then(res=>{
          console.log(res.text())  // 文件内容
        })
      }
    </script>
    <!-- 可打开dist/index.html 并读取 dist/test.json 测试 -->

  ```


## throttle
节流

|参数|说明|类型|默认值|是否必须|
|----|---|-------|-------|---|
| fn| 函数 |Function| -| 是|
|delay|延迟|number|300|-|-|

#### 使用
  ```js

    const resize = ()=>{
      // 窗口尺寸操作 。。。
    }
    window.onresize = K.throttle(resize)
    // 类似scroll 事件等也可使用
  ```


## tpl

模板字符串

|参数|说明|类型|默认值|是否必须|
|----|---|-------|-------|---|
| str | 模板字符串 |string| -| 是|
| obj | 数据对象 |object| -| 是|

#### 使用
  ```js
    K.tpl(`My name is {name}`,{name:'k-sword'})
    // My name is k-sword
  ```

## parallel
Promise 并发限流  , 根据参数集合进行并发请求，保证请求并发数最大为`limit`数。 当某个请求返回（并发请求队列返回不分先后，利用的是Promise.race），后续队列加入并不超过并发数，最终结果正常返回


|参数|说明|类型|默认值|是否必须|
|----|---|-------|-------|---|
| params | 参数集合 |any [ ]| -| 是|
| iteratorFunc | 调用函数 |Function : Promsie<any\>| -| 是|
| limit | 并发数 |Number| 6|  -|

#### 使用
  ```js
    const params = [1,2,3,4,5,6,7,8]
    const fn = async (...args:any[])=>args
    const res = await K.parallel(params,fn)
    // res =  [1],[2],[3],[4],[5],[6],[7],[8]
  ```


## union
多个集合交集
#### 使用
  ```js
    K.union() // []
    K.union([1]) // [1]
    K.union([1],[1,2],[1,2,3,4]) // [1]
  ```


## upload

文件上传

|参数|说明|类型|默认值|是否必须|
|----|---|-------|-------|---|
| file | 文件对象 |File| -| 是|
| action | 接口地址 |string| -| 是|
| onProgress | 上传进度 |Function ; 接收参数：e : UploadProgressEvent| - |  是|
| onSuccess | 上传成功 |Function ; 接收参数： res : XMLHttpRequest.response | - |  是|
| onError | 上传错误 |Function ; 接收参数：err: Error | - |  是 |
| headers | 请求头 |Object| - |  -|
| data | 请求附加数据 |Object| - |  -|
| withCredentials | cookies校验支持 |Boolean| - |  -|
| filename | 文件名 |string| file |  -|
| method | 请求类型 |string| POST |  -|

#### 基本使用
  ```js
      K.upload({
        headers:{
         Token:'asdfsfJKJFDhsdaHsadfsaHJjjkliuecxadsdKJsdfKHJHK_L'
        },
        file: new File(["foo"], "foo.txt", {
          type: "text/plain",
        }),
        action: 'http://example.com',
        data:{
          name:'chen'
        },
        onProgress: (e) => {
          console.log(e)
        },
        onSuccess: (res) => {
          console.log(res)
        },
        onError: (err) => {
          console.error(err)
        }
      })
  ```


## wait


|参数|说明|类型|默认值|是否必须|
|----|---|-------|-------|---|
| milliseconds | 等待时间(毫秒) |number | -| -|

#### 基本使用
  ```js
    async ()=>{
      const start = Date.now()
      await K.wait(110)
      const end = Date.now()
    }
  ```
#### 可取消等待
  ```js
    async () => {
      const cb = ()=>{}
      const w = K.wait(100)
      w.then(cb)
      w.cancel()
      await wait(100)
    }
  ```


## loadScript

|参数|说明|类型|默认值|是否必须|
|----|---|-------|-------|---|
| url | 脚本src链接 | str | -| 是|
| cache | 是否缓存url资源 | boolean | true | -|


#### 基本使用
  ```js
    K.loadScript('/release.config.js',false)
    // 每次都会加载最新的资源
  ```


## randomHash
  ```js
    K.randomHash() // 返回随机字符串
  ```
