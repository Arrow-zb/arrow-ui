import Clipboard from 'clipboard'
import { on } from '../utils/dom';
export default {
  bind(el, binding, vnode) {
      const clipboard = new Clipboard(el)
      clipboard.on('success', function(e) {
        el.innerHTML = "复制成功"
      })

      clipboard.on('error', function(e) {
        e.innerHTML = '复制失败'
      })

      on(el, 'mouseleave', (e) => {
        el.innerHTML = "复制"
      });
  }
}