<template>
   <div>
    <v-dialog v-model="dialog"  transition="dialog-bottom-transition" width="40%">
      <v-card>
        <v-card-title ><span class="headline blue--text"> SUSPEND OWNER</span></v-card-title>
        <v-card-text>
          <br>
          <v-label><span>Are you sure to suspend owner ?</span></v-label>
          
        </v-card-text>
        <v-card-actions>
          <div class="marginLeft">
            <v-btn color="blue darken-1" text @click="suspendOwnerFunc">
              Yes</v-btn>
            <v-btn color="blue darken-1" text @click.native="dialog = false">
              close</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
   </div>
 </template>
 
 <script>
 export default {
   name: 'suspendOwner',
   data () {
     return {
       dialog: true,
       ownerPNumber:''
     }
   },
   methods: {
     suspendOwnerFunc () {

     }
   }
 }
 </script>
 
 <style>
 
 </style>