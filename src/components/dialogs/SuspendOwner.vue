<template>
  <div>
    <v-card>
      <v-card-title ><span class="headline blue--text">Owner Status</span></v-card-title>
      <v-card-text>
        <br>
        <div v-if="!displayError">
          <v-label v-if="!displaySucccess"><span>Are you sure you want to {{owner.status === 'suspended'? 'unsuspend': 'suspend'}} owner?</span></v-label>
          <v-label v-if="displaySucccess"><span>You have successfully {{owner.status === 'suspended'? 'activated': 'suspended'}} owner.</span></v-label>
        </div>
        <v-label v-if="displayError"><span>Owner is already suspended.</span></v-label>
      </v-card-text>
      <v-card-actions>
        <div class="marginLeft">
          <div v-if="!displayError">
            <v-btn v-if="!displaySucccess" color="blue darken-1" text @click="suspendOwnerFunc">
              Yes</v-btn>
            <v-btn color="blue darken-1" text @click.native="$emit('finish')">
              close</v-btn>
          </div>
          <v-btn v-if="displayError" color="blue darken-1" text @click.native="$emit('finish')">
            close</v-btn>
        </div>
      </v-card-actions>
  </v-card>
  </div>
</template>
 
 <script>
 import {mapActions} from 'vuex';

 export default {
   name: 'suspendOwner',
   props: ['owner'],
   data () {
     return {
       ownerPNumber:'',
       displaySucccess: false,
       displayError: false,
     }
   },
   methods: {
     ...mapActions([
       'suspendOwner',
       'getOwners'
     ]),
     suspendOwnerFunc () {
        let obj = {id: this.owner.id, status: this.owner.status === 'active' ? 'suspended': 'active'}
        this.suspendOwner(obj).then(() => {
          // this.displaySucccess = true;
          this.getOwners()
          this.$emit('finish')
        })
     }
   }
 }
 </script>
 
 <style>
 
 </style>