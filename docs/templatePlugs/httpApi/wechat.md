# wechat  http封装

![](https://oscimg.oschina.net/oscnet/up-3e7c1c4f10f49ec9b8affea53ec58622364.png)

根目录下新建config文件夹，创建http.js

## http.js

```javascript
/**
 * 封装http 请求方法
 */
import config from './config.js';
const http = (params) => {
  //返回promise 对象
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.BASEURL + params.url,//服务器url+参数中携带的接口具体地址
      data: params.data,//请求参数
      header: params.header || {
        'token': wx.getStorageSync('token'),
        'systype': 'wechat',
        'content-type': 'application/json'//设置后端需要的常用的格式，特殊情况可单独设置
      },
      method: params.method || 'POST',//默认为GET，可设置POST
      dataType: params.dataType,//返回的数据格式,默认为JSON，特殊格式可传参
      responseType: params.responseType,//响应的数据类型
      success: function (res) {//接口访问正常返回数据
        let status = res.statusCode;
        if (status == 200) {
          if (res.data.code === 1) {//操作成功返回数据
            resolve(res.data)
          } else {
            wx.showToast({
              icon: "none",
              title: res.data.message
            })
            resolve(res.data)
            console.log(res.data)
          }
        } else if (status === 401){
          //   wx.showToast({
          //     title: '登陆过期，请登录',
          //     icon: 'none',
          //     duration: 3000
          // })
          console.log(res.data)
          resolve(res.data)
            // wx.navigateTo({
            //   url: '/pages/login/index',
            // })
        } else if (status === 500) {
            wx.showToast({
              title: '网络异常，稍后重试',
              icon: 'none',
              duration: 2000
          })
          resolve(res)
          } else {
          //操作不成功返回数据
          console.log(res.data.code)
        }
      },
      fail: function (e) {
        console.log(e)
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '请求超时，请稍后重试！',
          success: function () {
            // wx.redirectTo({
            //   url: '../scan/scan'
            // })
          }
        })
        reject(e)
      }
    })
  })
}
module.exports = http
```

## api.js

```javascript
import http from './http.js';

const api = {
  //dream
  //列表
  getData(params) {
    return http({
      url: '/dream/getData',
      data: params,
      method: "post"
    })
  },
  //微信登录
  wechatLogin(params) {
    return http({
      url: '/wechatLogin',
      data: params,
      method: 'get'
    })
  }
}
module.exports = api
```

## 状态码

新建config.js

```javascript
//公共配置
/*
  * 后台返回状态码
  * RET_CODE: 0代表失败  1代表成功
*/
const RETCODE = {
  SUCCESS_CODE: 1,
  ERROR_CODE: 0
}

//服务器根域名
const BASEURL = 'https://*********/api';

module.exports = {
  BASEURL,RETCODE
}
```

## app.js挂载到this 

```javascript
//app.js
let config = require('./config/config.js')
let api = require('./config/api.js')
let http = require('./config/http.js')
App({
  config: config,
  api: api,
  http: http,
  onLaunch: function () {}
})
```

## 使用http请求

```javascript

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onshow')
    //获取列表
    this.getData();
  },

  //列表
  getData() {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    let params = {
      "pageNo": that.data.pageNo,
      "pageSize": that.data.pageSize,
      "name": that.data.searchValue ? that.data.searchValue : null
    }
    app.api.getData(params).then(res => {
      if (res) {
        if (res.code === app.config.RETCODE.SUCCESS_CODE) {
          let data = res.data;
          let rows = data.rows;
          that.total = data.total;
          that.setData({
            total: data.total
          })
          if (rows.length === 0) {
            that.setData({
              nodata: true
            })
          }
          //如果没有点击了筛选条件   也就是默认
          if (this.data.pageNo === 1) {
            that.setData({
              goodsList: rows
            })
          } else {
            that.setData({
              goodsList: that.data.goodsList.concat(rows)
            })
          }
          wx.hideLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        }
      } else {
        console.log(res.data.message);
        wx.hideLoading();
      }
    }).catch(err => {
      console.log(err);
      wx.hideLoading();
    })
  }
```