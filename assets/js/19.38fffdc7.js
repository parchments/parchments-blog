(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{359:function(t,a,e){"use strict";e.r(a);var s=e(42),n=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"vue2-0-运行机制全局概览"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue2-0-运行机制全局概览"}},[t._v("#")]),t._v(" Vue2.0 运行机制全局概览")]),t._v(" "),e("p",[t._v("声明：本Vue进阶模快为掘金小册付费小册，不允许任何商业用途的转载，本人只做学习参考使用，不做任何商业用途。"),e("a",{attrs:{href:"https://juejin.im/book/5a36661851882538e2259c0f",target:"_blank",rel:"noopener noreferrer"}},[t._v("原文链接"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"全局概览"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#全局概览"}},[t._v("#")]),t._v(" 全局概览")]),t._v(" "),e("p",[t._v("这一节笔者将为大家介绍一下 Vue.js 内部的整个流程，希望能让大家对全局有一个整体的印象，然后我们再来逐个模块进行讲解。从来没有了解过 Vue.js 实现的同学可能会对一些内容感到疑惑，这是很正常的，这一节的目的主要是为了让大家对整个流程有一个大概的认识，算是一个概览预备的过程，当把整本小册认真读完以后，再来阅读这一节，相信会有收获的。")]),t._v(" "),e("p",[t._v("首先我们来看一下笔者画的内部流程图。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://oscimg.oschina.net/oscnet/up-0dab342a63a198d928c0469ed4a6fe2750c.png",alt:""}}),e("br"),t._v("\n大家第一次看到这个图一定是一头雾水的，没有关系，我们来逐个讲一下这些模块的作用以及调用关系。相信讲完之后大家对Vue.js内部运行机制会有一个大概的认识。")]),t._v(" "),e("h2",{attrs:{id:"初始化及挂载"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#初始化及挂载"}},[t._v("#")]),t._v(" 初始化及挂载")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://oscimg.oschina.net/oscnet/up-ed0a821e296d7ccd904497218fee6e4fb6d.png",alt:""}})]),t._v(" "),e("p",[t._v("在 "),e("code",[t._v("new Vue()")]),t._v(" 之后。 Vue 会调用 "),e("code",[t._v("_init")]),t._v(" 函数进行初始化，也就是这里的 "),e("code",[t._v("init")]),t._v(" 过程，它会初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等。其中最重要的是通过 "),e("code",[t._v("Object.defineProperty")]),t._v(" 设置 "),e("code",[t._v("setter")]),t._v(" 与 "),e("code",[t._v("getter")]),t._v(" 函数，用来实现「"),e("strong",[t._v("响应式")]),t._v("」以及「"),e("strong",[t._v("依赖收集")]),t._v("」，后面会详细讲到，这里只要有一个印象即可。")]),t._v(" "),e("p",[t._v("初始化之后调用 "),e("code",[t._v("$mount")]),t._v(" 会挂载组件，如果是运行时编译，即不存在 render function 但是存在 template 的情况，需要进行「"),e("strong",[t._v("编译")]),t._v("」步骤。")]),t._v(" "),e("h2",{attrs:{id:"编译"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#编译"}},[t._v("#")]),t._v(" 编译")]),t._v(" "),e("p",[t._v("compile编译可以分成 "),e("code",[t._v("parse")]),t._v("、"),e("code",[t._v("optimize")]),t._v(" 与 "),e("code",[t._v("generate")]),t._v(" 三个阶段，最终需要得到 render function。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://oscimg.oschina.net/oscnet/up-e9a81dd1a1a706a02c75a6e90a27f589ddf.png",alt:""}})]),t._v(" "),e("h3",{attrs:{id:"parse"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#parse"}},[t._v("#")]),t._v(" parse")]),t._v(" "),e("p",[e("code",[t._v("parse")]),t._v(" 会用正则等方式解析 template 模板中的指令、class、style等数据，形成AST。")]),t._v(" "),e("h3",{attrs:{id:"optimize"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#optimize"}},[t._v("#")]),t._v(" optimize")]),t._v(" "),e("p",[e("code",[t._v("optimize")]),t._v(" 的主要作用是标记 static 静态节点，这是 Vue 在编译过程中的一处优化，后面当 "),e("code",[t._v("update")]),t._v(" 更新界面时，会有一个 "),e("code",[t._v("patch")]),t._v(" 的过程， diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 "),e("code",[t._v("patch")]),t._v(" 的性能。")]),t._v(" "),e("h3",{attrs:{id:"generate"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#generate"}},[t._v("#")]),t._v(" generate")]),t._v(" "),e("p",[e("code",[t._v("generate")]),t._v(" 是将 AST 转化成 render function 字符串的过程，得到结果是 render 的字符串以及 staticRenderFns 字符串。")]),t._v(" "),e("p",[t._v("在经历过 "),e("code",[t._v("parse")]),t._v("、"),e("code",[t._v("optimize")]),t._v(" 与 "),e("code",[t._v("generate")]),t._v(" 这三个阶段以后，组件中就会存在渲染 VNode 所需的 render function 了。")]),t._v(" "),e("h2",{attrs:{id:"响应式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#响应式"}},[t._v("#")]),t._v(" 响应式")]),t._v(" "),e("p",[t._v("接下来也就是 Vue.js 响应式核心部分。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://oscimg.oschina.net/oscnet/up-7da91406ed38d8633a7b968bbec9ef6f5e2.png",alt:""}})]),t._v(" "),e("p",[t._v("这里的 "),e("code",[t._v("getter")]),t._v(" 跟 "),e("code",[t._v("setter")]),t._v(" 已经在之前介绍过了，在 "),e("code",[t._v("init")]),t._v(" 的时候通过 "),e("code",[t._v("Object.defineProperty")]),t._v(" 进行了绑定，它使得当被设置的对象被读取的时候会执行 "),e("code",[t._v("getter")]),t._v(" 函数，而在当被赋值的时候会执行 "),e("code",[t._v("setter")]),t._v(" 函数。")]),t._v(" "),e("p",[t._v("当 render function 被渲染的时候，因为会读取所需对象的值，所以会触发 "),e("code",[t._v("getter")]),t._v(" 函数进行「"),e("strong",[t._v("依赖收集")]),t._v("」，「"),e("strong",[t._v("依赖收集")]),t._v("」的目的是将观察者 Watcher 对象存放到当前闭包中的订阅者 Dep 的 subs 中。形成如下所示的这样一个关系。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://oscimg.oschina.net/oscnet/up-f9ce388f039a8f92815a561bbea76774e1b.png",alt:""}})]),t._v(" "),e("p",[t._v("在修改对象的值的时候，会触发对应的 "),e("code",[t._v("setter")]),t._v("， "),e("code",[t._v("setter")]),t._v(" 通知之前「"),e("strong",[t._v("依赖收集")]),t._v("」得到的 Dep 中的每一个 Watcher，告诉它们自己的值改变了，需要重新渲染视图。这时候这些 Watcher 就会开始调用 "),e("code",[t._v("update")]),t._v(" 来更新视图，当然这中间还有一个 "),e("code",[t._v("patch")]),t._v(" 的过程以及使用队列来异步更新的策略，这个我们后面再讲。")]),t._v(" "),e("h2",{attrs:{id:"virtual-dom"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#virtual-dom"}},[t._v("#")]),t._v(" Virtual DOM")]),t._v(" "),e("p",[t._v("我们知道，render function 会被转化成 VNode 节点。Virtual DOM 其实就是一棵以 JavaScript 对象（ VNode 节点）作为基础的树，用对象属性来描述节点，实际上它只是一层对真实 DOM 的抽象。最终可以通过一系列操作使这棵树映射到真实环境上。由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。")]),t._v(" "),e("p",[t._v("比如说下面这样一个例子：")]),t._v(" "),e("div",{staticClass:"language-javascript line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    tag"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'div'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("                 "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*说明这是一个div标签*/")]),t._v("\n    children"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("                 "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*存放该标签的子节点*/")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            tag"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("           "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*说明这是一个a标签*/")]),t._v("\n            text"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'click me'")]),t._v("    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*标签的内容*/")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br"),e("span",{staticClass:"line-number"},[t._v("9")]),e("br")])]),e("p",[t._v("渲染后可以得到")]),t._v(" "),e("div",{staticClass:"language-html line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-html"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("a")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("click me"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("a")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br")])]),e("p",[t._v("这只是一个简单的例子，实际上的节点有更多的属性来标志节点，比如 isStatic （代表是否为静态节点）、 isComment （代表是否为注释节点）等。")]),t._v(" "),e("h2",{attrs:{id:"更新视图"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#更新视图"}},[t._v("#")]),t._v(" 更新视图")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://oscimg.oschina.net/oscnet/up-3c57c225013f12fbd9e8641197ea9453cb3.png",alt:""}})]),t._v(" "),e("p",[t._v("前面我们说到，在修改一个对象值的时候，会通过 "),e("code",[t._v("setter -> Watcher -> update")]),t._v(" 的流程来修改对应的视图，那么最终是如何更新视图的呢？")]),t._v(" "),e("p",[t._v("当数据变化后，执行 render function 就可以得到一个新的 VNode 节点，我们如果想要得到新的视图，最简单粗暴的方法就是直接解析这个新的 VNode 节点，然后用 "),e("code",[t._v("innerHTML")]),t._v(" 直接全部渲染到真实 DOM 中。但是其实我们只对其中的一小块内容进行了修改，这样做似乎有些「"),e("strong",[t._v("浪费")]),t._v("」。")]),t._v(" "),e("p",[t._v("那么我们为什么不能只修改那些「改变了的地方」呢？这个时候就要介绍我们的「"),e("strong",[e("code",[t._v("patch")])]),t._v("」了。我们会将新的 VNode 与旧的 VNode 一起传入 "),e("code",[t._v("patch")]),t._v(" 进行比较，经过 diff 算法得出它们的「"),e("strong",[t._v("差异")]),t._v("」。最后我们只需要将这些「"),e("strong",[t._v("差异")]),t._v("」的对应 DOM 进行修改即可。")]),t._v(" "),e("h2",{attrs:{id:"再看全局"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#再看全局"}},[t._v("#")]),t._v(" 再看全局")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://oscimg.oschina.net/oscnet/up-1d8b37aef0cf7b98f91cef453b87e6f1f7b.png",alt:""}})]),t._v(" "),e("p",[t._v("回过头再来看看这张图，是不是大脑中已经有一个大概的脉络了呢？")]),t._v(" "),e("p",[e("strong",[t._v("那么，让我们继续学习每一个模块吧!")])])])}),[],!1,null,null,null);a.default=n.exports}}]);