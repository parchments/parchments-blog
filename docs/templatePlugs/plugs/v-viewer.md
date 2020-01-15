# 图片预览 v-viewer

[官网地址](https://mirari.cc/2017/08/27/Vue%E5%9B%BE%E7%89%87%E6%B5%8F%E8%A7%88%E7%BB%84%E4%BB%B6v-viewer%EF%BC%8C%E6%94%AF%E6%8C%81%E6%97%8B%E8%BD%AC%E3%80%81%E7%BC%A9%E6%94%BE%E3%80%81%E7%BF%BB%E8%BD%AC%E7%AD%89%E6%93%8D%E4%BD%9C/)

[Github地址](https://github.com/mirari/v-viewer)

以指令形式使用使用步骤

1、安装 npm install v-viewer  
2、main.js引入

```javascript
//main.js
import Viewer from 'v-viewer' //导入图片预览
//引入Viewer基础样式
import 'viewerjs/dist/viewer.css'
//使用Viewer
Vue.use(Viewer);
```

3、组件使用

```html
//组件使用
<template>
  <el-table-column prop="imgPic" label="样品图">
        <template slot-scope="scope">
          <span v-viewer> 
              <img :src="scope.row.imgPic" alt="样品图" title="查看样品图" />
            </span>
          </span>
        </template>
  </el-table-column>
</template>
```

4、效果预览

![](https://oscimg.oschina.net/oscnet/up-08c87052df22da5bcd14f0b86ddcd96aa4a.png)

5、其他使用方法可参考[官网](https://mirari.cc/2017/08/27/Vue%E5%9B%BE%E7%89%87%E6%B5%8F%E8%A7%88%E7%BB%84%E4%BB%B6v-viewer%EF%BC%8C%E6%94%AF%E6%8C%81%E6%97%8B%E8%BD%AC%E3%80%81%E7%BC%A9%E6%94%BE%E3%80%81%E7%BF%BB%E8%BD%AC%E7%AD%89%E6%93%8D%E4%BD%9C/)