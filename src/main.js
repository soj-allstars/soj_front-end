import Vue from 'vue'
import $ from 'jquery'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import common from './lib/common.js'

 
Vue.use(common);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
