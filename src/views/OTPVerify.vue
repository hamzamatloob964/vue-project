<template>
  <div class="loginPage justify-center">
    <v-card class="elevation-12">
      <!-- <v-toolbar
        color="#0082ca"
        dark
        flat
        class="d-flex justify-center"
      >
        <v-spacer />

      </v-toolbar> -->
      <v-card-title class="justify-center">
        <span class="headline blue--text">VERIFY OTP</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-otp-input
          class="justify-center"
          ref="otpInput"
          input-classes="otp-input"
          separator="-"
          :num-inputs="6"
          :should-auto-focus="true"
          :is-input-num="true"
          @on-change="handleOnChange"
          @on-complete="handleOnComplete"
        />
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn 
          @click="logIn"
          id="loginBtn"
          width="50%"
          class="white--text" 
          color="blue"
          >Submit</v-btn>
      </v-card-actions>
    </v-card>
    <!-- <v-otp-input
      ref="otpInput"
      input-classes="otp-input"
      separator="-"
      :num-inputs="4"
      :should-auto-focus="true"
      :is-input-num="true"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
    /> -->
    <!-- <button @click="handleClearInput()">Clear Input</button> -->
  </div>
</template>

<script>
//import mdiAccount from '@mdi/js'
import router from '../router';
import {mapActions} from 'vuex';
import {mapState} from 'vuex';
import { required, maxLength } from 'vuelidate/lib/validators'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import '../assets/App.css'
Vue.use(Vuelidate)
  export default {
    name: 'logIn',
    data () {
      return {
        user:{ otp1:'',otp2:'',otp3:'',otp4:'' },
        submitted: false
      }
    },
    validations: {
      user: {
          otp1: { required,maxLength: maxLength(1) },
          otp2: { required,maxLength: maxLength(1) },
          otp3: { required,maxLength: maxLength(1) },
          otp4: { required,maxLength: maxLength(1) }
      }
    },
    methods: {
      ...mapActions([
        'Login'
      ]),
      logIn () {
        router.push('/dashBoard');
      //   this.submitted = true;
      //   // stop here if form is invalid
      //   this.$v.$touch();
      //   if (this.$v.$invalid) {
      //       return;
      //   }
      //   this.Login(this.user) .then(res => {
      //     router.push('/dashboard');
      //     console.log(res)
      //   }).catch(err => {
      //     console.log('ERROR OCCURED',err);
      //     alert("Email or password is incorrect !")
      //   }) 
      //   //console.log("%%%%% DATA :"+this.login.email);
      },
      handleOnComplete(value) {
        console.log('OTP completed: ', value);
      },
      handleOnChange(value) {
        console.log('OTP changed: ', value);
      },
      handleClearInput() {
        this.$refs.otpInput.clearInput();
      },
    },
    computed: {
      ...mapState([
        'login'
      ])
    },
  
  }
</script>
<style lang="less">
/* .login-btn {
  width: 100px;
  color: white;
  margin-top: 55px;
}
.otp {
  display: flex;
  margin-top: 10px;
}
.field {
  background-color: rgb(194, 186, 186);
  width: 10px;
  height: 55px;
  margin-left: 5px;
  font-size: 24px;
}
.otp-card {
  height: 270px;
} */
.otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
    &.error {
      border: 1px solid red !important;
    }
  }
  .otp-input::-webkit-inner-spin-button,
  .otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>