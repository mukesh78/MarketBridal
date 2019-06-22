<template>
  <v-container fill-height>
    <v-layout row class="centerScreen">
      <v-flex xs12 sm10 md6 xl4>
        <v-card>
          <v-toolbar dark color="primary">
            <v-spacer></v-spacer>
            <img src="@/assets/Brid.al.png" width="100">
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-flex>
            <v-card-text class="text-xs-center text-sm-center text-md-center text-lg-center">
              <p class="font-weight-regular display-1 ma-0">Let's get started</p>
              <p style="opacity:0.6" class="subheading mt-2 mb-0">Add your bridal store</p>
            </v-card-text>
          </v-flex>
          <v-flex xs12 ml-4 mr-4 mb-4 mt-0>
            <v-form
              ref="create_store_form"
              @submit.prevent="create()"
              v-model="valid"
              lazy-validation
            >
              <v-container grid-list-sm pa-0>
                <v-layout row wrap class="pl-3 pr-3 pt-1 pb-1 mb-3 grey lighten-5">
                  <v-flex xs12>
                    <v-text-field
                      name="company_name"
                      label="Company Name"
                      id="company-name"
                      v-model="form.companyName"
                      :rules="rules.companyName"
                      type="text"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4 v-if="!manualAddress">
                    <v-text-field
                      v-model="form.postcode"
                      label="Postcode"
                      browser-autocomplete="new-password"
                      required
                      :rules="rules.requiredRules"
                    >
                      <v-btn
                        small
                        class="mt-0"
                        slot="append"
                        icon
                        color="secondary"
                        @click="findAddress()"
                        :disabled="!validatePostcode"
                      >
                        <v-icon>search</v-icon>
                      </v-btn>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs8 pt-0 pb-0>
                    <v-switch
                      v-model="manualAddress"
                      label="Manual Address"
                      style="margin-top:30px;margin-left:10px"
                    ></v-switch>
                  </v-flex>
                  <v-flex xs12 pt-0 pb-0 v-if="!manualAddress">
                    <v-autocomplete
                      v-model="chosenAddress"
                      small
                      :items="addresses"
                      browser-autocomplete="new-password"
                      label="Address"
                      required
                      :rules="rules.address"
                      ref="addresses"
                      :menu-props="{value: autoselectMenu, closeOnClick:true, closeOnContentClick:true, openOnClick:true}"
                      :loading="address.loading"
                    ></v-autocomplete>
                  </v-flex>

                  <!-- </v-layout> -->
                  <v-flex xs12 pt-0 pb-0 v-if="manualAddress">
                    <v-text-field
                      v-model="form.address"
                      label="Address"
                      required
                      :rules="rules.address"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 pt-0 pb-0 v-if="manualAddress">
                    <v-text-field v-model="form.city" label="City" required :rules="rules.city"></v-text-field>
                  </v-flex>
                  <v-flex xs6 pt-0 pb-0 v-if="manualAddress">
                    <v-text-field
                      v-model="form.postcode"
                      label="Postcode"
                      required
                      :rules="rules.postcode"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      name="store-name"
                      label="Store Name"
                      id="store-name"
                      v-model="form.storeName"
                      :rules="rules.storeName"
                      hint="Use the city/town/village that represents the location of your store"
                      persistent-hint
                      type="text"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      name="phone"
                      label="Store Phone"
                      id="phone"
                      v-model="form.phone"
                      :rules="rules.phone"
                      type="text"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Store Email"
                      id="email"
                      v-model="form.email"
                      :rules="rules.email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-btn
                    block
                    color="info"
                    type="submit"
                    :loading="status.creatingCompany"
                    :disabled="status.creatingCompany"
                  >Set up my account</v-btn>
                </v-layout>
                <p
                  class="text-xs-center pa-3"
                  style="opacity:0.4"
                >Don't worry, you can change all of this later</p>
              </v-container>
            </v-form>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      valid: false,
      form: {
        companyName: null,
        address: null,
        city: null,
        postcode: null,
        storeName: null,
        phone: null,
        email: null
      },
      addresses: [],
      chosenAddress: null,
      manualAddress: false,
      autoselectMenu: false,
      rules: {
        companyName: [v => !!v || "Company name is required"],
        address: [v => !!v || "Address is required"],
        city: [v => !!v || "City is required"],
        postcode: [v => !!v || "Postcode is required"],
        storeName: [v => !!v || "Store name is required"],
        phone: [v => !!v || "Phone is required"],
        email: [
          v => !!v || "Email name is required",
          v => /.+@.+/.test(v) || "Email must be valid"
        ]
      }
    };
  },
  computed: {
    ...mapState("account", ["status"]),
    ...mapState({
      alert: state => state.alert
    }),
    ...mapState({
      address: state => state.address
    }),
    validatePostcode() {
      const postcodeRegex = /^[A-Z]+[0-9]+[A-Z]+$/
      return postcodeRegex.test(this.form.postcode);
    }
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    },
    chosenAddress(value) {
      if (value) {
        var arr = value.split(",");
        console.log(arr);
        var address = "";
        var i;
        for (i = 0; i < 5; i++) {
          if (arr[i] != " ") {
            if (address == "") {
              address += arr[i];
            } else {
              address += "," + arr[i];
            }
          }
        }
        this.form.address = address;
        this.form.city = arr[5];
        console.log(this.form.address);
        console.log(this.form.city);
      } else {
        (this.form.address = ""), (this.form.city = "");
      }
    },
    'form.postcode': function (value){
      var postcode = value.replace(/[^a-zA-Z0-9]/g, '')
        this.form.postcode = postcode.toUpperCase()
    },
    'form.storeName': function (value){
        this.form.storeName = this.toUpper(value)
    },
    'form.companyName': function (value){
        this.form.companyName = this.toUpper(value)
    }
  },
  methods: {
    ...mapActions("account", ["createCompany"]),
    ...mapActions({
      clearAlert: "alert/clear"
    }),
    ...mapActions("address", ["fetchAddress"]),
    findAddress() {
      this.fetchAddress(this.form.postcode).then(addresses => {
        this.addresses = addresses;
        this.autoselectMenu = true;
      });
    },
    create() {
      if (this.$refs.create_store_form.validate()) {
        this.createCompany(this.form);
      }
    }
  }
};
</script>