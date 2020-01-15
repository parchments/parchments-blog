# 打印功能 vue-print-nb

[npm地址](https://www.npmjs.com/package/vue-print-nb)

使用步骤

1、npm install vue-print-nb --save

2、引入

```javascript
//Vue main.js

import Print from 'vue-print-nb'
Vue.use(Print);
```

3、组件

```html
//组件里面的用法
<section id="printCenter">
	<div>
	  <el-row class="pad-b-30 font-weight-b">
		<el-col style="font-size: 25px; width: 1126px"
				class="text-center">
		  {{title}}
		</el-col>
	  </el-row>
	  <el-row style="width: 1126px">
		<el-col :span="12"
				class="mar-b-10">
		  <span class="font-weight-b">收货单号:</span> {{ printData.shdh }}
		</el-col>
		<el-col :span="12"
				class="mar-b-10">
		  <span class="font-weight-b">单据日期:</span> {{ printData.tradeTime }}
		</el-col>
		<el-col :span="12"
				class="mar-b-10">
		  <span class="font-weight-b">客户名称:</span> {{ printData.companyName }}
		</el-col>
		<el-col :span="12"
				class="mar-b-10">
		  <span class="font-weight-b">联系人: </span>{{ printData.fromUserName }}
		</el-col>
		<el-col :span="12"
				class="mar-b-10">
		  <span class="font-weight-b">联系电话:</span> {{ printData.mobile }}
		</el-col>
		<el-col :span="12"
				class="mar-b-10">
		  <span class="font-weight-b">联系地址:</span> {{ printData.companyAddr }}
		</el-col>
	  </el-row>
	  <el-row class="pad-t-20 pad-b-20">
		<table>
		  <thead>
			<th>商品名称</th>
			<th>规格</th>
			<th>序号</th>
			<th>重量(公斤)</th>
			<th>备注</th>
		  </thead>
		  <tbody>
			<tr v-for="(item,index) in printData.list"
				:key="index"
				style="border: 1px solid #aaa">
			  <td>{{ index+1 }}</td>
			  <td>{{ item.productName }}</td>
			  <td>{{ item.productSpec }}</td>
			  <td>{{ item.weight }}</td>
			  <td>{{ item.remark }}</td>
			</tr>
		  </tbody>
		</table>
	  </el-row>
	</div>
  </section>
  <section slot="footer"
		   class="dialog-footer">
	<el-button @click="cancel">取消打印</el-button>
	<el-button type="primary"
			   @click="confirm"
			   v-print="'#printCenter'">确定打印</el-button>
  </section>
```

4、效果预览

![](https://oscimg.oschina.net/oscnet/up-20f9f372b6d8596e4bb98480476b54a2f0b.png)

![](https://oscimg.oschina.net/oscnet/up-8c9d52c7a4cae7567d9c57f416a5ffb2214.png)

5、其他配置请前往[npm地址](https://www.npmjs.com/package/vue-print-nb) 查看