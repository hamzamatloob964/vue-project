<template>
  <div>
    <div class="toolbar pa-5">
      <Breadcrumb class="breadcrumb"/>
    </div>
    <div class="justify-center changePass">
      <v-alert type="error" dense dismissible max-width="500" v-model="isAlertTrue">
        <!-- <span v-if="isNewPass">password and Confirm password didn't match !</span> <br>
        <span v-if="isCurrentPass">Invalid current password !</span>  -->
        <div v-if="isNewPass">password and Confirm password didn't match !</div>
        <div v-if="isCurrentPass">Invalid current password !</div> 
      </v-alert>
      <!-- <v-alert type="error" dense dismissible max-width="500" v-model="isCurrentPass">
        Invalid current password !
      </v-alert> -->

      <v-form
        ref="form"
        @keyup.native.enter="logIn"
        >
        <v-card class="elevation-12">
          <v-card-title class="justify-center"><span class="headline blue--text">Change Password</span></v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              id="currentpassword"
              label="Enter your current password"
              v-model="user.currentpassword"
              type="password"
              :error-messages="currentPasswordErrors"
            />

            <v-text-field
              id="newpassword"
              label="Enter your new password"
              v-model="user.newpassword"
              type="password"
              :error-messages="newPasswordErrors"              
            />

            <v-text-field
              id="confirmpassword"
              label="Confirm Your new password"
              v-model="user.confirmpassword"
              type="password"
              :error-messages="confirmPasswordErrors"  
            />
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn 
            @click="logIn"
            id="loginBtn"
            width="50%"
            class="white--text" 
            color="blue"
            :loading="loading"
            >Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </div>
  </div>
</template>

<script>
var Cookies = require('vue-cookies')
import Breadcrumb from '../components/Breadcrumb'
import {mapActions} from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import '../assets/App.css'

Vue.use(Vuelidate)
  export default {
    name: 'logIn',
    components: {
      Breadcrumb
    },
    data () {
      return {
        user:{ currentpassword:'',newpassword:'',confirmpassword:'' },
        errors: null,
        loading: false,
        isAlertTrue: false,
        isNewPass: false,
        isCurrentPass: false

      }
    },
    validations: {
      user: {
          currentpassword: { required },
          newpassword: { required, minLength: minLength(8) },
          confirmpassword: { required, minLength: minLength(8) }
      }
    },
    methods: {
      ...mapActions([
        'login'
      ]),
      logIn () {
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }
        else {
          if (this.user.newpassword !== this.user.confirmpassword){
            console.log("if cond....")
            this.isAlertTrue = true
            this.isNewPass = true
          } else{
            if(this.isCurrentPass == false ){
              console.log("if new pass cond....")
              this.isAlertTrue = false
              this.isNewPass = false
            }
            this.isNewPass = false
          }

          this.login({username:Cookies.get('user'), password:this.user.currentpassword})
          .then(() => {
            if(this.isNewPass == false ){
              console.log("if curren pass cond....")
              this.isAlertTrue = false
              this.isCurrentPass = false
            }
            this.isCurrentPass = false
            //this.$router.push('/OTPVerify');
          }).catch(() => {
          
            this.loading = false
            //alert("Email or password is incorrect !")
            this.isAlertTrue = true
            this.isCurrentPass = true
          }) 
          this.loading = true
          //this.$router.push('/OTPVerify');
        }
        
      }
    },
    computed: {
      
      currentPasswordErrors() {
        var field = this.$v.user.currentpassword;
        let error = [];
        if(!field.$dirty) return error;
        !field.required && error.push('Current Password is required!')
        return error;
      },
      newPasswordErrors() {
        var field = this.$v.user.newpassword;
        let error = [];
        if(!field.$dirty) return error;
        !field.required && error.push('Password is required!')
        !field.minLength && error.push('Password length is atmost 8 characters long!')
        return error;
      },
      confirmPasswordErrors() {
        var field = this.$v.user.confirmpassword;
        let error = [];
        if(!field.$dirty) return error;
        !field.required && error.push('Confirm Password is required!')
        !field.minLength && error.push('Confirm Password length is atmost 8 characters long!')
        return error;
      }
    },
  
  }
</script>
<style lang="css" scoped>
.invalid-email{
  margin-top: 5px;
}
/* .changePass {
  overflow: auto;
} */
</style>