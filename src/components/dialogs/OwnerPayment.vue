<template>
  <div>
    <v-card>
      <v-card-title ><span class="headline blue--text">Owner Configurations</span></v-card-title>
      <v-card-text>
        <br>
        <div>
          <!-- <v-switch v-model="registrations" color="indigo" class="mx-2" 
          label="Tenant Registrations" @change="paymentGatewayRegistrationsFunc">
          </v-switch> -->
          <v-switch v-model="slip" color="indigo" class="mx-2" 
          label="Bank slip upload" @change="paymentGatewaySlipFunc">
          </v-switch>
          <v-switch v-model="bills" color="indigo" class="mx-2" 
          label="Billplz" @change="paymentGatewayBillsFunc">
          </v-switch>
          <v-switch v-model="stripe" color="indigo" class="mx-2" 
          label="Stripe" @change="paymentGatewayStripeFunc">
          </v-switch>
          <v-switch v-model="paypal" color="indigo" class="mx-2" 
          label="Paypal" @change="paymentGatewayPaypalFunc">
          </v-switch>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn class="marginLeft" color="blue darken-1" text @click.native="$emit('finish')" >
          close</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
 
 <script>
 import {mapActions} from 'vuex';
 export default {
   name: 'OwnerPayment',
   props: ['owner'],
   data () {
     return {
      registrations: true,
      paypal: true,
      slip: true,
      bills: true,
      stripe: true,
     }
   },
   mounted () {
     this.initConfigs();
   },
   methods: {
    ...mapActions([
      'paymentGatewayPaypal',
      'paymentGatewayRegistration',
      'paymentGatewayStripe',
      'paymentGatewayBills',
      'paymentGatewaySlip'
    ]),
    initConfigs() {
      for(let item of this.owner.configs){
       if(item.type == 'registrations'){
         this.registrations = item.status
       }
       if(item.type == 'billplz'){
        //  console.log("bilplz....",item.status)
         this.bills = item.status
       }
       if(item.type == 'bankslip'){
         this.slip = item.status
       }
       if(item.type == 'paypal'){
         this.paypal = item.status
       }
       if(item.type == 'stripe'){
         this.stripe = item.status
       }
     }
    },
    paymentGatewaySlipFunc () {
      this.paymentGatewaySlip({ownerId:this.owner.id,configs:{bankslip: this.slip}});
    },
    paymentGatewayBillsFunc () {
      // console.log({ownerId:this.owner.id,configs:{billplz: this.bills}})
      this.paymentGatewayBills({ownerId:this.owner.id,configs:{billplz: this.bills}});
    },
    paymentGatewayStripeFunc () {
      this.paymentGatewayStripe({ownerId:this.owner.id,configs:{stripe: this.stripe}});
    },
    paymentGatewayRegistrationsFunc () {
      this.paymentGatewayRegistration ({ownerId:this.owner.id,configs:{registrations: this.registrations}})
    },
    paymentGatewayPaypalFunc () {
      this.paymentGatewayPaypal ({ownerId:this.owner.id,configs:{paypal: this.paypal}})
    }
   },
   watch: {
     'owner': function() {
       this.initConfigs()
     }
   }
 }
 </script>
 
 <style>
 
 </style>