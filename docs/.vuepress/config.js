//public中文件引用  /img/... 不需要/public
//更新本配置必须重启才生效
//目录结构必须是
// .
// ├── docs
// │   ├── .vuepress (可选的)
// │   │   ├── components (可选的)
// │   │   ├── theme (可选的)
// │   │   │   └── Layout.vue
// │   │   ├── public (可选的)
// │   │   ├── styles (可选的)
// │   │   │   ├── index.styl
// │   │   │   └── palette.styl
// │   │   ├── templates (可选的, 谨慎配置)
// │   │   │   ├── dev.html
// │   │   │   └── ssr.html
// │   │   ├── config.js (可选的)
// │   │   └── enhanceApp.js (可选的)
// │   │ 
// │   ├── README.md
// │   ├── guide
// │   │   └── README.md
// │   └── config.md
// │ 
// └── package.json
// 
// 
module.exports = {
  title: '羊皮卷',
  description: null,
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/parchments-blog/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
		logo: '/img/kai.jpg',
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
		displayAllHeaders: true, // 默认值：false
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    nav: [
      // { text: '面试题精选', link: '/guide/' },//指的是根目录的md文件 也就是 README.md 里面的内容
      // { text: '插件汇总', link: '/guide/' },
      // { text: '前端算法', link: '/guide/' },
      { text: '工作心得', link: '/guide/' },
      { text: '个人简历', link: '/resume/' },
      {
        text: '开源',
        ariaLabel: '前后分离',
        items: [
          { text: 'money2uppercase', link: 'https://www.npmjs.com/package/money2uppercase' },
          { text: 'vue-preview-editor', link: 'https://www.npmjs.com/package/vue-preview-editor' },
					{ text: 'GitHub', link: 'https://github.com/parchments' }
        ]
      }
    ],
	
	// 	sidebar: {
	// 		'/foo/': [
	// 		'',     /* /foo/ */
	// 		'one',  /* /foo/one.html */
	// 		'two'   /* /foo/two.html */
	// 	  ],
	
	// 	  '/bar/': [
	// 		'',      /* /bar/ */
	// 		'three', /* /bar/three.html */
	// 		'four'   /* /bar/four.html */
	// 	  ],
	
	// 	  // fallback
	// 	  '/': [
	// 		'',        /* / */
	// 		'contact', /* /contact.html */
	// 		'about'    /* /about.html */
	// 	  ]
	// 	},
	sidebar: [
      {
        title: 'guide',   // 必要的
        path: '/guide/',      // 可选的, 应该是一个绝对路径
        children: [
					{
						title: 't1',
						path: '/guide/t1/',
					},
					{
						title: 't2',
						path: '/guide/t2/',
					}
					// '/accumulate/test', 以docs为根目录来查找文件 
					// 上面地址查找的是：docs>accumulate>JS>test.md 文件
					// 自动加.md 每个子选项的标题 是该md文件中的第一个h1/h2/h3标题
        ]
      },
		{
			title: '个人简历',
			path: '/resume/'
		}
		]
	},
	search: true,
	searchMaxSuggestions: 10,
	// 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
	repo: 'vuejs/vuepress',
	// 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
	// "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
	repoLabel: '查看源码',

	// 以下为可选的编辑链接选项

	// 假如你的文档仓库和项目本身不在一个仓库：
	docsRepo: 'vuejs/vuepress',
	// 假如文档不是放在仓库的根目录下：
	docsDir: 'docs',
	// 假如文档放在一个特定的分支下：
	docsBranch: 'master',
	// 默认是 false, 设置为 true 来启用
	editLinks: true,
	// 默认为 "Edit this page"
	editLinkText: '帮助我们改善此页面！'
}
