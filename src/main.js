import Vue from 'vue'
import $ from 'jquery'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import common from './lib/common.js'
import 'highlight.js/styles/googlecode.css' //样式文件

Vue.config.productionTip = false;

Vue.use(common);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
