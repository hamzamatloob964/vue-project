<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
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
      app
      color="#0082ca"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">APPLICATION</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer
      color="#0082ca"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </div>
</template>

<script>
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
          route:'/dashBoard/appFeedback'}
        ]
      }
    },
    methods: {
      ...mapActions([
      ]),
      logout () {
        //this.$store.state.token = null;
        // this.$store.dispatch('Logout');
        // router.push('/login');

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