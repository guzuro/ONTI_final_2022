import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { email, required, min } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

import firebase from "firebase";

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/assets/tailwind.css';

extend('email', email);
extend('required', required);
extend('min', min);

Vue.use(Antd);

const firebaseConfig = {
  apiKey: "AIzaSyABZscROMKz92lTIw9y48vXdBR5ApAWTcs",
  authDomain: "nti-final-f94a0.firebaseapp.com",
  projectId: "nti-final-f94a0",
  storageBucket: "nti-final-f94a0.appspot.com",
  messagingSenderId: "331434596838",
  appId: "1:331434596838:web:b0d28824cdfc6464ce9e27"
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
