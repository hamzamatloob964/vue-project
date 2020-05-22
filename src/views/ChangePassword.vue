<template>
  <div>
    <div class="toolbar pa-5">
      <Breadcrumb class="breadcrumb"/>
    </div>
    <div class="justify-center changePass">
      <v-alert type="error" dense dismissible max-width="500" v-model="showErrorAlert">
        <div>Invalid current password!</div> 
      </v-alert>
      <v-alert type="success" dense dismissible max-width="500" v-model="showSuccessAlert">
        password changed successfully
      </v-alert>

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
import Breadcrumb from '../components/Breadcrumb'
import {mapActions} from 'vuex';
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import '../assets/App.css'
import {post} from '../services/RestService'

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
        showErrorAlert: false,
        showSuccessAlert: false
      }
    },
    validations: {
      user: {
          currentpassword: { required },
          newpassword: { required, minLength: minLength(6) },
          confirmpassword: { required, minLength: minLength(6), sameAs: sameAs('newpassword') }
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
            this.showErrorAlert = true
          } else{
            if(this.isCurrentPass == false ){
              this.showErrorAlert = false
            }
          }

        this.loading = true;
        post('change-password', {password:this.user.currentpassword, newPassword: this.user.newpassword})
          .then(() => {
            this.showErrorAlert = false
            this.showSuccessAlert = true;
          })
          .catch(() => {
            this.showSuccessAlert = false;
            this.showErrorAlert = true;
          }) 
          .finally(() => {
            this.loading = false;
          })
        }
        
      }
    },
    computed: {
      
      currentPasswordErrors() {
        var field = this.$v.user.currentpassword;
        let error = [];
        if(!field.$dirty) return error;
        !field.required && error.push('required')
        return error;
      },
      newPasswordErrors() {
        var field = this.$v.user.newpassword;
        let error = [];
        if(!field.$dirty) return error;
        !field.required && error.push('required')
        !field.minLength && error.push('should be at least 6 characters')
        return error;
      },
      confirmPasswordErrors() {
        var field = this.$v.user.confirmpassword;
        let error = [];
        if(!field.$dirty) return error;
        !field.required && error.push('required')
        !field.minLength && error.push('should be at least 6 characters')
        !field.sameAs && error.push('Password does not match')
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