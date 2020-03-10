<template>
  <div class="main">
    <div class="pa-5 ">
      <div class="toolbar">
        <Breadcrumb class="breadcrumb" />
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
        <v-btn
          outlined color="blue"
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
        :items="owners"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:item.action="{item}">
          <v-icon
            small
            class="mr-2"
            @click="paymentGateway(item)"
          >
            mdi-cash-multiple
          </v-icon>
          <v-icon
            small
            @click="suspendCurrentOwner(item)"
          >
            mdi-account-remove
          </v-icon>
        </template>
      </v-data-table>
    </div>
    <AddOwner v-for="(item,i) in showAddDialog" :key="'add'+i"/>
    <OwnerPayment :owner="currentOwner" v-for="(item,i) in showPaymentDialog" :key="'pay'+i"/>
    <SuspendOwner :owner="currentOwner" v-for="(item,i) in showSuspendDialog" :key="'susp'+i"/>
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
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'PhoneNo',
          align: 'left',
          sortable: false,
          value: 'phoneNo',
        },
        {
          text: 'Properties',
          align: 'left',
          sortable: false,
          value: 'properties',
        },
        {
          text: 'Tenants',
          align: 'left',
          sortable: false,
          value: 'tenants',
        },
        {
          text: 'Total Rent',
          align: 'left',
          sortable: false,
          value: 'totalRent',
        },
        { text: 'Actions', value: 'action', sortable: false, align: 'right', },
      ],
      owners: [],
      currentOwner:{}
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
    this.getOwners().then(() =>{
      this.owners = [...this.ownersList]
    }).catch(err => {
      console.log("err : ",err)
    })
  },
  methods: {
    ...mapActions([
      'getOwners',
      'addOwner',
      'searchOwner',
      'suspendOwner',
      'paymentGatewayStripe',
      'paymentGatewayBills',
      'paymentGatewaySlip',
    ]),
    searchFunc () {
      this.searchOwner(this.searchOwnerName)
    },
    addOwnerFunc () {
      this.showAddDialog.push(1)
    },
    paymentGateway (item) {
      this.currentOwner = {}
      this.showPaymentDialog.push(1)
      this.currentOwner = item
    },
    suspendCurrentOwner (item) {
      this.currentOwner = {}
      this.showSuspendDialog.push(1)
      this.currentOwner = item
    }
  },
  computed: {
    ...mapState([
      'ownersList'
    ]),
  },
  watch:{
    ownersList() {
      this.owners = [...this.ownersList]
    }
  }
}
</script>

<style scoped>
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