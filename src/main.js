import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

import router from './router';
const baseUrl = process.env.VUE_APP_BASE_URL;
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  baseUrl,
  render: h => h(App),
}).$mount('#app')
