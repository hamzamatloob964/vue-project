<template>
  <div>
    <div class="pa-5 ">
      <template>
        <div class="toolbar">
          <Breadcrumb class="breadcrumb" />
          <!-- <div class="search"> -->
          <v-text-field
          class="mt-5 mx-4"
          flat
          v-model="searchOwnerName"
          label="Search"
          append-icon="mdi-magnify"
          @click:append = "searchFunc"
          solo-inverted
          clearable
          ></v-text-field>
          <!-- </div> -->
          <v-btn
            outlined color="orange"
            @click.stop="dialog = true"
            class="add-btn"
          >
            Add Owner
          </v-btn>
        </div>
      </template>
    </div>
    <div class="card-main pa-5">
      <template>
        <v-card
          class="card"
          outlined
          max-width="300"
          height="400"
          v-for="(item,i) in ownerList" :key="i"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>{{item.name}}</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0"><v-icon>mdi-cellphone-basic</v-icon>  
          {{item.pNumber}}</v-card-subtitle>
          <v-card-text class="text text--primary">
            <div>No of Properties : {{item.noProperty}}</div>
            <div>No of Tenants : {{item.noTenants}}</div>
            <div>Total Rent : ${{item.rent}}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              outlined color="orange"
              class="suspend-btn"
              @click.stop="dialog2 = true"
            >
              Suspend Owner
            </v-btn>
            <v-btn
              class="payment-btn"
              outlined color="orange"
              @click.stop="dialog3 = true"
            >
              payment 
            </v-btn>
          </v-card-actions>
            <!-- <v-switch v-model="mandatory" color="indigo" class="mx-2" 
            label="Payment Gateway">
            </v-switch> -->
        </v-card>
      </template>
      <v-app id="inspire">
        <v-dialog v-model="dialog"  transition="dialog-bottom-transition" width="40%">
          <v-card>
            <v-toolbar color="#0082ca">
              <v-toolbar-title ><h4 style="color:white;"> ADD OWNER</h4></v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <br>
              <v-text-field label="Enter Phone Number" v-model="ownerPNumber">
              </v-text-field>
              
            </v-card-text>
            <v-card-actions>
              <v-btn color="#0082ca"  class="white--text" @click="addOwnerFunc">
                Submit</v-btn>
              <v-btn color="#0082ca" @click.native="dialog = false" class="white--text">
                close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app>

      <v-app >
        <v-dialog v-model="dialog2"  transition="dialog-bottom-transition" width="40%">
          <v-card>
            <v-toolbar color="#0082ca">
              <v-toolbar-title ><h4 style="color:white;"> SUSPEND OWNER</h4></v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <br>
              <v-label><span>Are you sure to suspend owner ?</span></v-label>
              
            </v-card-text>
            <v-card-actions>
              <v-btn color="#0082ca" class="white--text" @click="suspendOwnerFunc">
                Yes</v-btn>
              <v-btn color="#0082ca" @click.native="dialog2 = false" class="white--text">
                close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app>

      <v-app >
        <v-dialog v-model="dialog3"  transition="dialog-bottom-transition" width="40%">
          <v-card>
            <v-toolbar color="#0082ca">
              <v-toolbar-title ><h4 style="color:white;"> Payment Gateway</h4></v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <br>
              <div>
                <v-switch v-model="slip" color="indigo" class="mx-2" 
                label="Bank slip upload" @click="paymentGatewaySlipFunc">
                </v-switch>
                <v-switch v-model="bills" color="indigo" class="mx-2" 
                label="Bills" @click="paymentGatewayBillsFunc">
                </v-switch>
                <v-switch v-model="stripe" color="indigo" class="mx-2" 
                label="Stripe" @click="paymentGatewayStripeFunc">
                </v-switch>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="#0082ca" @click.native="dialog3 = false" class="white--text">
                close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import {mapActions} from 'vuex';
import {mapState} from 'vuex';
export default {
  data () {
    return {
      ownerPNumber:'',
      searchOwnerName:'',
      arry :[1,2,3,4,5],
      dialog: false,
      dialog2: false,
      dialog3: false,
      slip: false,
      bills: false,
      stripe: false
    }
  },
  components: {
    Breadcrumb
  },
  methods: {
    ...mapActions([
      'addOwner',
      'searchOwner',
      'suspendOwner',
      'paymentGatewayStripe',
      'paymentGatewayBills',
      'paymentGatewaySlip'
    ]),
    searchFunc () {
      this.searchOwner(this.searchOwnerName)
      console.log("router route is :",this.$route.matched)
    },
    addOwnerFunc () {
      this.addOwner(this.ownerPNumber);
    },
    suspendOwnerFunc (item) {
      this.suspendOwner(item);
    },
    paymentGatewaySlipFunc () {
      this.paymentGatewaySlip(this.slip);
    },
    paymentGatewayBillsFunc () {
      this.paymentGatewayBills(this.bills);
    },
    paymentGatewayStripeFunc () {
      this.paymentGatewayStripe(this.stripe);
    },
  },
  computed: {
    ...mapState([
      'ownerList'
    ]),
  }
}
</script>

<style scoped>
.card-main {
  height: 395px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
}
.card {
  margin-right: 15px;
  margin-bottom: 15px;
}
.text {
  margin-top: 5px;
}
.add-btn{
  margin-left: auto;
  margin-top: 25px;
}
.search {
  width: 500px;
  
  margin-top: 20px;
}
.suspend-btn{
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 10px;
}
.payment-btn{
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
}
</style>