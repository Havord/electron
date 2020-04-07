import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store'
import db from '../datastore'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$db = db
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  router,
  store,
  render: h => h(App),
  template: '<App/>'
}).$mount('#app')