<template>
   <div>
     <v-dialog v-model="dialog"  transition="dialog-bottom-transition" width="40%">
        <v-card>
          <v-card-title ><span class="headline blue--text"> ADD OWNER</span></v-card-title>
          <v-card-text>
            <br>
            <v-text-field label="Enter Phone Number" v-model="ownerPNumber">
            </v-text-field>
            
          </v-card-text>
          <v-card-actions>
            <div class="marginLeft" >
              <v-btn color="blue darken-1" text @click="addOwnerFunc">
                Submit</v-btn>
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
   name: 'my-breadcrumb',
   data () {
     return {
       dialog: true,
       ownerPNumber:''
     }
   },
   methods: {
     addOwnerFunc () {

     }
   }
 }
 </script>
 
 <style>
 
 </style>