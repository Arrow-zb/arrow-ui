import Index from './src/index.vue'

Index.install = function(Vue) {
  Vue.prototype.Alert = Index
};

export default Index