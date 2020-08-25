# conf
配置数据

## init


  ```js
    K.conf.init({name:'k-sword'})

    // 初始化配置 , **`只执行一次`**
    K.conf.init({name:'k-sword'})
    // [K.conf error]: Only perform configuration data initialization once, please call other methods if you need to update data
  ```

## add

添加参数

|参数|说明|类型|默认值|是否必须|
|----|---|-------|-------|---|
| key | 添加的key | string | - | 是|
| value | 添加的value | any | - | 是|

  ```js
    K.conf.add('age', 12)
    console.log(K.conf) // { name:'k-sword', age: 12}
  ```

## get

获取参数

|参数|说明|类型|默认值|是否必须|
|----|---|-------|-------|---|
| key | 添加的key | string | - | 是|

  ```js
    K.conf.get('name') // k-sword
    // or
    K.conf['name'] // k-sword
  ```

## setState

更新参数

|参数|说明|类型|默认值|是否必须|
|----|---|-------|-------|---|
| obj | 更新配置数据 | Object | - | 是|

  ```js
    K.conf.setState({
      age:13,
      address:'dianchu 9F'   // 当前配置数据模板没有的字段不进行添加
    })
    console.log(K.conf) // { name:'k-sword', age: 13}
  ```
`注： ` 更新参数不支持直接赋值，如：
  ```js
    K.conf.age = 13 // [K.conf error]: Please use setState instead of direct assignment
  ```

## delete

删除参数

|参数|说明|类型|默认值|是否必须|
|----|---|-------|-------|---|
| key | 删除的key | string | - | 是|

  ```js
    K.conf.delete('age')
    console.log(K.conf.age) // undefined
  ```
