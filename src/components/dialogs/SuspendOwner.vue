<template>
   <div>
    <v-dialog v-model="dialog"  transition="dialog-bottom-transition" width="40%">
      <v-card>
        <v-card-title ><span class="headline blue--text"> SUSPEND OWNER</span></v-card-title>

        <v-card-text>
          <br>
          <div v-if="!displayError">
            <v-label v-if="!displaySucccess"><span>Are you sure to suspend owner ?</span></v-label>
            <v-label v-if="displaySucccess"><span>You have successfully suspended owner.</span></v-label>
          </div>
          <v-label v-if="displayError"><span>Owner is already suspended.</span></v-label>
        </v-card-text>

        <v-card-actions>
          <div class="marginLeft">
            <div v-if="!displayError">
              <v-btn v-if="!displaySucccess" color="blue darken-1" text @click="suspendOwnerFunc">
                Yes</v-btn>
              <v-btn color="blue darken-1" text @click.native="dialog = false">
                close</v-btn>
            </div>
            <v-btn v-if="displayError" color="blue darken-1" text @click.native="dialog = false">
                close</v-btn>
          </div>
        </v-card-actions>

      </v-card>
    </v-dialog>
   </div>
 </template>
 
 <script>
 import {mapActions} from 'vuex';
 export default {
   name: 'suspendOwner',
   props: ['owner'],
   data () {
     return {
       dialog: true,
       ownerPNumber:'',
       displaySucccess: false,
       displayError: false
     }
   },
   methods: {
     ...mapActions([
       'suspendOwner',
       'getOwners'
     ]),
     suspendOwnerFunc () {
       if(this.owner.status == 'active'){
         let obj = {id: this.owner.id, status: 'suspended'}
         this.suspendOwner(obj).then(() => {
           this.displaySucccess = true;
           this.getOwners()
         })
       }
       else if (this.owner.status != 'active'){
         this.displayError = true
       }
     }
   }
 }
 </script>
 
 <style>
 
 </style>