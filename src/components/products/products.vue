<template>
  <v-container fluid pa-3>
    <v-card>
      <v-dialog v-if="newDialog" v-model="newDialog" max-width="1000" :fullscreen="this.$vuetify.breakpoint.xs">
        <new-product
          :newObj="this.newObj"
          :product="product" 
          :editingSaved="editingSaved"
          v-on:close="closeNewDialog"
          v-on:save="save"
          v-on:create="create"
          v-on:update="update"
          v-on:remove="remove"
        ></new-product>
      </v-dialog>
      <v-dialog v-if="viewDialog" v-model="viewDialog" max-width="1000">
          <view-product
          :product="product"
          v-on:edit="edit"
          v-on:close="closeViewDialog"
          v-on:remove="remove"
          ></view-product>
      </v-dialog>
      <v-btn fab dark color="secondary" large fixed bottom right @click="add()">
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-toolbar color="transparent" flat class="pa-1">
        <div class="display-1 font-weight-medium">{{ pageTitle }}</div>
        <v-spacer></v-spacer>
        <v-badge color="red" overlap v-if="savedProduct">
          <span slot="badge">1</span>
          <v-icon
            large
            color="black"
            @click="saved()"
          >
            save
          </v-icon>
        </v-badge>
      </v-toolbar>
      <v-layout row wrap xs12 class="searchBar">
        <v-flex xs12 md8 xl6>
          <v-btn
            :color="this.searchType === 'supplier' ? 'secondary' : 'buttonGrey'"
            @click="filter('supplier')"
          >Supplier</v-btn>
          <v-btn
            :color="this.searchType === 'code' ? 'secondary' : 'buttonGrey'"
            @click="filter('code')"
          >Code</v-btn>
          <v-btn
            :color="this.searchType === 'supplierCode' ? 'secondary' : 'buttonGrey'"
            @click="filter('supplierCode')"
          >Supplier Code</v-btn>
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
      <v-data-table item-key="_id" :expand="expand" :headers="headers" :items="products.items" :search="search" :loading="loading" class="elevation-1">
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded; product = props.item">
            <td class="text-xs-left removePadding">
              <v-chip class="removePadding" abel disabled text-color="black" color="rgba(0, 0, 0, 0)">{{ props.item.supplier.name }}</v-chip>
            </td>
            <td class="text-xs-center removePadding">
              <v-chip class="removePadding" label disabled text-color="black" color="rgba(0, 0, 0, 0)">{{ props.item.category.name }}</v-chip>
            </td>
            <td class="text-xs-center removePadding">
              <v-chip class="removePadding" label disabled text-color="black" color="rgba(0, 0, 0, 0)">{{ props.item.code }}</v-chip>
            </td>
            <td class="text-xs-center removePadding">
              <v-chip class="removePadding" label disabled text-color="black" color="rgba(0, 0, 0, 0)">{{ props.item.supplierCode }}</v-chip>
            </td>
            <td class="text-xs-center removePadding">
              <v-chip class="removePadding" label disabled text-color="black" color="rgba(0, 0, 0, 0)">{{ props.item.comment }}</v-chip>
            </td>
            <td class="text-xs-center removePadding">
              <v-chip class="removePadding" label disabled text-color="black" color="rgba(0, 0, 0, 0)">{{ props.item.items.reduce((a, b) => +a + +b.stock, 0) }}</v-chip>
            </td>
            <td class="text-xs-center removePadding">
              <v-chip class="removePadding" label disabled text-color="black" color="rgba(0, 0, 0, 0)">{{ props.item.items.reduce((a, b) => +a + +b.ordered, 0) }}</v-chip>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-container class="searchBar">
            <v-layout justify-center>
            <v-data-table :total-items="props.count" hide-actions :headers="headersProducts" :items="props.item.items" class="elevation-1">
              <template slot="items" slot-scope="props">
                <tr @click="selectRow()">
                  <td class="text-xs-center">
                    <v-chip label disabled text-color="black" color="rgba(0, 0, 0, 0)">£{{ props.item.price }}</v-chip>
                  </td>
                  <td class="text-xs-center">
                    <v-chip label disabled text-color="black" color="rgba(0, 0, 0, 0)">{{ props.item.size }}</v-chip>
                  </td>
                  <td class="text-xs-center">
                    <v-chip label disabled text-color="black" color="rgba(0, 0, 0, 0)">{{ props.item.colour }}</v-chip>
                  </td>
                  <td class="text-xs-center">
                    <v-btn
                      dark
                      :color="props.item.stock >= props.item.threshold ? 'stockOk' : props.item.stock >= props.item.lowThreshold ? 'stockWarning' : 'stockLow'"
                    >{{ props.item.stock }}</v-btn>
                  </td>
                  <td class="text-xs-center">
                    <v-btn dark>
                        {{ props.item.stock }}
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
            </v-layout>
          </v-container>

        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
        <template slot="no-data">
          <v-alert v-if="!loading" :value="true" color="error" icon="warning">No {{ pageTitle }}</v-alert>
        </template> 
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import newProduct from './newProduct'
import viewProduct from './viewProduct'
import productModel from "@/models/product.js";

