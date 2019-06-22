<template>
  <v-card>
    <v-dialog v-if="deleteDialog" v-model="deleteDialog" max-width="300">
      <delete-form
        item="product"
        v-on:close="closeDeleteDialog"
        v-on:remove="remove"
      ></delete-form>
    </v-dialog>
    <v-card dark color="blue">
      <v-card flat height="5" color="blue darken-4"></v-card>
      <v-toolbar flat color="transparent" height="45">
        <v-spacer></v-spacer>
        <v-tooltip bottom color="primary">
          <v-btn slot="activator" flat icon @click="remove()">
            <v-icon>delete</v-icon>
          </v-btn>
          <span>Delete</span>
        </v-tooltip>
        <v-btn flat icon @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title
        class="display-1 justify-center"
        primary-title
        style="margin-left:80px; padding-top: 0px; padding-bottom:5px"
      >{{ product.code }}</v-card-title>
      <v-btn
        fab
        dark
        absolute
        bottom
        left
        color="primary"
        class="editButton"
        @click="edit(product)"
      >
        <v-icon dark>edit</v-icon>
      </v-btn>
    </v-card>
    <v-card>
      <v-container ma-0 pa-0>
        <v-layout row wrap>
          <v-flex xs5 md5>
            <v-img :src="require('@/assets/prod-img.jpg')" contain></v-img>
          </v-flex>
          <v-flex xs7 md7>
            <v-container>
              <div style="display: flex; align-items: center;" class="pb-2" v-if="product.supplier">
                <v-icon color="primary" class="pr-3">watch_later</v-icon>
                <span>{{ product.supplier.name }}</span>
              </div>
              <div style="display: flex; align-items: center;" class="pb-2" v-if="product.category">
                <v-icon color="primary" class="pr-3">bookmark</v-icon>
                <span>{{ product.category.name }}</span>
              </div>
              <div style="display: flex; align-items: center;" class="pb-2" v-if="product.supplierCode">
                <v-icon color="primary" class="pr-3">code</v-icon>
                <span>{{ product.supplierCode }}</span>
              </div>
              <div style="display: flex; align-items: center;" class="pb-2" v-if="product.comment">
                <v-icon color="primary" class="pr-3">comment</v-icon>
                <span>{{ product.comment }}</span>
              </div>
            </v-container>
            
            <v-data-table
              :headers="headers"
              :items="product.items"
              :search="search"
              hide-actions
              class="modalTableClass"
            >
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
                <td class="text-xs-center">
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
                      <v-chip class="customChipClass" label>{{ props.item.ordered }}</v-chip>
                      <!--   <v-chip label color>{{ props.item.ordered }}</v-chip> -->
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
              </template>
              <v-alert
                slot="no-results"
                :value="true"
                color="error"
                icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-card>
</template>
<script>

export default {
  props: ["product"],
  data() {
    return {
      deleteDialog: false,
      search: "",
      productDialog: true,
      headers: [
        { text: "Price", value: "price", align: "center" },
        { text: "Size", value: "size", align: "center" },
        { text: "Colour", value: "colour", align: "center" },
        { text: "Stock", value: "stock", align: "center" },
        { text: "Ordered", value: "ordered", align: "center" }
      ]
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    edit(product) {
      this.$emit("edit", this.product);
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
    }
  }
};
</script>

<style scoped>

.iconDownLeft {
  padding-top: 8px;
  float: left;
}
.iconDownRight {
  float: right;
  margin-top: 6px;
  margin-left: -10px;
}
.customChipClass {
  min-width: 60px;
  padding: 0px 12px;
  margin-right: 13px;
}
</style>

<style type="text/css">
.modalTableClass table {
  background: #f8f8f8 !important;
  max-height: 200px;
}

.modalTableClass .v-table__overflow {
  height: 300px !important;
  overflow-x: auto !important;
  overflow-y: auto !important;
}
</style>