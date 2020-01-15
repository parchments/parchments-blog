# 时间格式化 moment  

[Github地址](http://github.com/moment/moment)  

[官网地址](http://momentjs.cn/)  

使用步骤  

1、npm install moment  

2、引入  

```javascript
//Vue main.js or 单个vue组件

import moment from 'moment'
//定义一个全局过滤器实现日期格式化
Vue.filter('formatDate', function (input, fmtstring: any) {
	//当input为时间戳时，需转为Number类型
    // 使用momentjs这个日期格式化类库实现日期的格式化功能
    return input ? moment(input).format(fmtstring) : '';
})
```

3、注意，后台传过来的是时间戳  

```html
//组件里面的用法
//年月日时分秒
<el-table :data="tableData">
      <el-table-column label="发送时间">
        <template slot-scope="scope">
          <span>{{ scope.row.addTime | formatDate('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
</el-table>

//年月日时分
<el-table :data="tableData">
      <el-table-column label="发送时间">
        <template slot-scope="scope">
          <span>{{ scope.row.addTime | formatDate('YYYY-MM-DD HH:mm') }}</span>
        </template>
      </el-table-column>
</el-table>

//年月日
<el-table :data="tableData">
      <el-table-column label="发送时间">
        <template slot-scope="scope">
          <span>{{ scope.row.addTime | formatDate('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
</el-table>
```

4、年月日时分秒效果预览

![](https://oscimg.oschina.net/oscnet/up-19871f30e0cd95d86504ff76ec8d53b3540.png)

5、其他用法请前往[官网](http://momentjs.cn/)  查看、也可以前往博主xxt1ngt1ng[《moment.js的方法总结》](https://www.jianshu.com/p/e5b7c0606a3f)查看