<template>
  <div class="main">
    <div class="pa-5 ">
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
          @click="addOwnerFunc"
          class="add-btn"
        >
          Add Owner
        </v-btn>
      </div>
    </div>
    <div class="card-main pl-5 pr-5">
      <v-data-table
        :headers="headers"
        :items="banks"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:item.action="{ }">
          <v-icon
            small
            class="mr-2"
            @click="paymentGateway"
          >
            mdi-cash-multiple
          </v-icon>
          <v-icon
            small
            @click="suspendOwner"
          >
            mdi-account-remove
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
    <AddOwner v-for="(item,i) in showAddDialog" :key="i"/>
    <OwnerPayment v-for="(item,i) in showPaymentDialog" :key="i"/>
    <SuspendOwner v-for="(item,i) in showSuspendDialog" :key="i"/>
    <!-- <v-app id="inspire">
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
    </v-app>

    <v-app >
      <v-dialog v-model="dialog2"  transition="dialog-bottom-transition" width="40%">
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
              <v-btn color="blue darken-1" text @click.native="dialog2 = false">
                close</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>

    <v-app >
      <v-dialog v-model="dialog3"  transition="dialog-bottom-transition" width="40%">
        <v-card>
          <v-card-title ><span class="headline blue--text"> Payment Gateway</span></v-card-title>
          <v-card-text>
            <br>
            <div>
              <v-switch v-model="slip" color="indigo" class="mx-2" 
              label="Bank slip upload" @click="paymentGatewaySlipFunc">
              </v-switch>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn class="marginLeft" color="blue darken-1" text @click.native="dialog3 = false" >
              close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app> -->
  </div>
</template>

<script>
import AddOwner from '../components/dialogs/AddOwner'
import SuspendOwner from '../components/dialogs/SuspendOwner'
import OwnerPayment from '../components/dialogs/OwnerPayment'
import Breadcrumb from '@/components/Breadcrumb'
import {mapActions} from 'vuex';
import {mapState} from 'vuex';
import '../assets/App.css'
export default {
  data () {
    return {
      ownerPNumber:'',
      searchOwnerName:'',
      arry :[1,2,3,4,5],
      showAddDialog: [],
      showPaymentDialog: [],
      showSuspendDialog: [],
      banks:[
        {
          name: 'Jelly bean',
        },
        {
          name: 'Lollipop'
        },
        {
          name: 'Honeycomb'
        },
        {
          name: 'Donut',
        },
        {
          name: 'KitKat'
        },
      ],
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
          value: 'name',
        },
        {
          text: 'Properties',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Tenants',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Total Rent',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Actions', value: 'action', sortable: false, align: 'right', },
      ],
    }
  },
  components: {
    Breadcrumb,
    AddOwner,
    OwnerPayment,
    SuspendOwner
  },
  mounted () {
    this.showAddDialog = []
    this.showPaymentDialog = []
    this.showSuspendDialog = []
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
      this.showAddDialog.push(1)
      //this.addOwner(this.ownerPNumber);
    },
    paymentGateway () {
      this.showPaymentDialog.push(1)
    },
    suspendOwner () {
      this.showSuspendDialog.push(1)
    }
    // paymentGatewaySlipFunc () {
    //   //console.log("slip clicked :",this.slip)
    //   this.paymentGatewaySlip(this.slip);
    // },
    // paymentGatewayBillsFunc () {
    //   this.paymentGatewayBills(this.bills);
    // },
    // paymentGatewayStripeFunc () {
    //   this.paymentGatewayStripe(this.stripe);
    // },
  },
  computed: {
    ...mapState([
      'ownerList'
    ]),
  }
}
</script>

<style scoped>
.main{
  /* height: 600px; */
  /* background-color: blue; */
}
.card-main {
  height: 399px;
  width: 100%;
  overflow-y: auto;
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
  margin: 20px;
}
.payment-btn{
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
}
.country-banks{
  height: 180px;
  width: 100%;
  overflow-y: scroll;
}
</style>