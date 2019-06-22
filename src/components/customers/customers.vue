<template>
  <v-container fluid pa-3>
    <v-dialog v-if="dialog" v-model="dialog" :fullscreen="this.$vuetify.breakpoint.xs" :max-width="maxWidth">
      <new-sale
        :newObj="this.newObj"
        :sale="sale"
        :editingSaved="editingSaved"
        v-on:close="closeDialog"
        v-on:save="save"
        v-on:create="create"
        v-on:changedTab="changedTab"
      ></new-sale>
    </v-dialog>
    <v-card>
      <v-btn fab dark color="secondary" large fixed bottom right @click="add()">
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-toolbar color="transparent" flat class="pa-1">
        <div class="display-1 font-weight-medium">{{ pageTitle }}</div>
        <v-spacer></v-spacer>
        <v-badge color="red" overlap v-if="savedSale">
          <span slot="badge">!</span>
          <v-icon large color="black" @click="saved()">save</v-icon>
        </v-badge>
      </v-toolbar>
      <v-layout row wrap xs12 class="searchBar">
        <v-flex xs12 md8 xl6>
          <v-btn
            :color="this.searchType === 'customerNo' ? 'secondary' : 'buttonGrey'"
            @click="filter('customerNo')"
          >Customer No</v-btn>
          <v-btn
            :color="this.searchType === 'name' ? 'secondary' : 'buttonGrey'"
            @click="filter('name')"
          >Name</v-btn>
          <v-btn
            :color="this.searchType === 'phone' ? 'secondary' : 'buttonGrey'"
            @click="filter('phone')"
          >Phone</v-btn>
          <v-btn
            :color="this.searchType === 'address' ? 'secondary' : 'buttonGrey'"
            @click="filter('address')"
          >Address</v-btn>
          <v-btn
            :color="this.searchType === 'email' ? 'secondary' : 'buttonGrey'"
            @click="filter('email')"
          >Email</v-btn>
        </v-flex>
        <v-flex xs12 md4 xl6>
          <v-text-field
            v-model="search"
            append-icon="search"
            :label="searchLabel"
            single-line
            hide-details
            style="display: flex; align-items: center;"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-container fluid grid-list-xl>
        <v-data-iterator
          :items="customers.items"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          content-tag="v-layout"
          row
          wrap
          :loading="loading"
          :search="search"
        >
          <template v-slot:item="props">
            <v-flex xs12 sm6 md4 xl3>
              <v-hover>
              <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 16 : 5}`"
              @click="selectRow(props.item)"
           
              >
                <v-card-title>
                  <div class="title">{{ props.item.customerNo}}</div>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense class="pa-0">
                  <v-list-tile style="background-color: #f9fafc">
                    <v-list-tile-content>Name</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.name }}</v-list-tile-content>
                  </v-list-tile>
                   <v-list-tile style="background-color: #f9fafc">
                    <v-list-tile-content>Phone</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.phone }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Email:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.email }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile style="background-color: #f9fafc">
                    <v-list-tile-content>Address:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.address }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>City:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.city }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile style="background-color: #f9fafc">
                    <v-list-tile-content>Postcode:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.postcode }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile style="background-color: #f9fafc">
                    <v-list-tile-content>Weddind Date</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ new Date(props.item.weddingDate).toLocaleDateString() }}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
              </v-hover>
            </v-flex>
          </template>
        </v-data-iterator>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import saleModel from "@/models/sale.js";

export default {
  props: ["new"],
  data: () => ({
    pageTitle: "CUSTOMERS",
    sale: null,
    savedSale: null,
    editingSaved: false,
    dialog: false,
    newObj: true,
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: 10
    },
    maxWidth: 600,
    search: "",
    searchLabel: "Search Name",
    searchType: "name"
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapState({
      account: state => state.account,
      customers: state => state.customers,
      diary: state => state.diary
    }),
    loading() {
      return this.customers.loading
    }
  },
  methods: {
    ...mapActions("customers", ["createCustomer", "fetchCustomers"]),
    ...mapActions("enquiries", ["getEnquiry"]),
    closeDialog() {
      this.dialog = false;
    },
    changedTab(val) {
      if(val==2){
        this.maxWidth = 800
      } else {
        this.maxWidth = 600
      }
    },
    add() {
      this.maxWidth = 600
      this.sale = window.cloneDeep(saleModel);
      this.newObj = true;
      this.dialog = true;
    },
    save() {
      let parsed = JSON.stringify(this.sale);
      localStorage.setItem("sale", parsed);
      this.savedSale = this.sale;
      this.dialog = false;
    },
    create(editingSaved) {
      this.createCustomer(this.sale).then((customer) => {
        this.dialog = false;
        if (editingSaved) {
          localStorage.removeItem("sale");
          this.savedSale = null;
        }
        this.$router.push("/customers/" + customer._id)
      });
    },
    saved() {
      this.sale = window.cloneDeep(this.savedSale);
      this.editingSaved = true;
      this.newObj = true;
      this.dialog = true;
    },
    filter(type) {
      this.searchType = type;
      if (type === "customerNo") {
        this.searchLabel = "Search Customer No";
      } else if (type === "name") {
        this.searchLabel = "Search Name";
      } else if (type === "phone") {
        this.searchLabel = "Search Phone";
      } else if (type === "address") {
        this.searchLabel = "Search Address";
      } else if (type === "email") {
        this.searchLabel = "Search Email";
      }
    },

    selectRow(item) {
      this.$router.push("/customers/" + item._id);
    }
  },
  mounted() {
    this.fetchCustomers()
    this.savedSale = JSON.parse(localStorage.getItem("sale"));

    if (this.$route.query.app && this.diary.app) {
      var app = this.diary.app;
      this.maxWidth = 600
      this.sale = window.cloneDeep(saleModel);
      this.sale.name = app.customerName
      this.sale.phone = app.phone
      this.sale.weddingDate = new Date(app.weddingDate).toISOString().substr(0, 10),
      this.sale.email = app.email
      this.newObj = true;
      this.dialog = true;
    } else if (this.$route.query.enquiry && this.diary.enquiry) {
      var enquiry = this.diary.enquiry;
      this.maxWidth = 600
      this.sale = window.cloneDeep(saleModel);
      this.sale.name = enquiry.customerName
      this.sale.phone = enquiry.phone
      this.sale.weddingDate = new Date(enquiry.weddingDate).toISOString().substr(0, 10)
      this.sale.email = enquiry.email
      this.sale.address = enquiry.address
      this.sale.city = enquiry.city
      this.sale.postcode = enquiry.postcode
      this.sale.enquiry = enquiry._id
      this.newObj = true;
      this.dialog = true;
    } else if (this.$route.query.new) {
      this.add()
    }
  }
};
</script>
