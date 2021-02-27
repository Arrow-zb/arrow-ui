/*
 * @Description: webpack 的公共配置， 后续还添加一些 externals
 * @Author: arrow
 * @Date: 2020-08-07 14:09:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-11 14:07:48
 */

var path = require('path');

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  vendor: path.resolve(__dirname, '../vendor'),
  examples: path.resolve(__dirname, '../examples'),
  lib: path.resolve(__dirname, '../lib'),
  'arrow-ui': path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

