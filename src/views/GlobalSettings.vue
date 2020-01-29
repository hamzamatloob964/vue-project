<template>
  <div>
    <div class="toolbar pa-5">
      <Breadcrumb class="breadcrumb"/>
    </div>
    <div class="tenant-account pl-5 pr-5">
      <v-switch v-model="tenanatAccount" color="indigo" class="switch mx-2" 
        label="Allow or disable new tenant account setup">
      </v-switch>
      <v-btn
        color="green white--text"
        class="payment-btn"
        @click.stop="dialog3 = true"
        @click="disableTenantAccountFunc"
      >
        payment Gateway 
      </v-btn>
      <v-dialog v-model="dialog3"  transition="dialog-bottom-transition" width="40%">
        <v-card>
          <v-toolbar color="#0082ca">
            <v-toolbar-title ><h4 style="color:white;"> Global Payment Gateway</h4></v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <br>
            <div>
              <v-switch v-model="slip" color="indigo" class="mx-2" 
              label="Bank slip upload" @click="paymentGatewaySlipFunc">
              </v-switch>
              <v-switch v-model="bills" color="indigo" class="mx-2" 
              label="Bills" @click="paymentGatewayBillsFunc" >
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
      <div class="select">
        <v-select
        color="blue"
        outlined
        v-model="country"
        :items="countriesList"
        label="Select Country"
        >
        </v-select>
      </div>
    </div>
    <div class="add-bank pl-5 pr-5">
      <template >
        <v-toolbar flat color="white">
          <v-toolbar-title>Banks by Country</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Add Bank</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="editedItem.name" label="Bank name"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </div>
    <div class="country-banks pl-5 pr-5">
      <v-data-table
        :headers="headers"
        :items="banks"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import {mapActions} from 'vuex';
import {mapState} from 'vuex';
export default {
  name:'GlobalSettings',
  components: {
    Breadcrumb
  },
  data () {
    return {
      banks:[],
      slip: false,
      bills: false,
      stripe: false,
      select:'',
      country:'',
      tenanatAccount: false,
      items: ['asdad','adasda','asdasda'],
      dialog: false,
      dialog3: false,
      headers: [
        {
          text: 'Bank Names',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Actions', value: 'action', sortable: false, align: 'right', },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
    }
  },
  methods: {
    ...mapActions([
      'disableTenantAccount',
      'globalPaymentGatewaySlip',
      'paymentGatewayBillsFunc',
      'paymentGatewayStripeFunc'
    ]),
    showBankList () {
      this.showBanksList(this.country)
    },
    paymentGatewaySlipFunc () {
      this.globalPaymentGatewaySlip(this.slip);
    },
    paymentGatewayBillsFunc () {
      this.globalPaymentGatewayBills(this.bills);
    },
    paymentGatewayStripeFunc () {
      this.globalPaymentGatewayStripe(this.stripe);
    },
    disableTenantAccountFunc () {
      this.disableTenantAccount();
    },
    addBank () {
      console.log('called');
      console.log(this.select);
      this.items.push(this.select);
      console.log("add func called!",this.select)
    },
    initialize () {
      this.banks = [
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
      ]
    },

    editItem (item) {
      this.editedIndex = this.banks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.banks.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.banks.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.banks[this.editedIndex], this.editedItem)
      } else {
        this.banks.push(this.editedItem)
      }
      this.close()
    },
  },
  computed: {
    ...mapState([
      'countriesList',
      'banksList'
    ]),
    formTitle () {
      return this.editedIndex === -1 ? 'Add Bank' : 'Edit Bank'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  created () {
    console.log("this is created !!!!!!")
    this.initialize()
  }
}
</script>

<style scoped>
.main{
  display: flex;
  flex-direction: column;
  height: 425px;
}
.payment{
  background-color: red;
  height: 60px;
  display: flex;
}
.add-bank{
}
.tenant-account{
  display: flex;
  flex-wrap: wrap;
}
.add-btn{
  height: 50px;
  width: 80px;
}
.select{
  width: 320px;
  margin-left: auto;
}
.country-banks{
  height: 290px;
  width: 100%;
  overflow-y: scroll;
}
.payment-btn{
  margin-top: 13px;
  margin-left: 5px;margin-bottom: 5px;
}
</style>