import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import OtpInput from "@bachdgvn/vue-otp-input";
import VueCookies from 'vue-cookies';
 
Vue.component("v-otp-input", OtpInput);
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  VueCookies,
  render: h => h(App)
}).$mount('#app')
