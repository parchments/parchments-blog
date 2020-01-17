# 图表组件 v-charts

介绍：在使用 echarts 生成图表时，经常需要做繁琐的数据类型转化、修改复杂的配置项，v-charts 的出现正是为了解决这个痛点。基于 Vue2.0 和 echarts 封装的 v-charts 图表组件，只需要统一提供一种对前后端都友好的数据格式设置简单的配置项，便可轻松生成常见的图表。

[官网地址](https://v-charts.js.org/#/)

[Github地址](https://github.com/ElemeFE/v-charts)

以指令形式使用使用步骤

1、安装 npm i v-charts echarts -S  
2、引入

```html
//组件
import VeLine from "v-charts/lib/line.common";
import "v-charts/lib/style.css";

<script>
    new Vue({
      el: '#app',
      data: function () {
      return {
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
      }
     },
      components: { VeLine }
    })
</script>
```

3、组件使用

```html
//组件使用
<ve-line :data="chartData"></ve-line>
```

4、效果预览

![](https://oscimg.oschina.net/oscnet/up-0375c9998fa56cc7a074377bf763c613e5b.png)  

5、其他使用方法可参考[官网](https://v-charts.js.org/#/)