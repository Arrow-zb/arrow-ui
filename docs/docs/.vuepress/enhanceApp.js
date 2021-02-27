import ELEMENT from '../../../lib/element-ui/element-ui-v2.13.2.js';
import '../../../lib/element-ui/element-ui-v2.13.2.css';

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/lucario.css'
import './public/assets/css/codemirror.css'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.use(ELEMENT);
  // ! 使用 mixin 很不好，因为这样每一个 vue 对象都会加载一遍，实在不好
  Vue.mixin({
    mounted() {
      import('codemirror/mode/vue/vue.js');
      import('vue-codemirror').then(vueCodemirror => {
        Vue.use(vueCodemirror.default, {
          options: {
            tabSize: 2,
            mode: 'text/x-vue',
            theme: 'lucario',
            lineNumbers: true,
            line: true,
            readOnly: true
          }
        })
      });
      import('../../../lib/arrow-ui/arrow-ui.js').then(ARROWUI => {
        Vue.use(ARROWUI.default)
      })
    }
  });
}


// !! 其实下面这种方式更合理，但是 build 不过
// https://segmentfault.com/a/1190000022727986 这是大致出现的问题
// !！我觉得这个还是配置得有问题，你看element就没问题，可以直接引入

// import ELEMENT from '../../../lib/element-ui/element-ui-v2.13.2.js';
// import ARROWUI from '../../../lib/arrow-ui/arrow-ui.js';
// import '../../../lib/element-ui/element-ui-v2.13.2.css';

// import VueCodemirror from 'vue-codemirror'
// import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/lucario.css'
// import 'codemirror/mode/vue/vue.js'
// import './public/assets/css/codemirror.css'

// export default ({
//   Vue, // VuePress 正在使用的 Vue 构造函数
//   options, // 附加到根实例的一些选项
//   router, // 当前应用的路由实例
//   siteData // 站点元数据
// }) => {
//   Vue.use(ELEMENT);
//   Vue.use(ARROWUI);
//   Vue.use(VueCodemirror, {
//     options: {
//       tabSize: 2,
//       mode: 'text/x-vue',
//       theme: 'lucario',
//       lineNumbers: true,
//       line: true,
//       readOnly: true
//     }
//   })
// }



