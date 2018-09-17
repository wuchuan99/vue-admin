import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import store from '@/store/store'
Vue.use(elementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: c => c(App)
})
