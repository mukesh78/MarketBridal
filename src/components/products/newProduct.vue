<template>
  <v-card>
    <v-dialog v-if="deleteDialog" v-model="deleteDialog" max-width="300">
      <delete-form
        item="product"
        v-on:close="closeDeleteDialog"
        v-on:remove="remove"
      ></delete-form>
    </v-dialog>
    <v-dialog v-if="newTextDialog" v-model="newTextDialog" max-width="300">
      <new-text-form
      :newObj="this.newObjText"
      :text="newText"
      v-on:close="closeTextDialog"
      v-on:create="createText"
      ></new-text-form>
    </v-dialog>
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

    <v-container ma-0 pa-0 ref="formContainer">
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-stepper v-model="tab" alt-labels>
            <v-stepper-header>
              <v-stepper-step :complete="tab > 1" editable step="1">Product Details</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="tab > 2" editable step="2">Variations</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card color="grey lighten-5" class="mb-1" flat>
                  <v-form ref="form1" lazy-validation>
                    <v-container grid-list-md>
                      <v-layout row wrap>
                        <v-flex xs12 md12>
                          <v-autocomplete
                            v-model="product.supplier"
                            :items="suppliers"
                            :rules="rules.requiredRules"
                            label="Supplier"
                            required
                            item-text="name"
                            return-object
                          ><v-btn small class="mt-0" slot="append-outer" icon color="secondary" @click="newSupplier()">
                            <v-icon small>add</v-icon>
                          </v-btn>
                          </v-autocomplete>
                        </v-flex>
                        <v-flex xs12 md12>
                          <v-autocomplete
                            v-model="product.category"
                            :items="categories"
                            label="Category"
                            required
                            :rules="rules.requiredRules"
                            item-text="name"
                            return-object
                          ><v-btn small class="mt-0" slot="append-outer" icon color="secondary" @click="newCategory()">
                            <v-icon small>add</v-icon>
                          </v-btn>
                          </v-autocomplete>
                        </v-flex>
                        <v-flex xs12 md12>
                          <v-text-field
                            v-model="product.code"
                            label="Code"
                            required
                            :rules="rules.requiredRules"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md12>
                          <v-text-field
                            v-model="product.supplierCode"
                            label="Supplier Code"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md12>
                          <v-textarea
                            name="product.comment"
                            label="Comments"
                            :row-height="10"
                            :rows="1"
                            v-model="product.comment"
                            auto-grow
                          ></v-textarea>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card color="grey lighten-5" class="mb-1" flat>
                  <v-form ref="form2" lazy-validation>
                    <v-container grid-list-md>
                      <v-layout row wrap>
                        <v-flex xs8>
                          <v-autocomplete
                            v-model="colour"
                            :items="colours"
                            :rules="rules.requiredRules"
                            label="Colour"
                            multiple
                            chips
                            required
                            item-text="name"
                            return-object
                          ><v-btn small class="mt-0" slot="append-outer" icon color="secondary" @click="newColour()">
                            <v-icon small>add</v-icon>
                          </v-btn>
                          </v-autocomplete>
                        </v-flex>
                        <v-flex xs4>
                          <v-text-field
                          v-model="price"
                          type="number"
                          label="Solo"
                          single-line
                          solo
                          prefix="£"
                          :rules="rules.requiredRules"
                          required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-subheader>Sizing</v-subheader>
                      <v-divider></v-divider>
                      <v-layout row wrap>
                        <v-flex xs12 md6>
                          <v-select
                            v-model="sizeModel"
                            :items="sizeItems"
                            :rules="rules.requiredRules"
                            label="Sizing Type"
                            required
                          ><v-btn small class="mt-0" slot="append-outer" icon color="secondary" @click="newSizing()">
                            <v-icon small>add</v-icon>
                          </v-btn>
                          <template slot="selection" slot-scope="data">{{data.item.name}}</template>
                          <template slot="item" slot-scope="data">{{data.item.name}}</template>
                          </v-select>
                        </v-flex>
                        <v-flex xs12>
                          <v-combobox
                          v-model="sizeArr"
                          :items="sizes"
                          label="Sizes"
                          chips
                          multiple
                          required
                          :rules="rules.minCountRules"
                          >
                            <template slot="selection" slot-scope="data">
                              <v-chip small>{{ data.item }}</v-chip>
                            </template>
                          </v-combobox>
                        </v-flex>
                        <v-flex xs12 text-xs-right>
                          <v-btn color="primary" @click="addProducts">ADD</v-btn>
                        </v-flex>
                      </v-layout>
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
                v-text="tab < 2 ? 'CONTINUE' : newObj ? 'SUBMIT': 'UPDATE'"
              ></v-btn>
            </v-card>
          </v-stepper>
        </v-flex>

        <v-flex xs12 md6 v-if="this.tab < 2" style="background-color:#ddd">
          <v-container fill-height>
            <div class="imgUpload">
              <v-layout align-center justify-center column fill-height>
                <v-icon>add_photo_alternate</v-icon>
                <div>
                  <v-btn small dark color="third">Choose image to upload</v-btn>
                </div>
                <div>
                  <p>or drag and drop them here</p>
                </div>
              </v-layout>
            </div>
          </v-container>
        </v-flex>
        <v-flex
          xs12
          md6
          v-if="this.tab > 1"
        >
          <v-container fluid ma-0 pa-0>
            <v-data-table
              :headers="headers"
              :items="product.items"
              :pagination.sync="pagination"
              hide-actions
              style="max-height: 600px; overflow-x: hidden; overflow-y: overlay;"
            >
              <template slot="headers" slot-scope="props">
                <tr>
                 <th
                    v-for="header in props.headers.slice(0, -1)"
                    :key="header.text"
                    :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                    @click="changeSort(header.value)"
                  >
                    <v-icon small>arrow_upward</v-icon>
                    {{ header.text }}
                  </th>
                  <th>
                    <v-btn @click="removeAllProducts" icon><v-icon large color="error">cancel</v-icon></v-btn>
                  </th>
                </tr>

              </template>
              <template slot="items" slot-scope="props">
                <td class="text-xs-center">£{{ props.item.price}}</td>
                <td class="text-xs-center">{{ props.item.size }}</td>
                <td class="text-xs-center">{{ props.item.colour }}</td>
                <td class>
                  <v-layout>
                    <v-flex xs2 md2>
                      <a href="#" class="iconDownLeft">
                        <font-awesome-icon
                          prefix="far"
                          icon="caret-up"
                          :style="{ color: 'black' }"
                          size="2x"
                        />
                      </a>
                    </v-flex>

                    <v-flex xs8 md8>
                      <v-chip
                        dark
                        class="customChipClass"
                        label
                        :color="props.item.stock >= props.item.threshold ? 'stockOk' : props.item.stock >= props.item.lowThreshold ? 'stockWarning' : 'stockLow'"
                      >{{ props.item.stock }}</v-chip>
                    </v-flex>
                    <v-flex xs2 md2>
                      <a href="#" class="iconDownRight">
                        <font-awesome-icon
                          prefix="far"
                          icon="caret-down"
                          :style="{ color: 'black' }"
                          size="2x"
                        />
                      </a>
                    </v-flex>
                  </v-layout>
                </td>
                <td><v-btn icon @click="removeProduct(props.item)"><v-icon>cancel</v-icon></v-btn></td>
              </template>
            </v-data-table>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import rules from "@/components/rules.js";

