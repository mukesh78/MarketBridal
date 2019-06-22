<template>
  <v-card>
    <v-card dark color="primary">
      <v-toolbar flat color="transparent" height="45">
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn v-if="!newObj" slot="activator" flat icon @click="remove()">
            <v-icon>delete</v-icon>
          </v-btn>
          <span>Delete</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn v-if="newObj" slot="activator" flat icon @click="save()">
            <v-icon>save</v-icon>
          </v-btn>
          <span>Save Draft</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn slot="activator" flat icon @click="reset()">
            <v-icon>replay</v-icon>
          </v-btn>
          <span>Reset</span>
        </v-tooltip>
        <v-btn flat icon @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title
        class="display-1 justify-center"
        primary-title
        style="padding-top: 0px; padding-bottom:10px; opacity:0.6"
        v-text="newObj ? 'New ' + title: 'Update ' + title"
      ></v-card-title>
    </v-card>

    <v-card flat class="pa-0 ma-0">
      <v-stepper v-model="tab" alt-labels non-linear>
        <v-stepper-header>
          <v-stepper-step :complete="tab > 1" editable step="1">Customer Details</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="tab > 2" editable step="2">Sale Items</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="tab > 3" editable step="3">Payment Details</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card color="grey lighten-5" class="mb-1" flat>
              <v-form ref="form1" lazy-validation>
                <v-container>
                  <v-layout row wrap>
                    <v-flex xs8 pt-0 pb-0>
                      <v-autocomplete
                        v-model="sale.employee"
                        :items="employees"
                        item-text="name"
                        label="Employee"
                        persistent-hint
                        clearable
                        required
                        :rules="rules.requiredRules"
                        return-object
                      >
                        <v-btn
                          small
                          class="mt-0"
                          slot="append-outer"
                          icon
                          color="secondary"
                          @click="newEmployee()"
                        >
                          <v-icon small>add</v-icon>
                        </v-btn>
                      </v-autocomplete>
                    </v-flex>
                    <v-flex xs4 pt-0 pb-0>
                      <v-menu
                        ref="dateMenu"
                        :close-on-content-click="false"
                        v-model="saleMenu"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="formattedDate"
                          :rules="rules.requiredRules"
                          label="Sale Date"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker
                          first-day-of-week="1"
                          v-model="sale.date"
                          @change="saveDate"
                          ref="dobPicker"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 pt-0 pb-0>
                      <v-text-field
                        v-model="sale.name"
                        label="Name"
                        required
                        :rules="rules.requiredRules"
                      ></v-text-field>
                    </v-flex>
                    <!-- <v-layout row> -->

                    <v-flex xs4 v-if="!manualAddress">
                      <v-text-field
                        v-model="sale.postcode"
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
                        style="margin-top:30px"
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
                        :rules="rules.requiredRules"
                        ref="addresses"
                        :menu-props="{value: autoselectMenu, closeOnClick:true, closeOnContentClick:true, openOnClick:true}"
                        :loading="address.loading"
                      ></v-autocomplete>
                    </v-flex>

                    <!-- </v-layout> -->
                    <v-flex xs12 pt-0 pb-0 v-if="manualAddress">
                      <v-text-field
                        v-model="sale.address"
                        label="Address"
                        required
                        :rules="rules.requiredRules"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 pt-0 pb-0 v-if="manualAddress">
                      <v-text-field
                        v-model="sale.city"
                        label="City"
                        required
                        :rules="rules.requiredRules"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 pt-0 pb-0 v-if="manualAddress">
                      <v-text-field
                        v-model="sale.postcode"
                        label="Postcode"
                        required
                        :rules="rules.requiredRules"
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        v-model="sale.phone"
                        label="Phone"
                        required
                        :rules="rules.phoneRules"
                      ></v-text-field>
                    </v-flex>
                    <v-flex style="max-width:200px">
                      <v-menu
                        ref="weddingDateMenu"
                        :close-on-content-click="false"
                        v-model="weddingMenu"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="formattedWeddingDate"
                          :rules="rules.requiredRules"
                          label="Wedding Date"
                          prepend-icon="event"
                          readonly
                          style="max-width:200px"
                        ></v-text-field>
                        <v-date-picker
                          first-day-of-week="1"
                          v-model="sale.weddingDate"
                          @change="saveWeddingDate"
                          ref="weddingDatePicker"
                          :min="new Date().toISOString().substr(0, 10)"
                          :max="maxWeddingDate"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 pt-0 pb-0>
                      <v-text-field 
                      v-model="sale.email"
                      label="Email"
                      :rules="sale.email === '' ? [] : rules.emailRules"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card color="grey lighten-5" class="mb-1" flat>
              <v-form ref="form2" lazy-validation>
                <v-container>
                  <v-subheader class="pr-0">
                    Sale Items
                    <v-btn small class="mt-0" icon color="secondary">
                      <v-icon small>add</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-0" dark color="primary" @click="newSaleItem">Add Sale Item</v-btn>
                  </v-subheader>
                  <v-divider></v-divider>
                  <sale-item
                    v-for="(saleItem, index) in sale.saleItems"
                    :key="index"
                    :item="saleItem"
                    :index="index"
                    :categories="categories"
                    v-on:removeSaleItem="removeSaleItem"
                    v-on:sumItems="sumItems"
                  ></sale-item>
                  <v-layout ma-0 pt-2 row v-if="repayment != null">
                    <v-subheader>Total</v-subheader>
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="sale.total"
                      label="Solo"
                      single-line
                      solo
                      readonly
                      prefix="£"
                      style="height:60px; max-width:100px;"
                    ></v-text-field>
                  </v-layout>
                  <v-divider></v-divider>
                </v-container>
              </v-form>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card color="grey lighten-5" class="mb-1" flat>
              <v-form ref="form3" lazy-validation>
                <v-container>
                  <v-layout ma-0 pt-2 row v-if="repayment != null">
                    <v-subheader>Total</v-subheader>
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="sale.total"
                      label="Solo"
                      single-line
                      solo
                      readonly
                      prefix="£"
                      style="height:60px; max-width:100px;"
                    ></v-text-field>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout row align-center justify-end>
                    <v-subheader>Payment</v-subheader>
                    <v-spacer></v-spacer>
                    <!-- <div style="float:right"> -->
                    <v-radio-group
                      v-model="sale.payment"
                      row
                      required
                      :rules="rules.yesNoRules"
                      :readonly="checkForSaleItems"
                    >
                      <v-radio label="Pay In Full" :value="true"></v-radio>
                      <v-radio label="Deposit" :value="false"></v-radio>
                    </v-radio-group>
                    <v-select
                      v-model="sale.paymentType"
                      :items="paymentTypes"
                      required
                      :rules="rules.yesNoRules"
                      solo
                      style="max-width:150px"
                      class="mt-2"
                    ></v-select>
                    <!-- </div> -->
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout ma-0 pt-2 row v-if="sale.payment==false">
                    <v-subheader>Deposit</v-subheader>
                    <v-spacer></v-spacer>
                    <div>
                      <v-text-field
                        v-model="sale.deposit"
                        solo
                        type="number"
                        placeholder="0.00"
                        prefix="£"
                        style="height:60px; max-width:100px"
                      ></v-text-field>
                    </div>
                  </v-layout>
                  <v-layout ma-0 pa-0 row v-if="sale.payment==false">
                    <v-subheader>Balance</v-subheader>
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="sale.balance"
                      label="Solo"
                      single-line
                      solo
                      readonly
                      prefix="£"
                      style="height:60px; max-width:100px;"
                    ></v-text-field>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-subheader class="mt-2" v-if="sale.payment==false">
                    Repayment
                    <v-spacer></v-spacer>

                    <div style="float:right;">
                      <v-radio-group
                        v-model="sale.repayment"
                        row
                        required
                        :rules="rules.yesNoRules"
                      >
                        <v-radio label="Pay on Collection" :value="true"></v-radio>
                        <v-radio label="Installments" :value="false"></v-radio>
                        <v-select
                          v-model="sale.installments"
                          :items="installmentItems"
                          hide-details
                          solo
                          style="max-width:50px"
                          v-if="sale.repayment !== null"
                          :readonly="sale.repayment"
                        ></v-select>
                      </v-radio-group>
                    </div>
                  </v-subheader>
                  <v-spacer></v-spacer>
                  <v-form ref="form4">
                    <v-data-table
                      :headers="headers"
                      :items="sale.paymentItems"
                      class="elevation-1"
                      hide-actions
                      v-if="sale.repayment !== null"
                      select="false"
                      :pagination.sync="pagination"
                    >
                      <template slot="headers" slot-scope="props">
                        <tr>
                          <th>Fixed</th>
                          <th
                            v-for="header in props.headers.slice(1,-1)"
                            :key="header.text"
                          >{{ header.text }}</th>
                          <th>
                            <v-checkbox
                              v-model="endOfMonth"
                              label="End Of Month"
                              class="mt-4 mb-0 pa-0"
                            ></v-checkbox>
                          </th>
                        </tr>
                      </template>
                      <template slot="items" slot-scope="props">
                        <tr>
                          <td>
                            <v-checkbox v-model="props.item.fixed" primary hide-details></v-checkbox>
                          </td>
                          <td class="text-xs-center" style="padding: 0px">
                            <v-chip
                              class="removePadding"
                              label
                              disabled
                              text-color="black"
                              color="rgba(0, 0, 0, 0)"
                            >{{ props.item.no }}</v-chip>
                          </td>
                          <td class="text-xs-center" style="padding: 0px">
                            <v-text-field
                              v-model="props.item.amount"
                              type="number"
                              single-line
                              solo
                              prefix="£"
                              hide-details
                              flat
                              style="max-width:100px"
                              background-color="transparent"
                              :readonly="sale.installments < 2"
                              class="inputPrice"
                              v-on:keyup.native="modifiedPayment(props.item)"
                              v-on:keydown.native="beenValidated = false"
                              :rules="[validate]"
                            ></v-text-field>
                          </td>
                          <td class="text-xs-center" style="padding: 0px">
                            <v-text-field
                              v-model="props.item.formattedDate"
                              single-line
                              solo
                              hide-details
                              flat
                              background-color="transparent"
                            ></v-text-field>
                          </td>
                        </tr>
                      </template>
                      <template slot="no-data">
                        <v-alert :value="true" color="error" icon="warning">No Payments</v-alert>
                      </template>
                      <template slot="footer" v-if="installmentsError && beenValidated == true">
                        <td :colspan="headers.length">
                          <v-alert
                            :value="true"
                            color="error"
                            icon="warning"
                          >{{ installmentsError }}</v-alert>
                        </td>
                      </template>
                    </v-data-table>
                  </v-form>
                  <v-combobox
                    v-model="sale.comments"
                    :items="commentItems"
                    label="Comments"
                    chips
                    clearable
                    multiple
                    solo
                    required
                    class="mt-3"
                  >
                    <template slot="selection" slot-scope="data" style="padding:20px;">
                      <v-card color="grey lighten-3" class="ma-1 pa-1">{{ data.item }}</v-card>
                    </template>
                  </v-combobox>
                </v-container>
              </v-form>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
        <v-card flat class="pl-4 pr-4 pb-2">
          <v-btn
            block
            color="secondary"
            @click="submit()"
            v-text="tab < 3 ? 'CONTINUE' : newObj ? 'SUBMIT': 'UPDATE'"
          ></v-btn>
        </v-card>
      </v-stepper>
    </v-card>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import rules from "@/components/rules.js";
