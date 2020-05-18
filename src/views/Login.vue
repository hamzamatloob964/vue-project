<template>
  <div class="loginPage justify-center">
    <v-form
      ref="form"
      >
      <v-card class="elevation-12">
        <v-card-title class="justify-center"><span class="headline blue--text">LOGIN</span></v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            id="username"
            label="Enter your username"
            v-model="user.username"
            type="text"
            :error-messages="usernameErrors"
          />

          <v-text-field
            id="password"
            label="Enter your password"
            v-model="user.password"
            type="password"
            :error-messages="passwordErrors"              
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
</template>

<script>
import {mapActions} from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import '../assets/App.css'

Vue.use(Vuelidate)
  export default {
    name: 'logIn',
    data () {
      return {
        user:{ username:'',password:'' },
        errors: null,
        loading: false

      }
    },
    validations: {
      user: {
          username: { required },
          password: { required, minLength: minLength(6) }
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
        this.loading = true
        this.login(this.user).then(() => {
          //console.log("login res data:",res)
          this.$router.push('/OTPVerify');
        }).catch(() => {
          //console.log('ERROR OCCURED',err);
          this.loading = false
          alert("Email or password is incorrect !")
        }) 
      }
    },
    computed: {
      usernameErrors() {
        var field = this.$v.user.username;
        let error = [];
        if(!field.$dirty) return error;
        !field.required && error.push('UserName is required!')
        return error;
      },
      passwordErrors() {
        var field = this.$v.user.password;
        let error = [];
        if(!field.$dirty) return error;
        !field.required && error.push('Password is required!')
        !field.minLength && error.push('Password length is atmost 8 characters long!')
        return error;
      }
    },
  
  }
</script>
<style lang="css" scoped>
.invalid-email{
  margin-top: 5px;
}
</style>