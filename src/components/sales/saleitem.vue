<template>
    <div style="position:relative; background:white" class="mt-2">
        <v-btn dark icon color="grey" @click="deleteItem" class="deleteButton">
            <v-icon>remove</v-icon>
        </v-btn>
        <v-container grid-list-md class="pl-2 pr-2 pt-0 pb-0">
        <v-layout row wrap justify-end>
          
            <v-flex xs8 sm4 pt-1 pb-0>
          
                <v-autocomplete
                  v-model="item.category"
                  :items="categories"
                  label="Category"
                  required
                  :rules="rules.requiredRules"
                  item-text="name"
                  return-object
                  style="margin:0px"
                  @change="changedCategory"
                ></v-autocomplete>
            </v-flex>
            <v-flex xs4 sm3 pt-1 pb-0>
                <v-autocomplete
                    v-model="product"
                    :items="products"
                    label="Code"
                    required 
                    :rules="rules.requiredRules"
                    item-text="code"
                    style="margin:0px;"
                    return-object
                ></v-autocomplete>
            </v-flex>
            <v-flex xs8 sm3 pt-1 pb-0>
                <v-autocomplete
                    v-model="variation"
                    :items="product ? product.items : []"
                    label="Variation"
                    required 
                    :rules="rules.requiredRules"
                    :item-text="variationText"
                    style="margin:0px;"
                    return-object
                ></v-autocomplete>
            </v-flex>
            <v-flex xs4 sm2 pt-1 pb-0>
                <v-text-field
                    v-model="item.price"
                    type="number"
                    label="Price"
                    required 
                    :rules="rules.requiredRules"
                    style="margin:0px;"
                    :readonly="item.size === null"
                ></v-text-field>
                
            </v-flex>
        </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import rules from "@/components/rules.js";

export default {
    props: ['categories', 'item', 'index'],
    data () {
        return {
            rules: rules,
            products: [],
            product: null,
            variation: null,
        }
    },
    watch: {
        'item.price': function (value){
            this.$emit('sumItems')
        },
        product(val) {
          this.item.code = val.code || null
          this.variation = {}
        },
        variation(val) {
          this.item.size = val.size || null
          this.item.colour = val.colour || null
          this.item.price = val.price || 0
        }
    },
    methods: {
       ...mapActions("products", ["fetchProductsWithCategory"]),
      changedCategory() {
        this.fetchProductsWithCategory(this.item.category._id).then(resp=>{
          this.products = resp.products
          this.product = {}
        })
      },
      deleteItem() {
          this.$emit('removeSaleItem', this.index)
      },
      variationText: item => item.size + ' — ' + item.colour
    }
}
</script>

<style scoped>
    .deleteButton {
        position: absolute;
        /* float:right; */
        /* top: 50%;
        transform: translate(0%,-50%); */
        top:-5px;
        right:-10px;
        margin: 0px;
        min-width: 0px;
        width: 30px;
        height: 30px;
    }
</style>
