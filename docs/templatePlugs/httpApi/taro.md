# taro http封装

![](https://oscimg.oschina.net/oscnet/up-679054f2b349a3455578cd16b14616ed289.png)

src目录下新建service 创建api.js config.js http.js

## http.js

```javascript
import Taro from '@tarojs/taro'

let token = ''

function http(method, url, data = {}) {
  return new Promise(function (resolve, reject) {
    Taro.request({
      url: url,
      method: method,
      data: JSON.stringify(data),
      header: {
        'Content-Type': 'application/json; charset=utf-8',
        'token': token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          if (res.data.code === 400) {
            console.log('400,参数错误')
            reject(res)
          }
          if (res.data.code === 401) {
            console.log('401,登录过期')
            Taro.showToast({
              title: '登录过期,重新登录',
              icon: 'none',
              duration: 2000
            })
            // Taro.navigateTo({
            //   url: '/pages/login/index'
            // })
            reject(res)
          }
          if (res.data.code === 404) {
            console.log('404,接口错误')
            reject(res)
          }
          if (res.data.code === 500) {
            console.log('500,后台程序错误')
            reject(res)
          } else {
            resolve(res)
            console.log(res)
          }
        } else {
          reject(res)
          console.log(res)
        }
      },
      fail: function (err) {
        console.log(err)
        reject(err)
      }
    })
  })
}
export default http
```

## api.js

```javascript
import Taro from '@tarojs/taro'
import http from './http.js'
// console.log('当前taro类型  weapp h5等',process.env.TARO_ENV)
// console.log('当前taro环境',process.env.BASE_URL)

let BASE_URL = ''
if (process.env.NODE_ENV === '"development"') {
  BASE_URL = 'http://**********'
} else if (process.env.NODE_ENV === '"production"') {
  BASE_URL = 'http://**********'
}

const api = {
  goods: {
    //标的列表
    queryPageLotInfo(params) {
      return http('post', BASE_URL + '/lotInfo/queryPageLotInfo', params)
    }
  },
  org: {
    query(id) {
      return http('get', `${BASE_URL}/org/query/${id}`)
    }
  }
}
export default api
```

## 状态码

新建config.js

```javascript
const config = {
  RET_CODE: {
    SUCCESS_CODE: 1,//后台返回成功的状态码
    ERROR_CODE: 0,//后台返回失败的状态码
  },
  //标的状态
  LOT_STATUS: {
      PREPARE: '未开始',
      PUBLICITY: '公示中',
      DURING: '进行中'
  }
}

export default config

```

## app.js挂载到this 

```javascript
import Taro, { Component } from '@tarojs/taro'

import api from './service/api.js'//api接口
import http from './service/http.js'//request请求
import config from './service/config.js'
global.http = http//全局注入request请求
global.api = api//全局注入api接口
global.config = config // 公用配置
```

## 使用http请求

```javascript
  componentDidShow() {
    console.log(global.api)
    //获取数据列表
    this.getList()
  }
  //获取列表数据
  getList() {
    let params = {
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize
    }
    console.log(params)
    global.api.goods.queryPageLotInfo(params).then((res) => {
      console.log(res.data)
      this.setState({
        dataList: res.data.rows
      })
    }).catch((err) => {
      console.log(err)
    })
  }
```