export default {
  props: ["newObj", "product", 'editingSaved'],
  data() {
    return {
      title: "Product",
      rules: rules,
      deleteDialog: false,
      tab: 1,
      colour: [],
      price: null,
      sizeArr: [],
      sizeHeight: 100,
      suppliers: [],
      categories: [],
      colours: [],
      newTextDialog: false,
      newObjText: true,
      newText: null,
      pagination: {
        sortBy: 'size',
        rowsPerPage: 100
      },
      headers: [
        { text: "Price", value: "price", align: "center" },
        { text: "Size", value: "size", align: "center" },
        { text: "Colour", value: "colour", align: "center" },
        { text: "Stock", value: "stock", align: "center" },
        { text: "", value:"" }
      ],
      sizeItems: [
        {
          text: "4-30",
          items: [
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "16",
            "18",
            "20",
            "22",
            "24",
            "26",
            "28",
            "30"
          ]
        },
        { text: "XS-XL", items: ["XS", "S", "M", "L", "XL"] }
      ],
      sizeModel: null,
      sizes: []
    };
  },
  computed: {
    ...mapState({
      account: state => state.account,
    }),
  },
  methods: {
    ...mapActions("account", ["newProduct", "newSettingsProductSupplier", "newSettingsProductCategory", "newSettingsProductColour"]),
    newSupplier() {
      this.newText = {
        label: "Supplier",
        value: ''
      }
      this.newTextDialog = true
    },
    newCategory() {
      this.newText = {
        label: "Category",
        value: ''
      }
      this.newTextDialog = true
    },
    newSizing() {
      console.log("New Sizinf")
    },
    newColour() {
      this.newText = {
        label: "Colour",
        value: ''
      }
      this.newTextDialog = true
    },
    reset() {
      this.$refs.form1.reset();
      this.$refs.form2.reset();
    },
    submit() {
      if (this.tab < 2) {
        this.tab = 2;
      } else {
        if (this.$refs.form1.validate()) {
          if (this.$refs.form2.validate() || this.product.items.length > 0) {
            this.newObj ? this.create() : this.update();
          }
        } else {
          this.tab = 1
        }
      }
    },
    create() {
      this.$emit("create", this.editingSaved);
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
    remove() {
      if(this.deleteDialog) {
        this.$emit("remove", this.product)
        this.deleteDialog = false
      } else {
        this.deleteDialog = true
      }
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
    },
    changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
    addProducts() {
      if(this.$refs.form2.validate()) {
        this.sizeArr.forEach(size => {
          this.colour.forEach(colour=>{
            this.product.items.push({
              price: this.price,
              size: size,
              colour: colour.name,
              stock: 0,
              lowThreshold: null,
              threshold: null
            });
          })
        });
      }
    },
    removeProduct(product) {
      var index = this.product.items.findIndex((item)=>{
        return item === product
      })
      this.product.items.splice(index,1)
    },
    removeAllProducts() {
      this.product.items = []
    },
    handleResize () {
      var size = this.$refs.formContainer.clientHeight;
      this.sizeHeight = size
    },
    closeTextDialog() {
      this.newTextDialog = false
    },
    createText() {
      if(this.newText.label === 'Supplier') {
        this.newSettingsProductSupplier({
          companyId: this.account.company._id,
          name: this.newText.value
        }).then(resp => {
          this.newTextDialog = false
        })
      }else if(this.newText.label === 'Category') {
        this.newSettingsProductCategory({
          companyId: this.account.company._id,
          name: this.newText.value
        }).then(resp => {
          this.newTextDialog = false
        })
      }else if(this.newText.label === 'Colour') {
        this.newSettingsProductColour({
          companyId: this.account.company._id,
          name: this.newText.value
        }).then(resp => {
          this.newTextDialog = false
        })
      }
    }
  },
  watch: {
    sizeModel(val) {
      console.log(val)
      let item = this.sizeItems.find(function(item) {
        return item.name === val.name;
      });
      this.sizes = item.items;
      this.sizeArr = item.items;
    },
  },
  mounted() {
    this.$nextTick(function() {
      this.$refs.formContainer.addEventListener('resize', this.handleResize())
    })
    if(this.editingSaved) {
      this.$refs.form1.validate()
      this.$refs.form2.validate()
    }

    this.suppliers = this.account.company.settings.productSuppliers;
    this.categories = this.account.company.settings.productCategories;
    this.colours = this.account.company.settings.productColours;
    this.sizeItems = this.account.company.settings.productSizing;

    console.log(this.account.company.settings)

  },
  beforeDestroy() {
      window.removeEventListener('resize', this.handleResize())
  }
};
</script>


<style scoped>
.imgUpload {
  border: 2px dashed #999;
  height: 100%;
  width: 100%;
}
</style>

<style type="text/css">

.modalTableClass .v-table__overflow {
  overflow-x: auto !important;
  overflow-y: auto !important;
}
</style>

v-bind:style="{ 'max-height': sizeHeight + 'px'}"
