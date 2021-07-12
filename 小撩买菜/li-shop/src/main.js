import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false;
//1.引入fastclick
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

//2.引入全局样式
import './style/common.less'

//3.引入全局UI组件库
import './plugins/vant'
//4.引入rem
import './config/rem.js'
//5.引入过滤器
import './config/filters'
//引入创建二维码插件
import VueQriously from 'vue-qriously';
Vue.use(VueQriously);

new Vue({
    store,
    router,
  render: h => h(App)
}).$mount('#app')
