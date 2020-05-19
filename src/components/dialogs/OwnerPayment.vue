<template>
  <div>
    <v-dialog v-model="dialog"  transition="dialog-bottom-transition" width="40%">
      <v-card>
        <v-card-title ><span class="headline blue--text">Owner Configurations</span></v-card-title>
        <v-card-text>
          <br>
          <div>
            <v-switch v-model="registrations" color="indigo" class="mx-2" 
            label="Tenant Registrations" @change="paymentGatewayRegistrationsFunc">
            </v-switch>
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
          <v-btn class="marginLeft" color="blue darken-1" text @click.native="dialog = false" >
            close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
 
 <script>
 import {mapActions} from 'vuex';
 export default {
   name: 'OwnerPayment',
   props: ['owner'],
   data () {
     return {
      dialog: true,
      registrations: true,
      paypal: true,
      slip: true,
      bills: true,
      stripe: true,
     }
   },
   mounted () {
     for(let item of this.owner.configs){
       if(item.type == 'registrations'){
         this.registrations = item.status
       }
       if(item.type == 'billplz'){
         console.log("bilplz....",item.status)
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
   methods: {
    ...mapActions([
      'paymentGatewayPaypal',
      'paymentGatewayRegistration',
      'paymentGatewayStripe',
      'paymentGatewayBills',
      'paymentGatewaySlip'
    ]),
    paymentGatewaySlipFunc () {
      this.paymentGatewaySlip({ownerId:this.owner.id,configs:{bankslip: this.slip}});
    },
    paymentGatewayBillsFunc () {
      console.log({ownerId:this.owner.id,configs:{billplz: this.bills}})
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
 }
 </script>
 
 <style>
 
 </style>