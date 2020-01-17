# 图片懒加载 vue-lazyload

[Github地址](https://github.com/hilongjw/vue-lazyload)

[npm地址](https://www.npmjs.com/package/vue-lazyload)

[案例](http://hilongjw.github.io/vue-lazyload/)

以指令形式使用使用步骤

1、安装 npm install vue-lazyload   --save

2、引入

```javascript
//单个组件或者main.js引入
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

//配置loading图片 以及加载失败的图片
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../error.png',
  loading: '../loading.gif',
  attempt: 1
})
```

3、组件使用

```html
<template>
    <div id="lazyload">
        <!-- img中使用图片懒加载  注意： v-lazy代替v-bind:src -->
        <ul class="imgUl">
            <li v-for="(item,index) in imgList"> 
                <img v-lazy="item" alt=""> 
            </li>
        </ul>
        <!-- 背景图中使用图片懒加载  注意： v-lazy:background-image="" -->
        <ul class="imgBg">
            <li v-for="(item,index) in imgList" v-lazy:background-image="item"></li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            imgList:[
                './assets/images/1.jpg',
                './assets/images/2.jpg',
                './assets/images/3.jpg',
                './assets/images/4.jpg',
                './assets/images/5.jpg',
                './assets/images/6.jpg'
            ]
        }
    }
}
</script>

//样式自定义
<style lang="scss" scoped>
    #lazyload{
        background-color: #fcc;
        .imgUl{
            background-color: #fcc;
        }
        .imgBg{
            li{
                width: 50%;
                height: 50%;  
                margin-bottom: 10px;
                background-repeat: no-repeat;       //注意图片大小，否则会显示不全
                background-size: cover;
            }
        }
    }
</style>
```

4、注意点：

img标签中使用懒加载：v-lazy 代替 v-bind:src

背景图片中使用懒加载：v-lazy:background-image = ""  => 注意图片和盒子大小问题，否则显示可能有问题

使用时最好给一个 key 属性，即：<img v-lazy="图片地址" :key="图片地址">

其中:key=""  必须要加，否则就会出现，页面刷新，其他内容都刷新了，但是只有图片不刷新的情况 。因为key可能相同，所以页面不会更新！！！

Vue官网解释：[超链接](https://cn.vuejs.org/v2/api/#key)

![](https://img-blog.csdnimg.cn/20190306154008120.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhbG8xNDE2,size_16,color_FFFFFF,t_70)

5、其他使用方法可参考[Github](https://github.com/xyxiao001/vue-cropper)