import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ownerList: [
      { name:'kashif', pNumber:'976-75-4356', noProperty:'5', 
      noTenants:'4', rent:'200' },
      { name:'kashif', pNumber:'976-75-4356', noProperty:'5', 
      noTenants:'4', rent:'200' },
      { name:'kashif', pNumber:'976-75-4356', noProperty:'5', 
      noTenants:'4', rent:'200' },
      { name:'kashif', pNumber:'976-75-4356', noProperty:'5', 
      noTenants:'4', rent:'200' },
      { name:'kashif', pNumber:'976-75-4356', noProperty:'5', 
      noTenants:'4', rent:'200' },
    ],
    feedbackList: [
      { name:'usman', pNumber:'9876-665-445', 
      msg:'dasds adjabk ja sdkajsd kjasd kjjsd askjasda dkak'},
      { name:'usman', pNumber:'9876-665-445', 
      msg:'dasds adjabk ja sdkajsd kjasd kjjsd askjasda dkak'},
      { name:'usman', pNumber:'9876-665-445', 
      msg:'dasds adjabk ja sdkajsd kjasd kjjsd askjasda dkak'},
      { name:'usman', pNumber:'9876-665-445', 
      msg:'dasds adjabk ja sdkajsd kjasd kjjsd askjasda dkak'},
      { name:'usman', pNumber:'9876-665-445', 
      msg:'dasds adjabk ja sdkajsd kjasd kjjsd askjasda dkak'},
    ]
  },
  mutations: {
  },
  actions: {
    addOwner (data) {
      console.log(data);
    },
    searchOwner (data) {
      console.log(data);
    },
    suspendOwner (data) {
      console.log(data);
    },
    paymentGatewayStripe (data) {
      console.log(data);
    },
    paymentGatewayBills (data) {
      console.log(data);
    },
    paymentGatewaySlip (data) {
      console.log(data);
    },
  },
  modules: {
  }
})
