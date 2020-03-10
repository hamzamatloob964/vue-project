import Vue from 'vue'
import Vuex from 'vuex'
import {post,get,put} from '../services/RestService'
var Cookies = require('vue-cookies')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    feedbackList: [
    ],
    token:'',
    ownersList:[],
    globalSttings: {}
  },
  mutations: {
    "SET_TOKEN": (state,token) => {
      Cookies.set('adminToken',token)
      Vue.set(state,'token',token)
    },
    "SET_OTP": () => {
    },
    "GET_OWNERS": (state,data) => {
      var obj = {}
      state.ownersList = []
      for(let i=0; i<data.length; i++){
        obj.id = data[i].id
        obj.name = data[i].user.firstName
        obj.phoneNo = data[i].user.phoneno
        obj.status = data[i].user.status
        obj.properties = data[i].properties
        obj.tenants = data[i].tenants
        obj.configs = data[i].configs
        state.ownersList.push(obj)
        obj = {}
      }
    },
    "SUSPEND_OWNER": () => {
    },
    "GET_OWNERS_CONFIGS": () => {
    },
    "GET_APP_FEEDBACKS": (state,data) => {
      // var obj = {}
      // state.ownersList = []
      // for(let i=0; i<data.length; i++){
      //   obj.id = data[i].id
      //   obj.name = data[i].user.firstName
      //   obj.phoneNo = data[i].user.phoneno
      //   obj.properties = data[i].properties
      //   obj.tenants = data[i].tenants
      //   state.ownersList.push(obj)
      //   obj = {}
      // }
      Vue.set(state,'feedbackList',data)
      //console.log("mutation feedback list is  :",data)
    },
    "GET_GLOBAL_SETTINGS": (state,data) => {
      // var obj = {}
      // state.ownersList = []
      // for(let i=0; i<data.length; i++){
      //   obj.id = data[i].id
      //   obj.name = data[i].user.firstName
      //   obj.phoneNo = data[i].user.phoneno
      //   obj.properties = data[i].properties
      //   obj.tenants = data[i].tenants
      //   state.ownersList.push(obj)
      //   obj = {}
      // }
      Vue.set(state,'globalSttings',data)
      //console.log("mutation globalSttings list is  :",data)
    },
    "GLOBAL_PAYMENT_GATEWAY_SLIP": () => {
    },
    "GLOBAL_PAYMENT_GATEWAY_BILLS": () => {
    },
    "GLOBAL_PAYMENT_GATEWAY_STRIPE" : () => {
    },
    "GLOBAL_TENANT_ACCOUNT": () => {
    },
    "GLOBAL_OWNER_ACCOUNT": () => {
    },
    "PAYMENT_GATEWAY_SLIP": () => {
    },
    "PAYMENT_GATEWAY_BILLS": () => {
    },
    "PAYMENT_GATEWAY_STRIPE": () => {
    },
    "PAYMENT_GATEWAY_PAYPAL": () => {
    },
    "PAYMENT_GATEWAY_REGISTRATIONS": () => {
    },
  },
  getters: {
    loggedIn () {
      return Cookies.get('adminToken')
    }
  },
  actions: {
    login ({commit},data) {
      return new Promise (function (resolve,reject) {
        post('login',data).then(res => {
          commit("SET_TOKEN", res.idToken);
          resolve(res)
        }).catch(err => {
          reject(err)
        })

      })
    },
    OTPVerify ({commit},otp) {
      return new Promise (function (resolve,reject) {
        post('verifyotp',otp).then(res => {
          commit("SET_OTP", res.idToken);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getOwners ({commit}) {
      return new Promise (function (resolve,reject) {
        get('owners').then(res => {
          commit("GET_OWNERS", res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    suspendOwner ({commit},data) {
      return new Promise (function (resolve,reject) {
        put('owners',data).then(res => {
          commit("SUSPEND_OWNER", res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    paymentGatewayRegistration ({commit},data) {
      return new Promise (function (resolve,reject) {
        put('user-configs',data).then(res => {
          commit("PAYMENT_GATEWAY_REGISTRATIONS", res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    paymentGatewayPaypal ({commit},data) {
      return new Promise (function (resolve,reject) {
        put('user-configs',data).then(res => {
          commit("PAYMENT_GATEWAY_PAYPAL", res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    paymentGatewayStripe ({commit},data) {
      return new Promise (function (resolve,reject) {
        put('user-configs',data).then(res => {
          commit("PAYMENT_GATEWAY_STRIPE", res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    paymentGatewayBills ({commit},data) {
      return new Promise (function (resolve,reject) {
        put('user-configs',data).then(res => {
          commit("PAYMENT_GATEWAY_BILLS", res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    paymentGatewaySlip ({commit},data) {
      return new Promise (function (resolve,reject) {
        put('user-configs',data).then(res => {
          commit("PAYMENT_GATEWAY_SLIP", res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAppFeedback ({commit}) {
      return new Promise (function (resolve,reject) {
        get('feedbacks').then(res => {
          commit("GET_APP_FEEDBACKS", res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getGlobalSettings ({commit}) {
      return new Promise (function (resolve,reject) {
        get('configs').then(res => {
          commit("GET_GLOBAL_SETTINGS", res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    globalPaymentGatewaySlip ({commit},data) {
      return new Promise (function (resolve,reject) {
        put('configs',data).then(res => {
          commit("GLOBAL_PAYMENT_GATEWAY_SLIP", res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    globalPaymentGatewayBills ({commit},data) {
      return new Promise (function (resolve,reject) {
        put('configs',data).then(res => {
          commit("GLOBAL_PAYMENT_GATEWAY_BILLS", res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    globalPaymentGatewayStripe ({commit},data) {
      return new Promise (function (resolve,reject) {
        put('configs',data).then(res => {
          commit("GLOBAL_PAYMENT_GATEWAY_STRIPE", res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    globalTenantAccount ({commit},data) {
      return new Promise (function (resolve,reject) {
        put('configs',data).then(res => {
          commit("GLOBAL_TENANT_ACCOUNT", res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    globalOwnerAccount ({commit},data) {
      return new Promise (function (resolve,reject) {
        put('configs',data).then(res => {
          commit("GLOBAL_OWNER_ACCOUNT", res);
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  modules: {
  }
})
