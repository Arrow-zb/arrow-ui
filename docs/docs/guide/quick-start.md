# 快速上手

::: tip
目前所有的组件并没有推送到私有 npm 仓库，因为采用了静态资源 script 方式引入
:::

::: warning
之后还是需要将仓库推送到私有仓库中，当然，肯定是自动化的通过 gitlab 钩子触发 node 监控自动实现。
:::

## 使用 script（link） 引入
将 arrow-ui 打包并推送到了 arrow-static 仓管，arrow-static 仓库同其它前端服务一样部署在集群中，同时为了加速这些静态资源的获取，所有的静态资源都部署在了阿里云的CDN上，通过 script 进行访问。因此，可直接使用 script(link) 进行引入这些静态资源。
::: tip
arrow-static 仓库用于在存储和记录每次 arrow-ui 更新后构建完成的资源。
:::
### 完整示例
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>example-to-get-static</title>
    <link rel="stylesheet" href="http://resource.arrow-zb.cn/arrow-static/element-ui/element-ui-v2.13.2.css"></link>
  </head>
 
  <body>
    <script src="http://resource.arrow-zb.cn/arrow-static/vue/vue.prod-v2.6.11.js"></script>
    <script src="http://resource.arrow-zb.cn/arrow-static/vue-router/vue-router-v3.4.6.js"></script>
    <script src="http://resource.arrow-zb.cn/arrow-static/element-ui/element-ui-v2.13.2.js"></script>
    <script src="http://resource.arrow-zb.cn/arrow-static/arrow-ui/arrow-ui-0.0.25.js"></script>
  </body>
</html>
```
::: tip
以上示例可直接获取到对应的静态资源，使用时需要注意使用环境。
同时，需要获取到最新的版本（或所需的），可到[arrow-static仓库]()查看。
:::

::: danger
如果是用于前端基座下，需要在每一个 script(或link) 中添加 ignore 属性，以便基座能够识别子服务对应的链接以忽略这些资源加载避免子服务重复加载。

同时如果是在 arrow 控制台运行，最好省略 `http://resource.arrow-zb.cn`, 直接使用 `/console/arrow-static/vue-router/vue-router-v3.4.6.js`
:::

::: warning
后续考虑将版本的更新日志添加到文档中
1. 便于查看最新版本
2. 便于获取所需版本
:::

## 使用 npm 包引入
::: details
目前暂时未将项目推送到 npm， 同时也未进行对应测试，对应的，之后有时间一定完成。
:::
