<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <h1 class="pa-4 grey--text text--darken-3">Welcome Admin</h1>

      <v-list dense >
        <v-list-item v-for="link in E_links" 
        :key="link.text" router :to="link.route" active-class="secondary--text">
          <v-list-item-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>  
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="#0082ca"
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">8Rent Admin</v-toolbar-title>
    </v-app-bar>

    <v-main style="max-height: 100vh; overflow: auto">
      <v-container class="pb-10" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <!-- <v-content>
      <div class="py-5" style="border: 2px solid red">
        <router-view></router-view>
      </div>
    </v-content> -->

    <v-footer
      color="#0082ca"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
var Cookies = require('vue-cookies')
import {mapActions} from 'vuex';
  export default {
    props: {
      source: String,
    },
    data () {
      return{
        hamza:'hamza',
        drawer: null,
        E_links: [
          { icon:'mdi-view-grid', text:'Home',
          route:'/dashBoard/home'},
          { icon:'mdi-settings', text:'Owner Settings',
          route:'/dashBoard/ownerSettings'},
          { icon:'mdi-settings', text:'Global Settings',
          route:'/dashBoard/globalSettings'},
          { icon:'mdi-tooltip-text', text:'App Feedback',
          route:'/dashBoard/appFeedback'},
          { icon:'mdi-tooltip-text', text:'Change Password',
          route:'/dashBoard/changePassword'}
        ]
      }
    },
    methods: {
      ...mapActions([
      ]),
      logout () {
        Cookies.remove('adminToken');
        //this.$store.state.token = null;
        // this.$store.dispatch('Logout');
        this.$router.push('/');

      }
    }
  }
</script>
<style scopped>
html{
  overflow-y: hidden !important;
}
.v-application .indigo{
  /* background-color:	 #fa9c04 !important; */
}
/* .v-application .indigo{
  background-color:	#00739B !important;
} */
/* .theme--light.v-navigation-drawer{
  background-color: #3f4d53;
} */
/* .v-list .v-list-item--active{
  color: white;
}
.v-application a{
  color:white;
} */
/* .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
  color: white !important;
} */
/* ::selection{
  background-color: white;
  color: white;
} */
</style>