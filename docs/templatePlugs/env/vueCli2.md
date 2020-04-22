# vue-cli2.0 环境变量配置

## 1、启动方式

在packcage.json中添加

```json
"scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "node build/build.js",
    "build--test": "cross-env NODE_ENV=production env_config=test node build/build.js",
    "build--uat": "cross-env NODE_ENV=production env_config=uat node build/build.js",
    "build--prod": "cross-env NODE_ENV=production env_config=prod node build/build.js"
}
```

## 2、新建.env文件

如果需要四个环境，在根目录的config文件夹中新建dev.env.js test.env.js uat.env.js  prod.env.js

![](https://oscimg.oschina.net/oscnet/up-935c8dd6e238f023711bf1f176d7e4c6469.png)

//dev.env.js

```javascript
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"'
})
```

//test.env.js

```javascript
'use strict'
module.exports = {
  NODE_ENV: '"testing"',
  ENV_CONFIG: '"test"'
}
```

//uat.env.js

```javascript
'use strict'
module.exports = {
  NODE_ENV: '"uat"',
  ENV_CONFIG: '"uat"'
}
```

//prod.env.js

```javascript
'use strict'
module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"prod"'
}
```

## 3、配置环境域名

//env.js，在根目录的config文件夹中新建env.js

```javascript
'use strict';
import config from './config.js'
/*
 * 配置编译环境和线上环境之间的切换
 * BASE_URL: 域名地址
 */
console.log('NOW_ENV', process.env.NODE_ENV)
let BASE_URL = '' 


if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://' // 开发
} else if (process.env.NODE_ENV === 'testing') {
  BASE_URL = 'http://' // 测试
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://' // 环境
} else if (process.env.NODE_ENV === 'uat') {
  BASE_URL = 'http://' // 仿真环境
}

//导出
export default BASE_URL

```

## 4、获取环境域名

```javascript
import BASE_URL from "../../config/env";
```