# 类型校验


## type
类型获取

  ```js
    K.type() // Undefined
    K.type(1) // Number
    K.type('1') // String
    K.type(true) // Boolean
    K.type(null) // Null
    K.type(Symbol()) // Symbol
    K.type(()=>{}) // Function
    K.type([])   // Array
    K.type(Promise.resolve())   // Promise
    K.type({})   // Object

  ```
#### 同时 V 实例包含快捷判断 ,例如 ：
  ```js
    K.isArray
    K.isBoolean
    K.isFunction
    K.isNull
    K.isNumber
    K.isObject
    K.isPromise
    K.isString
    K.isSymbol
    K.isUndefined
    K.isDate
  ```

## isArray
  ```js
   K.isArray([]) // true
  ```
## isChineseIDCardNumber
  ```js
    //不是合法的身份证号, false
    for (const value of [
      '2000',
      '190101881101231',
      '110101881301231',
      '110101198811214398',
      '11010119881101331a',
      '469001399208187005',
      '46900119925818180x',
      '530627199508918277',
      '110106100001019457', // 1000 年
      '140425900001017773', // 9000 年
    ]) {
      K.isChineseIDCardNumber(value)
    }
  })

  //是合法的身份证号, true
    for (const value of [
      '110101198811014398',
      '11010119881101331X',
      '469001199208187005',
      '46900119920818180x',
    ]) {
      K.isChineseIDCardNumber(value)
    }
  })

  ```
## isDate
  ```js
    K.isDate(new Date()) // 日期类型判断 , true
  ```

## isFunction
  ```js
    K.isFunction(()=>{}) // 函数类型判断, true
  ```
## isNull
  ```js
    K.isNull(null)  //  true
  ```
## isNumber
  ```js
    K.isNumber(1)  // true
    K.isNumber(`1`)  // false
  ```
## isNumberic
  检查 `value` 是否是数值，需要注意的是 `Infinity`、`-Infinity`、`NaN` 不被认为是数值。

  ```js
    K.isNumberic(1)  // true
    K.isNumberic(`1`)  // true
  ```
## isObject
  ```js
    K.isObject({})  // true
  ```
## isPossibleChineseMobilePhoneNumber
  ```js
    // 不可能是中国的手机号码'
    for (const value of [
      '',
      110,
      120,
      10086,
      '180800300800',
      12345678,
      87654321,
    ]) {
      K.isPossibleChineseMobilePhoneNumber(value)   //false
    }

  // 可能是中国的手机号码',
    for (const value of [
      16080030080,
      18087030088,
      13907199856,
      '13591512420',
      19913769406,
      18512345657,
    ]) {
      K.isPossibleChineseMobilePhoneNumber(value)   // true
    }
  ```
## isPromise
  ```js
    // 不像 Promise
    for (const value of [
      '',
      null,
      undefined,
      1,
      /dd/,
      {},
      [],
      async () => 1,
      Map,
    ]) {
      K.isPromise(value)  // false
    }

  // 像 Promise'
    for (const value of [
      { then: () => 1 },
      Promise.resolve(),
      (async () => true)(),
    ]) {
      K.isPromise(value)    //true
    }
  ```
## isString
  ```js
    K.isString(``) // true
    K.isString() // false
  ```
## isSymbol
  ```js
    K.isSymbol(Symbol(1))   // true
  ```
## isUndefined
  ```js
    K.isUndefined()   // true
  ```


## isUrl
  ```js
     // 都为 false
     for (const value of [
      'http://127.0.0.1',
      'http://foo.bar:8878878',
      'wx://foo.bar',
      'foo.bar',
      'http://',
      'https://',
      'ftp://foo.bar',
      'http://1111.0.1.22',
      '大口大口http://foo.bar',
      'http://foo.bar:80得到了',
    ]) {
      K.isUrl(value)
    }

    // 都为 false
    for (const value of [
      'http://foo.bar',
      'http://foo.bar:80',
      'http://foo.bar/oop?ddd#cc',
      'https://foo.bar',
      'http://39.137.107.98:22/hello',
    ]) {
      K.isUrl(value)
    }
  ```
