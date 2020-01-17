# 富文本 tinymce

[Github地址](https://github.com/tinymce/tinymce)

[官网地址](https://www.tiny.cloud/docs/api/tinymce/root_tinymce/)  

备注：版本tinymce5.0，如果安装和下载后无法显示富文本可能是版本问题  

个人用法总结：比起百度富文本，tinymce更加轻量，上传图片接口无需再让后台匹配百度富文本所需要的特定格式，也不需要他们配置百度富文本的相应配置。

1、安装依赖：

npm install @tinymce/tinymce-vue

npm install tinymce

安装之后，在 node_modules 中找到 tinymce目录，然后将 skins 目录拷贝到 **public**目录下

在官网下载语言包选择中文包 [https://www.tiny.cloud/get-tiny/language-packages/](https://www.tiny.cloud/get-tiny/language-packages/)

下载后放进tinymce中

![](https://oscimg.oschina.net/oscnet/up-8ed4bb6b734c1527543bcfc8ff006f30f56.png)

2、封装编辑器

```html
<template>
  <div>
    <editor v-model="editorContent.procurementSpecification" :init="init"></editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver'
import Editor from '@tinymce/tinymce-vue'
//这下面是tinymce的插件  看个人需要
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'

export default {
  components: {
    Editor
  },
  props: {
    //传入一个value，使组件支持v-model绑定
    editorContent: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      //初始化配置
      init: {
        language_url: '/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        height: 300,
        width: 700,
        plugins: 'link lists image code table wordcount',
        toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false,
        menubar: false,
        //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        }
      }
    }
  },
  mounted () {
    tinymce.init({})
  }
}
</script>
```

3、使用组件

```ts
<tinymce-editor :editorContent="editorContent"></tinymce-editor>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TinymceEditor from "../../../components/TinymceEditor.vue";
@Component({
  components: {
    TinymceEditor: TinymceEditor
  }
})
export default class AddPurchase extends Vue {
  //data
  private editorContent: any = '';
}
```

打印内容：

![](https://oscimg.oschina.net/oscnet/up-c4090c68694071ba8fe3fcc3c940ac2f16e.png)

参考地址：

[在vue项目中使用tinymce编辑器（tinymce 5.0 - vue-cli3.x）](https://blog.csdn.net/weixin_34101784/article/details/88567761)

vue2.x可以看下方的链接

[在 Vue 项目中引入 tinymce 富文本编辑器（**Tinymce 4.x vue-cli2.x**）](https://www.cnblogs.com/wisewrong/p/8985471.html)

[vue引用tinymce出现Uncaught SyntaxError: Unexpected token 错误](https://blog.csdn.net/weixin_44019248/article/details/88528974)