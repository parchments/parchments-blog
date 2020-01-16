# 粒子特效 vue-particles

[官网地址](https://vue-particles.netlify.com/)

[Github地址](https://github.com/creotip/vue-particles)

以指令形式使用使用步骤

1、安装 npm install vue-particles --save-dev  
2、main.js引入

```javascript
//main.js  全局注册
import VueParticles from 'vue-particles'
Vue.use(VueParticles)


```

3、组件使用

```html
//组件使用
<vue-particles
	color="#fff"
	:particleOpacity="0.7"
	:particlesNumber="60"
	shapeType="circle"
	:particleSize="4"
	linesColor="#fff"
	:linesWidth="1"
	:lineLinked="true"
	:lineOpacity="0.4"
	:linesDistance="150"
	:moveSpeed="2"
	:hoverEffect="true"
	hoverMode="grab"
	:clickEffect="true"
	clickMode="push"
	class="bg-canvas">
</vue-particles>
```

4、效果预览  

![](https://oscimg.oschina.net/oscnet/up-b4b34b8e908321a935e948ead0ca16fac07.png)  

5、其他方法可参考[官网](https://vue-particles.netlify.com)