<template>
   <div>
     <v-dialog v-model="dialog"  transition="dialog-bottom-transition" width="40%">
        <v-card>
          <v-card-title ><span class="headline blue--text"> Payment Gateway</span></v-card-title>
          <v-card-text>
            <br>
            <div>
              <v-switch v-model="slip" color="indigo" class="mx-2" 
                label="Bank slip upload" @change="paymentGatewaySlipFunc">
                </v-switch>
                <v-switch v-model="bills" color="indigo" class="mx-2" 
                label="Bills" @change="paymentGatewayBillsFunc">
                </v-switch>
                <v-switch v-model="stripe" color="indigo" class="mx-2" 
                label="Stripe" @change="paymentGatewayStripeFunc">
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
 export default {
   name: 'OwnerPayment',
   data () {
     return {
      dialog: true,
      slip: false,
      bills: false,
      stripe: false,
     }
   },
   methods: {
    paymentGatewaySlipFunc () {
      //console.log("slip clicked :",this.slip)
      this.paymentGatewaySlip(this.slip);
    },
    paymentGatewayBillsFunc () {
      this.paymentGatewayBills(this.bills);
    },
    paymentGatewayStripeFunc () {
      this.paymentGatewayStripe(this.stripe);
    },
   }
 }
 </script>
 
 <style>
 
 </style>