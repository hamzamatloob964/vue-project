<template>
  <div class="loginPage justify-center">
    <v-form
      ref="form"
      >
      <!-- <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
          </v-col>
        </v-row>
      </v-container> -->
      <v-card class="elevation-12">
        <!-- <v-toolbar
          color="#0082ca"
          dark
          flat
          class="d-flex justify-center"
        >
          <v-toolbar-title >Login form</v-toolbar-title>
          <v-spacer />
        </v-toolbar> -->
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
          <!-- <v-div v-if="submitted && $v.user.username.$error" >
              <span style="color:red;" v-if="!$v.user.username.required">
                username is required</span><br>
          </v-div> -->

          <v-text-field
            id="password"
            label="Enter your password"
            v-model="user.password"
            type="password"
            :error-messages="passwordErrors"              
          />
          <!-- <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
            <span style="color:red;" v-if="!$v.user.password.required">
              Password is required</span><br>
            <span style="color:red;" v-if="!$v.user.password.maxLength">
              Password should be at most 8 characters long</span>
          </div> -->
        </v-card-text>
        <v-card-actions class="justify-center">
          
          <!-- <router-link to="/dashBoard"> -->
          <v-btn 
          @click="logIn"
          id="loginBtn"
          width="50%"
          class="white--text" 
          color="blue"
          >Submit</v-btn>
          <!-- </router-link> -->
          <!-- <v-btn color="primary" class="ml-2">signUp</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
  <!-- <v-app id="inspire">
    <v-content>
    </v-content>
  </v-app> -->
</template>

<script>
//import router from '../router';
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
        user:{ username:'',password:'' },
        errors: null,

      }
    },
    validations: {
      user: {
          username: { required },
          password: { required, maxLength: maxLength(8) }
      }
    },
    methods: {
      ...mapActions([
        'Login'
      ]),
      logIn () {
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }
        this.$router.push('/OTPVerify');
        // this.Login(this.user) .then(res => {
        //   router.push('/dashboard');
        //   console.log(res)
        // }).catch(err => {
        //   console.log('ERROR OCCURED',err);
        //   alert("Email or password is incorrect !")
        // }) 
        //console.log("%%%%% DATA :"+this.login.email);
      }
    },
    computed: {
      ...mapState([
        'login'
      ]),
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
        !field.maxLength && error.push('Password length is atmost 8 characters long!')
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