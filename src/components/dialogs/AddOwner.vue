<template>
   <div>
     <v-dialog v-model="dialog"  transition="dialog-bottom-transition" width="40%">
        <v-card>
          <v-card-title ><span class="headline blue--text"> ADD OWNER</span></v-card-title>
          <v-card-text>
            <br>
            <v-text-field v-if="!success && !error" label="Enter Phone Number" v-model="ownerPNumber">
            </v-text-field>
            <v-label v-if="success"><span>Owner has been added successfully.</span></v-label>
            <v-label v-if="error"><span>Some error occured please enter valid phone number.</span></v-label>
            
          </v-card-text>
          <v-card-actions>
            <div class="marginLeft" >
              <v-btn v-if="!success && !error" color="blue darken-1" text @click="addOwnerFunc">
                Submit</v-btn>
              <v-btn color="blue darken-1" text @click.native="dialog = false">
                close</v-btn>
              <v-btn v-if="error" color="blue darken-1" text @click="error = false">
                ok</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
   </div>
</template>
 
 <script>
 import {mapActions} from 'vuex';
 export default {
   name: 'my-breadcrumb',
   data () {
     return {
       dialog: true,
       ownerPNumber:'',
       success: false,
       error: false
     }
   },
   methods: {
     ...mapActions([
       'addOwner',
     ]),
     addOwnerFunc () {
       if(this.ownerPNumber){
         this.addOwner({phoneno:this.ownerPNumber}).then(() => {
           this.success = true
         }).catch(() => {
           this.error = true
          //  console.log("error adding owner :",err)
         })
       }else{
         this.error = true
       }
     }
   }
 }
 </script>
 
 <style>
 
 </style>