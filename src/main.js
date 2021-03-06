import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)
Vue.use(require('vue-moment'))


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
