# 复制功能 clipboard

[Github地址](https://github.com/zenorocha/clipboard.js)

[npm地址](https://www.npmjs.com/package/clipboard)

以指令形式使用使用步骤

1、安装 npm install clipboard --save

2、引入

```javascript
//单个组件或者main.js引入
import Clipboard from 'clipboard'
```

3、使用

```html
<button class="clipboardBtn" data-clipboard-text="复制" @click="copy">复制</button>
```

```javascript
methods:{
	copy() {
		let clipboard = new Clipboard('.clipboardBtn')
		clipboard.on('success', e => {
			console.log('复制成功')
			// 释放内存
			clipboard.destroy()
		})
		clipboard.on('error', e => {
			// 不支持复制
			console.log('该浏览器不支持自动复制')
			// 释放内存
			clipboard.destroy()
		})
	}
}
```

4、注意点：移动端按钮建议使用input或者button，否则复制不成功

5、其他使用方法可参考[Github](https://github.com/zenorocha/clipboard.js)