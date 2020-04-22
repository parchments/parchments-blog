# vue-cli3.0 环境变量配置

可往下看vue-cli3.0的方法，也可以右键打开[------->直接看项目更直观](https://github.com/parchments/vue-admin-template)

## 1、启动方式

在packcage.json中添加

```json
"scripts": {
    "dev": "vue-cli-service serve --mode dev",
    "build--test": "vue-cli-service build --mode test",
    "build--uat": "vue-cli-service build --mode uat",
    "build--prod": "vue-cli-service build --mode prod",
    "build": "vue-cli-service build"
}
```

## 2、新建.env文件

如果需要四个环境，在根目录的中新建.env.dev .env.test .env.uat  .env.prod

![](https://oscimg.oschina.net/oscnet/up-5fa7e0f59664f4fe68bc2301f85a80feea9.png)

//.env.dev

```javascript
NODE_ENV='development'
VUE_APP_CURRENTMODE='dev'
VUE_APP_BASEURL='http://********'
```

//.test.dev

```javascript
NODE_ENV='test'
VUE_APP_CURRENTMODE='test'
VUE_APP_BASEURL='http://********'
```

//.uat.dev

```javascript
NODE_ENV='uat'
VUE_APP_CURRENTMODE='uat'
VUE_APP_BASEURL='http://********'
```

//.prod.dev

```javascript
NODE_ENV='production'
VUE_APP_CURRENTMODE='prod'
VUE_APP_BASEURL='http://********'
```

## 3、获取环境域名

```javascript
process.env.BASE_URL
```