<template>
  <div>
    <div class="toolbar pa-5">
      <Breadcrumb class="breadcrumb"/>
    </div>
    <div class="div-content">
      <div class="tenant-account pl-5 pr-5">
        <h3>Disable Account </h3>
        <v-switch v-model="tenanatAccount" color="indigo"
          label="Disable tenant account setup">
        </v-switch>
        <v-switch v-model="ownerAccount" color="indigo"
          label="Disable owner account setup">
        </v-switch>
      </div>
      <div class="payment-gateway pl-5 pr-5">
        <h3>Payment Gateway </h3>
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
      <div class="country pl-5 pr-5 ">
        <h3>Select Country </h3>
        <v-select
        class="select"
        color="blue"
        outlined
        v-model="country"
        :items="countriesList"
        label="Select Country"
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
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </div>
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
      showInput: false,
      showText: false,
      slip: false,
      bills: false,
      stripe: false,
      bank:'',
      country:'',
      selectedItem: '',
      tenanatAccount: false,
      ownerAccount: false,
      items: ["asdad","adasda","asdasda"],
      dialog: false,
      dialog2: false,
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
      countriesList: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua & Deps",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Central African Rep",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Congo {Democratic Rep}",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "East Timor",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland {Republic}",
        "Israel",
        "Italy",
        "Ivory Coast",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea North",
        "Korea South",
        "Kosovo",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar, {Burma}",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russian Federation",
        "Rwanda",
        "St Kitts & Nevis",
        "St Lucia",
        "Saint Vincent & the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome & Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Togo",
        "Tonga",
        "Trinidad & Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe"
      ],
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
      this.showText = false
      this.dialog = true
      this.showInput = true
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
      //console.log(item);
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
    this.initialize()
  },
  mounted () {
  }
}
</script>

<style scoped>
.div-content{
  height: 443px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
/* .main{
  display: flex;
  flex-direction: column;
  height: 425px;
} */
/* .payment{
  background-color: red;
  height: 60px;
  display: flex;
} */
.add-bank{
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
  /* margin-left: 30px; */
  /* align-self:center; */
  /* width: 520px; */
}
.country-banks{
  /* height: 108px; */
  width: 100%;
  margin-bottom: 10px;
  /* overflow-y: scroll; */
}
.payment-btn{
  margin-left: 30px;
}
/* .switch{
  margin-top: 0px;
  margin-left: 30px;
} */
</style>