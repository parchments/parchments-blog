# 图片裁剪 vue-cropper

单纯图片上传，可用element框架自带的upload上传

[Github地址](https://github.com/xyxiao001/vue-cropper)

以指令形式使用使用步骤

1、安装 npm i vue-cropper  

2、引入

```javascript
//组件内使用
import { VueCropper }  from 'vue-cropper' 
components: {
  VueCropper,
}


//main.js里面使用
import VueCropper from 'vue-cropper' 
Vue.use(VueCropper)
```

3、组件使用

```html
//组件使用
<div class="info-item">
  <div class="line">
    <div class="cropper-content">
      <div class="cropper">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixedBox="option.fixedBox"
          @realTime="realTime"
          @imgLoad="imgLoad"
        >
        </vueCropper>
      </div>
    </div>
  </div>
  <div class="mar-t-30">
    <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
    <label class="el-button el-button--default el-button--mini is-round" for="uploads">选择图片</label>
    <el-button type="default" size="mini" round @click="changeScale(1)">+</el-button>
    <el-button type="default" size="mini" round @click="changeScale(-1)">-</el-button>
    <el-button type="default" size="mini" round @click="rotateLeft">↺</el-button>
    <el-button type="default" size="mini" round @click="rotateRight">↻</el-button>
    <el-button type="default" size="mini" round @click="down('blob')">↓</el-button>
  </div>
</div>
```

```javascript
<script>
import { VueCropper } from "vue-cropper"
export default {
  name: 'entrustedRecord',
  components: {
    VueCropper
  },
  data () {
    return {
      //剪切图片上传
      crap: false,
      previews: {},
      option: {
        img: '',
        outputSize:1, //剪切后的图片质量（0.1-1）
        full: false,//输出原图比例截图 props名full
        outputType: 'png',
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 330,
        autoCropHeight: 220,
        fixedBox: true
      },
      fileName:'',  //本机文件地址
      downImg: '#',
      imgFile:''
    }
  },
  methods:{
    //放大/缩小
    changeScale(num) {
      console.log('changeScale')
      num = num || 1;
      this.$refs.cropper.changeScale(num)
    },
    //坐旋转
    rotateLeft() {
      console.log('rotateLeft')
      this.$refs.cropper.rotateLeft()
    },
    //右旋转
    rotateRight() {
      console.log('rotateRight')
      this.$refs.cropper.rotateRight();
    },
    //上传图片（点击上传按钮）  根据自己的业务需求自定义
    finish(type) {
      console.log('finish')
      let formData = new FormData()
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          let img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
          formData.append("file", data, this.fileName)
          formData.append('thumbImageFlag',true)
          this.uploadLoading = true
          this.$api.systemModule.uploadFile(formData,{contentType: false, processData: false, headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(res => {
              if(res.data.retcode === this.SUCCESS_CODE){
                let data = res.data.data
                console.log(data)
                this.imgFile = ''
                this.fileUrl = data.fileUrl  //完整路径
                this.thumbImageUrl = data.thumbImageUrl  //非完整路径
                this.$message({
                  type: 'success',
                  message: res.data.retmsg
                })
                this.dialogVisible = false
                this.uploadLoading = false
              }else{
                this.$message({
                  type: 'error',
                  message: res.data.retmsg
                })
                this.uploadLoading = false
              }
            }).catch(err => {
              console.log(err)
              this.uploadLoading = false
            })
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true
          this.modelSrc = data
        })
      }
    },
    // 实时预览函数
    realTime(data) {
      console.log('realTime')
      this.previews = data
    },
    //下载图片
    down(type) {
      console.log('down')
      var aLink = document.createElement('a')
      aLink.download = 'author-img'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          this.downImg = window.URL.createObjectURL(data)
          aLink.href = window.URL.createObjectURL(data)
          aLink.click()
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data
          aLink.href = data
          aLink.click()
        })
      }
    },
    //选择本地图片
    uploadImg(e, num) {
      console.log('uploadImg')
      //上传图片
      let file = e.target.files[0]
      this.fileName = file.name
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$message({
          type: 'error',
          message: '图片类型必须是.gif,jpeg,jpg,png,bmp中的一种'
        })
        return false
      }
      //限制图片大小
      const picSize = file.size / 1024 / 1024 < 5
      if (!picSize) {
        return this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      let reader = new FileReader()
      reader.onload =(e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        }
        else {
          data = e.target.result
        }
        if (num === 1) {
          this.option.img = data
        } else if (num === 2) {
          this.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)

    },
    imgLoad (msg) {
      console.log('imgLoad')
      console.log(msg)
    }
   }
</script>
```

```css
<style scoped>
  .cropper-content{
    overflow: hidden;
  }
  .cropper-content .cropper{
    margin: 0 auto;
    width: 460px;
    height: 260px;
  }
  .show-preview{
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    width: 330px;
    height: 220px;
    overflow: hidden;
    border:1px solid #cccccc;
    margin: 0 auto;
  }
  .cropper-content .show-preview .preview{
    overflow: hidden;
    border-radius: 50%;
    border:1px solid #cccccc;
    background: #cccccc;
    margin-left: 40px;
  }
  .cropper-content .show-preview .preview {margin-left: 0;}
</style>
```

4、效果预览

![](https://oscimg.oschina.net/oscnet/up-8a09da102a5025fdbc77aaf3e0d67657d06.png)

![](https://oscimg.oschina.net/oscnet/up-b1ffb21a83fa8023e4eebf73c0e6e582161.png)

5、其他使用方法可参考[官网](https://github.com/xyxiao001/vue-cropper)、 或者查看[博主的文章](https://www.jianshu.com/p/85a52da879bb)