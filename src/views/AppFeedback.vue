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
              <td>{{ item.title }}</td>
              <!-- <td>{{ item.age }}</td> -->
            </tr>
          </tbody>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="dialog"  transition="dialog-bottom-transition" width="40%">
      <v-card>
        <v-card-title ><span class="headline blue--text">{{title}}</span></v-card-title>
        <v-card-text>
          <br>
          <v-label><span>{{msg}}</span></v-label><br>
          <v-btn v-if="this.attachment" class="mt-5 white--text" color="blue" @click="showAttachment">
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
        text: 'Title',
        align: 'left',
        sortable: false,
        value: 'title',
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