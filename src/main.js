import Vue from 'vue'
import Customer from './Customer.vue'

const app = new Vue({
  render: h => h(Customer)
}).$mount('#app')
