import 'regenerator-runtime/runtime'
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

import VueApollo from 'vue-apollo'
import { createProvider } from './vue-apollo'
Vue.use(VueApollo)
export default new Vue({
  el: '#app',
  router,
  store,
  apolloProvider: createProvider(process.env.VUE_APP_GRAPHQL_HTTP),
  render: h => h(App)
}).$mount('#app')