export default {
  components:{
      "new-product": newProduct,
      "view-product": viewProduct
    },
  data: () => ({
    pageTitle: "PRODUCTS",
    product: null,
    savedProduct: null,
    editingSaved: false,
    newDialog: false,
    viewDialog: false,
    newObj: true,
    pagination: {
      rowsPerPage: 10
    },
    search: "",
    searchLabel: "Search Code",
    searchType: "code",
    expand: false,
    headers: [
      { text: "Supplier", value: "supplier", align: "left" },
      { text: "Category", value: "category", align: "center"},
      { text: "Code", value: "code", align: "center"},
      { text: "Supplier Code", value: "supplierCode", align: "center" },
      { text: "Comment", value: "comment", align: "left" },
      { text: "Stock", value: "quantity", align: "center" },
      { text: "Ordered", value: "ordered", align: "center" }
    ],
    headersProducts: [
      { text: "Price", value: "price", align: "center" },
      { text: "Size", value: "size", align: "center" },
      { text: "Colour", value: "colour", align: "center" },
      { text: "Stock", value: "stock", align: "center" },
      { text: "Ordered", value: "ordered", align: "center" }
    ]
  }),
  methods: {
    ...mapActions("products", [
      "createProduct",
      "fetchProducts",
      "updateProduct",
      "deleteProduct"
    ]),
    closeNewDialog() {
      this.newDialog = false;
    },
    closeViewDialog() {
      this.viewDialog = false;
    },
    add() {
      this.product = window.cloneDeep(productModel)
      this.editingSaved = false;
      this.newObj = true;
      this.newDialog = true;
    },
    selectRow() {
      this.viewDialog = true;
    },
    save() {
      let parsed = JSON.stringify(this.product);
      localStorage.setItem("product", parsed);
      this.savedProduct = this.product;
      this.newDialog = false;
    },
    create(editingSaved) {
      this.createProduct(this.product).then(() => {
        this.newDialog = false;
        if(editingSaved) {
          localStorage.removeItem("product")
          this.savedProduct = null
        }
      });
    },
    update() {
      this.updateProduct(this.product).then(() => {
        this.newDialog = false;
      });
    },
    edit(product) {
      this.product = window.cloneDeep(product);
      this.editingSaved = false;
      this.newObj = false;
      this.newDialog = true;
      this.viewDialog = false;
    },
    remove(product) {
      this.deleteProduct(product._id);
      var index = this.items.findIndex(product => {
        return this.product._id === product._id
      })
      this.items.splice(index, 1);
      this.viewDialog = false;
      this.newDialog = false;
    },
    saved() {
      this.product = window.cloneDeep(this.savedProduct);
      this.editingSaved = true
      this.newObj = true;
      this.newDialog = true;
    },
    filter(type) {
      this.searchType = type;
      if (type === "supplier") {
        this.searchLabel = "Search Supplier";
      } else if (type === "code") {
        this.searchLabel = "Search Code";
      } else if (type === "supplierCode") {
        this.searchLabel = "Search Supplier Code";
      }
    },
  },
  mounted() {
    this.savedProduct = JSON.parse(localStorage.getItem("product"))
    this.fetchProducts();
  },
  computed: {
    ...mapState({
      account: state => state.account,
      products: state => state.products
    }),
    loading() {
      return this.products.loading
    }
  }
};
</script>

<style>
  .removePadding {
    padding: 0 !important
  }
</style>
