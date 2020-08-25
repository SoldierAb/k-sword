# 数据存储、加密


## cookies

#### read
  ```js
    // 读取
    K.cookies.read('key')
  ```

#### write
  ```js
  // 写入
   K.cookies.write('token','fasfdahojhohjsda213412')
  ```

#### remove
  ```js
   // 移除
   K.cookies.remove('key')
  ```




## md5

|参数|说明|类型|默认值|是否必须|
|----|---|-------|-------|---|
| string| 要进行 MD5 计算的字符串 |string|  | 是 |
| key | 用于创建 HMAC 的密码 |string|  | - |
| raw | 是否输出原始数据|boolean| false | - |

  ```js
    K.md5('陈') // => '682570a229cbd3d67e76ad99b3152060'
    K.md5('陈', '🐉') // => '293a529180e8b949aa820b9d071f31fa'
  ```
