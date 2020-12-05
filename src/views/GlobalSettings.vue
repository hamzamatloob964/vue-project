<template>
  <div>
    <div class="toolbar pa-5">
      <Breadcrumb class="breadcrumb"/>
    </div>
    <div class="div-content">
      <div class="tenant-account pl-5 pr-5">
        <h3>Account Setups</h3>
        <v-switch v-model="tenanatAccount" color="indigo"
          :label="`${tenanatAccount? 'Disable': 'Enable'} tenant account setup`" @change="tenantAccountFunc">
        </v-switch>
        <v-switch v-model="ownerAccount" color="indigo"
          :label="`${ownerAccount? 'Disable': 'Enable'} owner account setup`" @change="ownerAccountFunc">
        </v-switch>
      </div>
      <div class="payment-gateway pl-5 pr-5">
        <h3>Payment Gateway </h3>
        <v-switch v-model="slip" color="indigo" class="mx-2" 
        label="Bank slip upload" @change="paymentGatewaySlipFunc">
        </v-switch>
        <v-switch v-model="billplz" color="indigo" class="mx-2" 
        label="Billplz" @change="paymentGatewayBillsFunc" >
        </v-switch>
        <v-switch v-model="stripe" color="indigo" class="mx-2" 
        label="Stripe" @change="paymentGatewayStripeFunc">
        </v-switch>
      </div>
      <div class="country pl-5 pr-5 ">
        <h3>Select Country </h3>
        <v-select
        class="select"
        color="blue"
        outlined
        v-model="country"
        :items="countriesList"
        label="Select Country"
        @change="selectCountry(country)"
        >
        </v-select>
      </div>
      <div class="add-bank pl-5 pr-5">
        <template >
          <v-toolbar flat color="white">
            <v-toolbar-title>Banks by Country</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="addBank">
              Add Bank</v-btn>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span v-if="showText" class="headline blue--text">Delete Bank</span>
                  <span v-if="showInput" class="headline blue--text">Add Bank</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-text-field v-if="showInput" v-model="editedItem.name" label="Bank name"></v-text-field>
                        <v-label v-if="showText"><span>Are you sure to delete this bank ?</span></v-label>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click.native="dialog = false">Cancel</v-btn>
                  <v-btn v-if="showText" color="blue darken-1" text @click="deleteSelectedItem">yes</v-btn>
                  <v-btn v-if="showInput" color="blue darken-1" text @click="save">Save</v-btn>
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
              @click="deleteItem (item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import {COUNTRIES} from '@/utils/resources'
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
      showInput: false,
      showText: false,
      slip: false,
      billplz: false,
      stripe: false,
      bank:'',
      country:'',
      selectedItem: '',
      tenanatAccount: false,
      ownerAccount: false,
      //items: ["asdad","adasda","asdasda"],
      dialog: false,
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
      countriesList: COUNTRIES,
      banksLst:[
        {country:'Albania',bank:['dasdas','asdasd','adada','asdasd']},
        {country:'Algeria',bank:['adsd','asda','asdasd','sada']},
        {country:'Angola',bank:['adads','adasd','asdas']}
      ]
    }
  },
  mounted () {
    this.getGlobalSettings().then(() => {
      this.tenanatAccount = this.globalSttings.registrations.tenant
      this.ownerAccount = this.globalSttings.registrations.owner
      this.stripe = this.globalSttings.payments.stripe
      this.billplz = this.globalSttings.payments.billplz
      this.slip = this.globalSttings.payments.bankslip
    })
  },
  methods: {
    ...mapActions([
      'getGlobalSettings',
      'globalTenantAccount',
      'globalOwnerAccount',
      'globalPaymentGatewaySlip',
      'globalPaymentGatewayBills',
      'globalPaymentGatewayStripe'
    ]),
    selectCountry (data) {
      this.banks = []
      for(let item of this.banksLst){
        if(item.country == data){
          for(let data of item.bank){
            let obj = {}
            obj.name = data
            this.banks.push(obj)
          }
        }
      }
    },
    showBankList () {
      this.showBanksList(this.country)
    },
    paymentGatewaySlipFunc () {
      this.globalPaymentGatewaySlip({payments:{bankslip:this.slip}});
    },
    paymentGatewayBillsFunc () {
      this.globalPaymentGatewayBills({payments:{billplz:this.billplz}});
    },
    paymentGatewayStripeFunc () {
      this.globalPaymentGatewayStripe({payments:{stripe:this.stripe}});
    },
    tenantAccountFunc () {
      this.globalTenantAccount({registrations:{tenant:this.tenanatAccount}});
    },
    ownerAccountFunc () {
      this.globalOwnerAccount({registrations:{owner:this.ownerAccount}});
    },

    addBank () {
      this.showText = false
      this.dialog = true
      this.showInput = true
    },
    // editItem (item) {
    //   this.showText = false
    //   this.showInput = true
    //   this.editedIndex = this.banks.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    //   this.dialog = true
    // },

    deleteItem (item) {
      this.showInput = false
      this.showText = true
      this.dialog = true;
      this.selectedItem = item;
    },

    deleteSelectedItem () {
      const index = this.banks.indexOf(this.selectedItem)
      this.banks.splice(index, 1);
      this.dialog = false;
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      this.banks.push(this.editedItem)
      // if (this.editedIndex > -1) {
      //   Object.assign(this.banks[this.editedIndex], this.editedItem)
      // } else {
      // }
      this.close()
    }
  },
  computed: {
    ...mapState([
      'banksList',
      'globalSttings'
    ]),
    formTitle () {
      return this.editedIndex === -1 ? 'Add Bank' : 'Edit Bank'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  }
}
</script>

<style scoped>
.div-content{
  display: flex;
  flex-direction: column;
}
.tenant-account{
  display: flex;
  flex-direction: column;
}
.payment-gateway{
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.country{
  display: flex;
  flex-direction: column;
}
.add-btn{
  height: 50px;
  width: 80px;
}
.select{
  margin-top: 5px;
}
.country-banks{
  width: 100%;
  margin-bottom: 10px;
}
.payment-btn{
  margin-left: 30px;
}
</style>