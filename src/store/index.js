import Vue from 'vue'
import Vuex from 'vuex'
import {post,get} from '../services/RestService'
var Cookies = require('vue-cookies')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // ownerList: [
    //   { name:'kashif', pNumber:'976-75-4356', noProperty:'5', 
    //   noTenants:'4', rent:'200' },
    //   { name:'kashif', pNumber:'976-75-4356', noProperty:'5', 
    //   noTenants:'4', rent:'200' },
    //   { name:'kashif', pNumber:'976-75-4356', noProperty:'5', 
    //   noTenants:'4', rent:'200' },
    //   { name:'kashif', pNumber:'976-75-4356', noProperty:'5', 
    //   noTenants:'4', rent:'200' },
    //   { name:'kashif', pNumber:'976-75-4356', noProperty:'5', 
    //   noTenants:'4', rent:'200' },
    // ],
    feedbackList: [
      // { name:'usman', pNumber:'9876-665-445', 
      // msg:'dasds adjabk ja sdkajsd kjasd kjjsd askjasda dkak'},
      // { name:'usman', pNumber:'9876-665-445', 
      // msg:'dasds adjabk ja sdkajsd kjasd kjjsd askjasda dkak'},
      // { name:'usman', pNumber:'9876-665-445', 
      // msg:'dasds adjabk ja sdkajsd kjasd kjjsd askjasda dkak'},
      // { name:'usman', pNumber:'9876-665-445', 
      // msg:'dasds adjabk ja sdkajsd kjasd kjjsd askjasda dkak'},
      // { name:'usman', pNumber:'9876-665-445', 
      // msg:'dasds adjabk ja sdkajsd kjasd kjjsd askjasda dkak'},
    ],
    token:'',
    ownersList:[],
    globalSttings: {}
  },
  mutations: {
    "SET_TOKEN": (state,token) => {
      Cookies.set('adminToken',token)
      Vue.set(state,'token',token)
      //console.log("user token is ********** :",token)
    },
    "SET_OTP": () => {
      //Cookies.set('Token',token)
      //Vue.set(state,'token',token)
      //console.log("user token is :",token)
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
        state.ownersList.push(obj)
        obj = {}
      }
      //Vue.set(state,'ownersList',data)
      //console.log("mutation owner list is  :",data)
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
  },
  actions: {
    login ({commit},data) {
      return new Promise (function (resolve,reject) {
        post('login',data).then(res => {
          console.log("login response is : ",res)
          commit("SET_TOKEN", res.idToken);
          resolve(res)
        }).catch(err => {
          reject(err)
        })

      })
    },
    OTPVerify ({commit},otp) {
      //console.log("store otp :",otp)
      return new Promise (function (resolve,reject) {
        let token = Cookies.get('adminToken')
        token = 'bearer '+token
        let obj = {'Authorization': token}
        //console.log("cookies is :",Cookies.get('adminToken'))
        //console.log("otp is ******* :",otp)
        post('verifyotp',otp,{headers:obj}).then(res => {
          commit("SET_OTP", res.idToken);
          //console.log("OTP response is : ",res)
          //commit("SET_TOKEN", res.idToken);
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
