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
    title: 'parchments',
    description: null,
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: 'https://oscimg.oschina.net/oscnet/up-ed8164885cc17a1f2732eab905cdb1d87c8.gif' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/parchments-blog/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        logo: 'https://oscimg.oschina.net/oscnet/up-ed8164885cc17a1f2732eab905cdb1d87c8.gif',
        sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        displayAllHeaders: true, // 默认值：false
        lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
        nav: [
            {
                text: '模板总结', link: '/templatePlugs/'
                // , items: [
                //     // { text: '/', link: '/templatePlugs/' },
                //     { text: '基础模板', link: '/templatePlugs/test/baseTemplate/' },
                //     { text: '基础模板', link: '/templatePlugs/test/aaa/' },
                //     { text: '常用插件', link: '/templatePlugs/basePlugs/' }
                // ]
            },
            {
                text: '面试经典', link: '/interview/'
                // , items: [
                //     // { text: '/', link: '/interview/' },
                //     { text: '面试技巧', link: '/interview/interviewSkills' },
                //     { text: '面试题', link: '/interview/interviewQuestions' },
                //     { text: '算法题', link: '/interview/algorithm' }
                // ]
            },
            {
                text: '前端进阶', link: '/advanced/'
                // , items: [
                //     { text: 'Js基础', link: '/advanced/js' },
                //     { text: 'Vue原理', link: '/advanced/vue' }
                // ]
            },
            { text: '个人简历', link: '/resume/' },
            {
                text: '开源',
                items: [
                    { text: 'money2uppercase', link: 'https://www.npmjs.com/package/money2uppercase' },
                    { text: 'vue-preview-editor', link: 'https://www.npmjs.com/package/vue-preview-editor' },
                    { text: 'GitHub', link: 'https://github.com/parchments' }
                ]
            }
        ],
        // sidebar: 'auto'
        sidebar: {
            '/templatePlugs/':[
                {
                    title: '模板总结', // 侧边栏名称
                    collapsable: true, // 可折叠
                    children: [
                        '/templatePlugs/test/baseTemplate',//基础模板
                        '/templatePlugs/basePlugs',//常用插件
                    ]
                }
            ],
            '/interview/':[
                {
                    title: '面试经典', // 侧边栏名称
                    collapsable: true, // 可折叠
                    children: [
                        '/interview/interviewSkills',//面试技巧
                        '/interview/interviewQuestions',//面试题
                        '/interview/interviewQuestions'//常用插件
                    ]
                }
            ],
            '/advanced/':[
                {
                    title: '前端进阶', // 侧边栏名称
                    collapsable: true, // 可折叠
                    children: [
                        '/advanced/js',//js
                        '/advanced/vue'//vue
                    ]
                }
            ],
            // '/interview/':[
            //     '',
            //     'interviewSkills',
            //     'interviewQuestions',
            //     'algorithm'
            // ],
            '/resume/':[
                '',
            ]

        }
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
