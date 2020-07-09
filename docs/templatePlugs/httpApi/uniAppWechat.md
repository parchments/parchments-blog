# uniAppWechat  http封装

![](https://oscimg.oschina.net/oscnet/up-0bc4d1e3c8a8990dfabc47e0d8cfe83ddad.png)

根目录下新建common文件夹，创建request.js

## request.js

```javascript
/**
 * 封装request 请求方法
 */

let APP_BASEURL = ''  
if (process.env.NODE_ENV == 'development') {
	// 测试环境
    APP_BASEURL = 'http://://********'
} else {
	// 生产环境
    APP_BASEURL = 'https://********'
}

//注意******** 弹窗可全局配置   也可以局部（灵活提示）************
// 请求方法
function visit(request, requestType, resolve){
	//不可取消的加载框
	uni.showLoading({
		title:'请求中...',
		icon: 'loading',
		mask: true
	})
	uni.request({
		method: requestType,
		dataType:'json',
		header:{
			"token": request.token
		},
		url: request.url,
		data: request.data,
		success: function(resp){
			let data = resp.data
			resolve(data);
			uni.hideLoading()
		},
		fail: function(resp){
			uni.hideLoading()
			uni.showToast({
				title:"网络请求异常，请稍后再试！",
				icon: 'none',
				duration: 2000
			})
		}
	})  
}
// 登录添加token
function _request(url, requestType, data, resolve){
	let token = wx.getStorageSync('phSessionToken')
	visit({
		data:data,
		token: token,
		url: url
	},requestType,resolve)
}
//核心请求入口
function request(url, requestType, data){
	return new Promise((resolve, reject) => {
		_request(url, requestType, data, resolve)
	})
}
// 获取用户信息
function getUserInfo(){
	let user = wx.getStorageSync('userInfo')
	return user || {}
}

module.exports = {
  request: request,
  getUser: getUserInfo,
  APP_BASEURL: APP_BASEURL
}
```

## api.js

```javascript
import { request,APP_BASEURL } from "../request";
// 获取数据列表
export const getList = (params = {}) => {
	return request(APP_BASEURL+"/getList", 'post', params);//get  post
};
```

## 状态码

新建config.js

```javascript
const config = {
	APPID:'wx00000000',   // 小程序appid
	RET_CODE: {
		UNACTIVE_CODE: 2,//未注册的用户
		SUCCESS_CODE: 1,//后台返回成功的状态码
		ERROR_CODE: 0,//后台返回失败的状态码
	},
	//业务流程状态：-1未報價 1未审核 2审核通过 3审核未通过  4已支付 5已收样 6发送机构中 7检测中 8待收报告 9已经上传报告 10交易关闭 11申请退款 12退款中 13退款驳回 14已退款 15线下支付审核中 16支付失败
	BUSINESS_STATUS: {
		NOT_QUOTED: -1,//未报价
		NOT_APPROVED: 1,//未审核
		APPROVED: 2,//审核通过
		AUDIT_FAILED: 3,//审核未通过
		PAID: 4,//已支付
		SAMPLE_RECEIVED: 5,//已收样
		SENDING_ORGANIZATION: 6,//发送机构中
		TESTING: 7,//检测中
		REPORT_TO_BE_RECEIVED: 8,//待收报告
		REPORT_UPLOADED: 9,//已经上传报告
		TRANSACTION_CLOSE: 10,//交易关闭
		APPLY_FOR_REFUND: 11,//已申请退款
		REFUNDING: 12,//退款中
		REFUND_REJECTION: 13,//退款驳回
		REFUNDED: 14,//已退款
		OFFLINE_PAYMENT_UNDER_REVIEW: 15,//线下支付审核中
		PAYMENT_FAILURE: 16//支付失败
	}
}

export default config
```

## main.js挂载到this 

```javascript
//main.js
import Vue from 'vue'
import App from './App'
import store from './store';
import mixin from 'common/mixin'
import util from 'common/util'
import config from 'common/config/config'
Vue.config.productionTip = false

global.config = config//全局配置  用于判断后台返回状态码

App.mpType = 'app'
Vue.mixin(mixin)
Vue.prototype.$store = store
Vue.prototype.$util = util;
const app = new Vue({
	store,
    ...App
})
app.$mount()

```

## 使用http请求

```javascript
	import { gotoPayQualityApply } from '@/common/api/api.js';
	
	export default {
		methods: {
			//点击订单支付按钮   uni-app微信支付官方文档https://uniapp.dcloud.io/api/plugins/payment?id=requestpayment
			async wxPayHandle(){
				//先调取后台接口获取支付、认证、签名等信息
				let params = {
					...
				}
				const res = await gotoPayQualityApply(params)
				if (res.retcode === global.config.RET_CODE.SUCCESS_CODE) {
					this.upWxPay(res);//拉起微信支付
				}else{
					uni.showToast({
						title: res.retmsg,
						icon: 'none'
					})
					return false;
				}
			},
			//拉起微信支付
			upWxPay(param){
				let that = this;
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: param.data.timeStamp,//记住，这边的timeStamp一定要是字符串类型的，不然会报错
					nonceStr: param.data.nonceStr,
					package: param.data.package,
					signType: 'MD5',
					paySign: param.data.paySign,
					success: function (res) {
						uni.showToast({
							title: '支付成功',
							icon: 'none',
							duration: 3000,
						})
						that.getData();
						that.submitLoading = false;
						that.submitLoadingText = '';
					},
					fail: function (err) {
						uni.showToast({
							title: '支付失败',
							icon: 'none',
							duration: 3000,
						})
					}
				});
			}
		}
	}
```