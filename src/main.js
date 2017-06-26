import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App.vue'
import router from './router/router.js'
import VueResource from 'vue-resource'


Vue.use(ElementUI)
Vue.use(VueResource)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
