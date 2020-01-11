import Vue from 'vue'
import AppContainer from './AppContainer.vue'
import router from './router'
import initStore from './store'
import vuetify from './plugins/vuetify'
import initSocketIo from './plugins/socket-io'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

initSocketIo(Vue)
const store = initStore(Vue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(AppContainer),
}).$mount('#app')
