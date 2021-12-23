import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { initializeApp } from "firebase/app";
Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: "AIzaSyAcxMmFWjl5aNtTyl0c6mhH0ArgtEYd2GQ",
  authDomain: "macxx-49224.firebaseapp.com",
  projectId: "macxx-49224",
  storageBucket: "macxx-49224.appspot.com",
  messagingSenderId: "722089416472",
  appId: "1:722089416472:web:42e19969c6acfa2cac706d",
  measurementId: "G-EJ9LGNLYDX"
};
const firebase = initializeApp(firebaseConfig);
new Vue({
  router,
  vuetify,
  firebase,
  render: h => h(App)
}).$mount('#app')
