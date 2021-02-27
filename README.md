# arrow-ui
arrow-ui 组件库
## 背景
1. 搭建自己的 UI 组件库
## 项目搭建
1. 初始化 package.json
```bash
npm init -y
```
修改 package.json
2. 项目目录
```
.
├── README.md 
├── build               // 打包时的配置文件
│   └── bin
├── dist                // 打包后的文件
├── examples            // UI 样例
│   ├── assets
│   │   ├── images
│   │   └── styles
│   ├── components
│   ├── docs
│   └── pages
│       └── template
├── package.json        
├── packages            // UI 组件
└── src                 // 导出组件和配置
```
3. build/bin/build-entry.js

3.1 json-templater
用于将双大括号中的字符替换成json的数据，主要将 import {{ name }} from {{ path }}
```js
render('{{xfoo}} {{say.what}}', { xfoo: 'yep', say: { what: 'yep' } });
yep yep 
```
3.2 uppercamelcase
转换命名的  是否使用取决于前端服务 目前暂不使用
因为在 import 时不能存在连字符（一般大写，因此，使用）
```js
upperCamelCase('foo-bar');
//=> FooBar
upperCamelCase('foo_bar');
//=> FooBar
upperCamelCase('Foo-Bar');
//=> FooBar
```
3.3 cross-env
跨平台设置和使用环境变量的脚本

3.4 ProgressBarPlugin
webpack 构建时进度条

3.5 uglifyjs-webpack-plugin
This plugin uses UglifyJS v3 (uglify-es) to minify your JavaScript

3.6 i18n

3.7 rimraf 
The UNIX command rm -rf for node.

3.8 TerserPlugin
This plugin uses terser to minify your JavaScript.

3.9 cp-cli
copy in nodejs.

4. 验证是否能够使用