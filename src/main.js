import Vue from 'vue'

import { store } from './store'
import { router } from './router'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import newSale from './components/sales/newSale.vue'
import bFormFile from 'bootstrap-vue/es/components/form-file/form-file'
import Alert from './components/shared/Alert.vue'
import deleteForm from '@/components/shared/delete.vue';
import newTextForm from '@/components/settings/defaults/newText.vue'

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

import App from './App'
import Vue2Filters from 'vue2-filters'
import './registerServiceWorker'

import VueStripeCheckout from 'vue-stripe-checkout';
 
Vue.use(VueStripeCheckout, 'pk_test_VB0IhSawfnAhr3qgZouDxAMo');

window.axios = require('axios');
window.cloneDeep = require('lodash/cloneDeep')

axios.interceptors.response.use(response => {
  return response;
}, error => {
  store.dispatch('alert/error', error.response );
  return  Promise.reject(error);
});

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vue2Filters)

Vue.use(Vuetify, {
  theme: {
    // primary: '#1d2b36', // #E53935
    // primary: '#17004b',
    darkPrimary: '#1B262F',
    menu: '#7269cf',
    // primary: '#7269cf',
    primary: '#313896',
    secondary: '#0086E7', // #FFCDD2
    // secondary: '#9F32B2',
    // third: '#0197F6',
    third: '#9F32B2',
    fourth: '#313896',
    fifth: '#68C5DB',
    buttonGrey: '#e0e0e0',
    light: colors.lightBlue.lighten5,
    accent: colors.lightBlue.accent4, // #3F51B5
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    background: '#E4E5E6',
    stockOk: '#00D809',
    stockWarning: '#F5A623',
    stockLow: '#FF0221'
  }
})

Vue.component('new-sale', newSale);
Vue.component('b-form-file', bFormFile);
Vue.component('app-alert', Alert);
Vue.component('delete-form', deleteForm);
Vue.component('new-text-form', newTextForm);

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    mapObject(from, to) {
        to.id = from.id
        Object.keys(from).forEach(key => {
            if (from[key] !== "" || from[key] !== null) {
                to[key] = from[key]
            } else if(Array.isArray(from[key]) && from[key].length !== 0) {
                to[key] = from[key]
            }
        })
        return to
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    toUpper(str) {
      return str.toLowerCase().replace(/^\w|\s\w/g, function (letter) {
        return letter.toUpperCase()
      })
    },
    capitilize(str) {
      if(str.length > 0){
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    decodeObject (from, to) {
      Object.keys(from).forEach(key => {
        to[key] = from[key]
      })
      return to
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
