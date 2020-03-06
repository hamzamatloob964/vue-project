<template>
  <div class="loginPage justify-center">
    <v-card class="elevation-12">
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
          @click="verifyOtp"
          id="loginBtn"
          width="50%"
          class="white--text" 
          color="blue"
          >Submit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import router from '../router';
import {mapActions} from 'vuex';
import {mapState} from 'vuex';
import '../assets/App.css'
  export default {
    name: 'verifyOTP',
    data () {
      return {
        otp:'',
        submitted: false
      }
    },
    methods: {
      ...mapActions([
        'OTPVerify'
      ]),
      verifyOtp () {
        if (!this.otp) {
            alert("please provide correct OTP code to proceed")
            return;
        }
        this.OTPVerify({otp:this.otp}) .then(() => {
          router.push('/dashboard');
        }).catch(err => {
          console.log('ERROR OCCURED',err);
          alert("OTP code is not valid !")
        }) 
      
      },
      handleOnComplete(value) {
        this.otp = value
      },
      handleOnChange() {
        this.otp = ''
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