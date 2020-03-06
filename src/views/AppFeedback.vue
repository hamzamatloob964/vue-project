<template>
  <div>
    <div class=" pa-5">
      <template>
        <div class="toolbar">
          <Breadcrumb class="breadcrumb"/>
        </div>
      </template>
    </div>
    <div class="card-main pl-5 pr-5">
      <v-data-table
        :headers="headers"
        :items="feedbackList"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:body = {items}>
          <tbody>
            <tr v-for="(item,i) in items" :key="i" @click="selectItem(item)">
              <td>{{ item.name }}</td>
              <td>{{ item.phoneno }}</td>
              <td>{{ item.message }}</td>
              <!-- <td>{{ item.age }}</td> -->
            </tr>
          </tbody>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
    <!-- <div class="card-main pa-5">
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
              class="mt-6"
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
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </template>
      <v-app >
      </v-app>
    </div> -->
  <v-dialog v-model="dialog"  transition="dialog-bottom-transition" width="40%">
    <v-card>
      <v-card-title ><span class="headline blue--text">{{title}}</span></v-card-title>
      <v-card-text>
        <br>
        <v-label><span>" {{msg}} "</span></v-label><br>
        <v-btn class="mt-5 white--text" color="blue" @click="showAttachment">
          View Attachment
        </v-btn>
        
      </v-card-text>
      <v-card-actions>
        <v-btn class="marginLeft" color="blue darken-1" text @click.native="dialog = false">
          close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import {mapActions} from 'vuex';
import {mapState} from 'vuex';
import '../assets/App.css'
export default {
name:'AppFeedback',
data () {
  return {
    msg: '',
    title:'',
    attachment:'',
    dialog: false,
    banks:[
        {
          name: 'Jelly bean',
        },
        {
          name: 'Lollipop'
        },
        {
          name: 'Honeycomb'
        },
        {
          name: 'Donut',
        },
        {
          name: 'KitKat'
        },
      ],
    headers: [
      {
        text: 'Name',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      {
        text: 'Phone no',
        align: 'left',
        sortable: false,
        value: 'phoneno',
      },
      {
        text: 'Feedback',
        align: 'left',
        sortable: false,
        value: 'message',
      }
    ],
  }
},
methods: {
  ...mapActions([
    'getAppFeedback'
    ]),
  showMsg (item) {
    this.msg = item.msg;
  },
  selectItem(item){
    this.msg = item.message
    this.title = item.title
    this.attachment = item.attachment
    this.dialog = true;
  },
  showAttachment () {
    window.open(this.attachment)
  }
},
computed: {
  ...mapState([
    'feedbackList'
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
  height: 442px;
  width: 100%;
  overflow-y: auto;
}
.card {
  margin-right: 15px;
  margin-bottom: 15px;
}
</style>