import Vue from 'vue'
import App from './App.vue'
import Meta from 'vue-meta'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './assets/css/index.css'
import VueTouch from 'vue-touch'
VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(Vant)
Vue.use(Meta)
Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
