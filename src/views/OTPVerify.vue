<template>
  <v-app id="inspire">
    <v-content>
      <v-form
        ref="form"
      >
        <v-container
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
              <v-card class=" otp-card elevation-12">
                <v-toolbar
                  color="#0082ca"
                  dark
                  flat
                  class="d-flex justify-center"
                >
                  <v-toolbar-title >Verify OTP code</v-toolbar-title>
                  <v-spacer />

                </v-toolbar>
                <v-card-text class="otp">

                  <v-text-field
                    id="userId"
                    v-model="user.otp1"
                    type="text"
                    outlined
                    class="field"
                  />
                  <v-div v-if="submitted && $v.user.otp1.$error" >
                      <span style="color:red;" v-if="!$v.user.otp1.required">
                        userID is required</span><br>
                      <span style="color:red;" v-if="!$v.user.otp1.maxLength">
                      This field should only contain 1 character.</span>
                  </v-div>

                  <v-text-field
                    id="userId"
                    v-model="user.otp2"
                    type="text"
                    class="field"
                    outlined
                  />
                  <v-div v-if="submitted && $v.user.otp2.$error" >
                      <span style="color:red;" v-if="!$v.user.otp2.required">
                        userID is required</span><br>
                      <span style="color:red;" v-if="!$v.user.otp2.maxLength">
                      This field should only contain 1 character.</span>
                  </v-div>

                  <v-text-field
                    id="userId"
                    v-model="user.otp3"
                    class="field"
                    type="text"
                    outlined
                  />
                  <v-div v-if="submitted && $v.user.otp3.$error" >
                      <span style="color:red;" v-if="!$v.user.otp3.required">
                        userID is required</span><br>
                      <span style="color:red;" v-if="!$v.user.otp3.maxLength">
                      This field should only contain 1 character.</span>
                  </v-div>

                  <v-text-field
                    id="userId"
                    class="field"
                    v-model="user.otp4"
                    type="text"
                    outlined
                    error-messages=''
                  />
                  <v-div v-if="submitted && $v.user.otp4.$error" >
                      <span style="color:red;" v-if="!$v.user.otp4.required">
                        userID is required</span><br>
                      <span style="color:red;" v-if="!$v.user.otp4.maxLength">
                      This field should only contain 1 character.</span>
                  </v-div>

                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <!-- <router-link to="/dashBoard"> -->
                  <v-btn 
                  color="#0082ca" 
                  @click="logIn"
                  id="loginBtn"
                  class="login-btn"
                  >Submit</v-btn>
                  <!-- </router-link> -->
                  <!-- <v-btn color="primary" class="ml-2">signUp</v-btn> -->
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-content>
  </v-app>
</template>

<script>
//import mdiAccount from '@mdi/js'
import router from '../router';
import {mapActions} from 'vuex';
import {mapState} from 'vuex';
import { required, maxLength } from 'vuelidate/lib/validators'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
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
      }
    },
    computed: {
      ...mapState([
        'login'
      ])
    },
  
  }
</script>
<style lang="css" scoped>
.login-btn {
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
}
</style>