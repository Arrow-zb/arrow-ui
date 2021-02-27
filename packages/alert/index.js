import Index from './src/packaging.js'

Index.install = function(Vue) {
  Vue.prototype.Alert = Index
};

export default Index