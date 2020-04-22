# vueElement   http封装

## http.js

```javascript
/**
 * 封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import router from '../router/index'
import { Message , Loading } from 'element-ui'

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
let toLogin = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  router.push({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}


// 创建axios实例
let instance = axios.create({
	timeout: 30000//请求超时时间
})

//判断是电脑还是手机
function isPc() {
	let userAgentInfo = navigator.userAgent
	let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
	let flag = 'pc'
	for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = 'mobile'
      break
    }
  }
	return 'pc'
}
let sysType = isPc()

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    config => {
      //加载动画
      // 登录流程控制中，根据本地是否存在token判断用户的登录情况
      // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
      // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
      // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
      //设置统一请求头

      //用户信息
      let userInfo = ''
      if(localStorage.getItem('userInfo')){
        userInfo = localStorage.userInfo
      }else{
        userInfo = ''
      }
			//token
      let sessionToken = ''
      if(localStorage.getItem('token')){
        sessionToken = localStorage.token
      }else{
        sessionToken = ''
      }
      //设置请求头
      config.headers = {
        'Content-Type': 'application/json',
        'sys-type': sysType,//访问来源
        'sessionToken': sessionToken
      }
      return config
    },
    error => Promise.error(error)
)

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
let errorHandle = (status, other) => {
  //状态码判断
  switch (status) {
    //400: 客户端请求的语法错误，服务器无法理解
    case 400:
      console.log('400客户端请求的语法错误，服务器无法理解')
      break
    case 401:
      Message({message: '登录过期，请重新登录', type: 'error'})
      setTimeout(() => {
        toLogin()//跳转到登录
      }, 3000)
      break
    //404请求不存在
    case 404:
      Message({message: '请求的资源不存在', type: 'error'})
      //router.push('/manage/404')
      break
    case 408:
      Message({message: '网络延时，请稍后', type: 'error'})
      setTimeout(() => {
        toLogin()//跳转到登录
      }, 30000)
      break
    //500
    case 500:
      Message({message: '网络异常，请重新登录', type: 'error'})
      setTimeout(() => {
        toLogin()//跳转到登录
      }, 30000)
      break
    default:
      console.log(other)
  }
}

//响应拦截器
instance.interceptors.response.use(
    //请求成功
    res => {
      if(res.status === 200){
        //Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象。
        return Promise.resolve(res)
      }else{
        console.log("响应拦截器失败")
        //Promise.reject(reason)方法返回一个带有拒绝原因reason参数的Promise对象。
        return Promise.reject(res)
      }
    },
    //请求失败
    error => {
      //return Promise.reject(error);
      const { response } = error
      if (response) {
        //请求已发出，但是不在2xx的范围    ------错误处理、token过期等
        errorHandle(response.status, response.data.message)
        return Promise.reject(response)
      } else {
        Message({
          message: '网络异常，即将前往登录页',
          type: 'error'
        })
        setTimeout(() => {
          //跳转到登录
          toLogin()
        }, 5000)
        // 处理断网的情况
        // eg:请求超时或断网时，更新state的network状态
        // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
        // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      }
    }
);

export default instance
```

## api.js

```javascript
/**
 * 所有模块接口列表
 */
import BASE_URL from '../../config/env'
import axios from '../request/http' // 导入http中创建的axios实例

//默认请求地址
axios.defaults.baseURL = BASE_URL

//系统模块
const systemModule = {
  //登陆
  login(params) {
    return axios.post('login', params)
  }
}
//会员管理
const memberManage = {
  //获取列表、查询
  getList(params) {
    return axios.post('applyAuditList', params)
  },
  //详情
  show(id) {
    return axios.get(`applyAuditList/${id}`)
  }
}
export default {
  memberManage,
  systemModule
}
```

## 状态码

新建config.js

```javascript
'use strict'
let config = {
	/*
	 * 后台返回状态码
	 * RET_CODE: 0代表失败  1代表成功
	 */
	RET_CODE: {
		SUCCESS_CODE: 1,//后台返回成功的状态码
		ERROR_CODE: 0,//后台返回失败的状态码
	}
}
export default config
```

## main.js挂载到this 

```javascript
import 'babel-polyfill' //ie空白
import Vue from 'vue'
import App from './App'
import router from './router' //导入路由
import ElementUI from 'element-ui' //导入ele-ui
import Api from './api/api' //导入api接口
import Axios from './request/http' //导入axios请求
import Config from '../config/config' //后台返回状态码

//使用ElementUI
Vue.use(ElementUI);

//在vue上挂载api
Vue.prototype.$api = Api; //在vue上挂载api
Vue.prototype.$axios = Axios;
Vue.prototype.$config = Config; //配置信息


//设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: {
        App
    },
    template: '<App/>'
})
```

## 使用http请求

```javascript
//获取表格数据
    getList () {
      //列表参数
      let params = {
        pageNo: this.paginationParams.pageNo,//页码
        pageSize: this.paginationParams.pageSize//每页条数
      }
      //用封装好的函数请求
      this.successList(params)
    },
    //封装初始化获取列表和搜索  共用
    successList (params) {
      this.loading = true//loading
      //发送请求
      this.$api.memberManage.getList(params)
        .then(res => {
          let data = res.data
          if (res.data.retcode === this.$config.RET_CODE.SUCCESS_CODE) {
            this.loading = false
            if (data.rows.length > 0) {
              this.tableData = data.rows//存储到tableData
              this.paginationParams.pageSize = data.pageSize//每页的数量
              this.paginationParams.size = data.size//当前页的数量
              this.paginationParams.total = data.total//总条数
              this.paginationParams.pages = data.pages//总页码数
            } else {
              this.tableData = []
              this.paginationParams.total = 0//总条数
            }
          } else {
            this.$message({
              type: 'error',
              message: res.data.retmsg
            })
          }
        }).catch(err => {
          console.log(err)
        })
    }
```