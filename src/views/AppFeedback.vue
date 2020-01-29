<template>
  <div>
    <div class=" pa-5">
      <template>
        <div class="toolbar">
          <Breadcrumb class="breadcrumb"/>
        </div>
      </template>
    </div>
    <div class="card-main pa-5">
      <template>
        <v-card
          outlined class="card"
          max-width="700px"
          height="130"
          flat
          @click.stop="dialog = true"
          @click="showMsg(item)"
          v-for="(item,i) in feedbackList" :key="i"
        >
          <v-list-item>
            <v-list-item-avatar
              tile
              size="75"
              color="grey"
            >
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            /></v-list-item-avatar>
            <v-list-item-content>
              <v-card-title class="title  mb-1">{{item.name}}</v-card-title>
              <v-card-subtitle >
                <span class='text--primary'><v-icon class="">mdi-cellphone-basic</v-icon>  
              {{item.pNumber}}</span> &mdash; {{item.msg}}
              </v-card-subtitle>
              <!-- <v-card-subtitle class=""><v-icon class="">mdi-cellphone-basic</v-icon>  
              01323-23123-3123</v-card-subtitle> -->
              <!-- <v-card-text class="d-flex mb-2">"this is my feedback"</v-card-text> -->
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </template>
      <v-app >
        <v-dialog v-model="dialog"  transition="dialog-bottom-transition" width="40%">
          <v-card>
            <v-toolbar color="#0082ca">
              <v-toolbar-title class="white--text" > App Feedback </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <br>
              <v-label><span>" {{msg}} "</span></v-label>
              
            </v-card-text>
            <v-card-actions>
              <v-btn color="#0082ca" @click.native="dialog = false" 
              class="white--text">close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import {mapActions} from 'vuex';
import {mapState} from 'vuex';
export default {
name:'AppFeedback',
data () {
  return {
    msg: '',
    dialog: false,
  }
},
methods: {
  ...mapActions([
    'getAppFeedback'
    ]),
  showMsg (item) {
    this.msg = item.msg;
  }
},
computed: {
  ...mapState([
    ]),
},
mounted () {
  this.getAppFeedback();
},
components: {
  Breadcrumb
}
}
</script>

<style scoped>
.card-main {
  height: 425px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
}
.card {
  margin-right: 15px;
  margin-bottom: 15px;
}
</style>