import saleItem from "./saleitem.vue";

export default {
  props: ["newObj", "sale", "editingSaved"],
  components: {
    "sale-item": saleItem
  },
  data() {
    return {
      title: "Sale",
      rules: rules,
      tab: 1,
      payment: false,
      repayment: true,
      saleMenu: false,
      weddingMenu: false,
      weddingDate: new Date().toISOString().substr(0, 10),
      paymentTypes: [],
      employees: [],
      categories: [],
      tmpPaymentItems: [],
      addresses: [],
      chosenAddress: null,
      manualAddress: false,
      autoselectMenu: false,
      commentItems: [
        "Alterations NOT INCLUDED",
        "Price guide provided at point of purchase",
        "All items are sold as seen and it is agreed that any loose threads or beads etc. will  be repaired by Elite free of charge during the final preparation process",
        "Customer does not qualify for any other offers advertised Instore/online Due to minimum spend or dress reduction",
        "small comment"
      ],
      paymentTypes: ["Debit Card", "Credit Card", "Cash", "Credit Note"],
      headers: [
        { text: "Fix", value: "fixed", align: "left" },
        { text: "Installments", value: "no", align: "center" },
        { text: "Amount (£)", value: "size", align: "left" },
        { text: "Date", value: "colour", align: "center" }
      ],
      dateOptions: {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
      },
      endOfMonth: false,
      pagination: {
        sortBy: "Installments"
      },
      installmentsError: null,
      beenValidated: false
    };
  },
  watch: {
    'sale.postcode': function (value){
      var postcode = value.replace(/[^a-zA-Z0-9]/g, '')
        this.sale.postcode = postcode.toUpperCase()
    },
    'sale.name': function (value){
        this.sale.name = this.toUpper(value)
    },
    "sale.total": function(value) {
      this.sale.balance = this.sale.total - this.sale.deposit;
    },
    "sale.deposit": function(value) {
      this.sale.balance = this.sale.total - this.sale.deposit;
    },
    "sale.saleItems": function(value) {
      this.sumItems();
    },
    "sale.payment": function(value) {
      if (value) {
        this.sale.deposit = this.sale.total;
        this.sale.repayment = null;
        this.sale.paymentItems = [];
      } else {
        this.sale.deposit = this.sale.total / 2;
      }
    },
    "sale.repayment": function(value) {
      if (value) {
        this.sale.installments = 1;
      } else {
        this.sale.installments = 3;
      }
    },
    "sale.installments": function(value) {
      this.sale.paymentItems = [];
      var i;
      var payment = (this.sale.balance / value).toFixed(2);
      for (i = 1; i <= value; i++) {
        var d = new Date();
        if (this.endOfMonth) {
          d.setMonth(d.getMonth() + 1 + i, 0);
        } else {
          d.setMonth(d.getMonth() + i);
        }
        this.sale.paymentItems.push({
          no: i,
          amount:
            i == value
              ? (this.sale.balance - payment * (i - 1)).toFixed(2)
              : payment,
          formattedDate: d.toLocaleString("en-gb", this.dateOptions),
          date: d.toLocaleDateString(),
          fixed: false
        });
      }
      this.tmpPaymentItems = window.cloneDeep(this.sale.paymentItems);
    },
    chosenAddress(value) {
      if(value) {
        var arr = value.split(",")
        console.log(arr)
        var address = ''
        var i;
        for (i = 0; i < 5; i++) {
          if(arr[i] != ' ') {
            if(address == '') {
              address += arr[i] 
            } else {
              address += ',' + arr[i] 
            }
            
          }
        }
        this.sale.address = address
        this.sale.city = arr[5]
        console.log(this.sale.address)
        console.log(this.sale.city)
      } else {
        this.sale.address = '',
        this.ssle.city = ''
      }
    },
    endOfMonth(value) {
      var i = 0;
      this.sale.paymentItems.forEach(item => {
        var d = new Date();
        if (value) {
          d.setMonth(d.getMonth() + 1 + i, 0);
        } else {
          d.setMonth(d.getMonth() + i);
        }
        item.formattedDate = d.toLocaleString("en-gb", this.dateOptions);
        item.date = d.toLocaleDateString();
        i++;
      });
    },
    weddingMenu(val) {
      val &&
        this.$nextTick(
          () => (this.$refs.weddingDatePicker.activePicker = "YEAR")
        );
    },
    tab(val) {
      this.$emit("changedTab", val);
    }
  },
  computed: {
    checkForSaleItems() {
      var items = this.sale.saleItems.filter(item => item.size != null);
      console.log(this.sale.saleItems);
      console.log(items);
      if (items.length == 0) {
        this.sale.deposit = 0;
        this.sale.installments = 0;
        this.sale.payment = null;
        this.sale.repayment = null;
        this.sale.paymentItems = [];
        return true;
      } else {
        return false;
      }
    },
    formattedDate() {
      return this.formatDate(this.sale.date);
    },
    formattedWeddingDate() {
      var date = this.formatDate(this.sale.weddingDate);
      return date;
    },
    ...mapState({
      staff: state => state.staff
    }),
    ...mapState({
      account: state => state.account
    }),
    ...mapState({
      address: state => state.address
    }),
    maxWeddingDate() {
      var max = new Date().setFullYear(new Date().getFullYear() + 6);
      return new Date(max).toISOString().substr(0, 10);
    },
    installmentItems() {
      var items = [];
      var i;
      for (i = 1; i < 13; i++) {
        items.push(i);
      }
      return items;
    },
    validatePostcode() {
      const postcodeRegex = /^[A-Z]+[0-9]+[A-Z]+$/
      return postcodeRegex.test(this.sale.postcode);
    }
  },
  methods: {
    ...mapActions("address", ["fetchAddress"]),
    findAddress() {
      this.fetchAddress(this.sale.postcode).then(addresses => {
        this.addresses = addresses
        this.autoselectMenu = true
      });
    },
    validate(val) {
      if (val > this.sale.balance) {
        this.installmentsError = "Installment is greater than the balance";
        return false;
      }

      if (val < 0) {
        this.installmentsError = "Installment is negative";
        return false;
      }

      var total = this.sale.paymentItems
        .reduce(
          (a, b) => +(parseFloat(a) || 0) + (parseFloat(b.amount) || 0),
          0
        )
        .toFixed(2);
      var balance = parseFloat(this.sale.balance).toFixed(2);

      if (total > balance) {
        this.installmentsError = "Installments are greater than the balance";
      } else if (total < balance) {
        this.installmentsError = "Installments are less than the balance";
      } else {
        this.installmentsError = null;
      }
      return total == balance;
    },
    modifiedPayment(item) {
      this.beenValidated = false;
      item.fixed = true;
      var unModifiedItems = this.sale.paymentItems.filter(paymentItem => {
        return paymentItem.fixed === false;
      });
      if (unModifiedItems.length > 0) {
        let modifiedItems = this.sale.paymentItems.filter(paymentItem => {
          return paymentItem.fixed === true;
        });
        let modifiedSum = modifiedItems.reduce(
          (a, b) => +(parseFloat(a) || 0) + (parseFloat(b.amount) || 0),
          0
        );

        let count = this.sale.paymentItems.length - modifiedItems.length;
        let remainingBalance = this.sale.balance - modifiedSum;
        let payment = (remainingBalance / count).toFixed(2);

        var i;
        for (i = 1; i <= unModifiedItems.length; i++) {
          unModifiedItems[i - 1].amount =
            i == unModifiedItems.length
              ? (remainingBalance - payment * (i - 1)).toFixed(2)
              : payment;
        }
      }
      this.$refs.form4.validate();
      setTimeout(() => {
        this.beenValidated = true;
      }, 500);
    },
    newEmployee() {},

    saveDate(date) {
      this.$refs.dateMenu.save(date);
    },
    saveWeddingDate(date) {
      this.$refs.weddingDateMenu.save(date);
    },
    allowedHours: v => v % 2,
    allowedMinutes: v => v >= 15 && v <= 45,
    allowedStep: m => m % 15 === 0,

    reset() {
      this.$refs.form1.reset();
      this.$refs.form2.reset();
    },
    submit() {
      if (this.tab == 1) {
        this.tab = 2;
      } else if (this.tab == 2) {
        this.tab = 3;
      } else {
        if (this.$refs.form1.validate()) {
          if (this.$refs.form2.validate()) {
            if (this.$refs.form3.validate() && this.$refs.form4.validate()) {
              this.newObj ? this.create() : this.update();
            }
          } else {
            this.tab = 2;
          }
        } else {
          this.tab = 1;
        }
      }
    },
    create(editingSaved) {
      this.$emit("create");
    },
    update() {
      this.$emit("update");
    },
    save() {
      this.$emit("save");
    },
    close() {
      this.$emit("close");
    },

    newSaleItem() {
      this.sale.saleItems.push({
        category: "",
        code: "",
        price: "0"
      });
    },

    removeSaleItem(index) {
      this.sale.saleItems.splice(index, 1);
    },

    sumItems() {
      this.sale.total =
        this.sale.saleItems.reduce(
          (a, b) => +(parseFloat(a) || 0) + (parseFloat(b.price) || 0),
          0
        ) || 0;
    }
  },

  activated() {
    this.tab = 0;
  },

  mounted() {
    this.categories = this.account.company.settings.productCategories;

    this.employees = this.staff.items.map(employee => ({
      _id: employee._id,
      name: employee.name
    }));

    if (this.editingSaved) {
      this.$refs.form1.validate();
      this.$refs.form2.validate();
    }
  }
};
</script>

<style>
.inputPrice input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>


<style scoped>
.titleLabel {
  text-align: center;
  font-size: 30px;
  opacity: 0.4;
}

.fixedCard {
  position: fixed;
  max-width: 600px;
  width: 100%;
  height: 60px;
  z-index: 1000;
}
</style>


