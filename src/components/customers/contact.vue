<template>
<v-card>
    <v-card dark color="primary">
      <v-toolbar flat color="transparent" height="45">
        <v-spacer></v-spacer>
        <v-btn flat icon @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title
        light
        class="headline titleLabel"
        primary-title
        style="margin-left:80px; padding-top: 0px; padding-bottom:5px"
      >Contact Details</v-card-title>
      <v-btn fab light absolute bottom left color="white" class="editButton" @click="edit(customer)">
        <v-icon dark>edit</v-icon>
      </v-btn>
    </v-card>
    <v-card class="pt-4">
      <v-container class="ma-0 pa-0">
        <div style="display: flex; align-items: center;" class="pl-4 pr-4 pt-3 pb-2">
          <div class="summaryLabel">Name</div>
          <div class="summaryValue">{{ customer.name }}</div>
        </div>
        <v-divider style="opacity:0.5"></v-divider>
        <div style="display: flex; align-items: center;" class="pl-4 pr-4 pt-2 pb-2">
         <div class="summaryLabel">Contact #</div>
          <div class="summaryValue">{{ customer.phone }}</div>
        </div>
        <v-divider style="opacity:0.5"></v-divider>
        <div style="display: flex; align-items: center;" class="pl-4 pr-4 pt-2 pb-2">
         <div class="summaryLabel">Address</div>
          <div class="summaryValue">{{ customer.address }}</div>
        </div>
        <v-divider style="opacity:0.5"></v-divider>
        <div style="display: flex; align-items: center;" class="pl-4 pr-4 pt-2 pb-2">
         <div class="summaryLabel">City</div>
          <div class="summaryValue">{{ customer.city }}</div>
        </div>
        <v-divider style="opacity:0.5"></v-divider>
        <div style="display: flex; align-items: center;" class="pl-4 pr-4 pt-2 pb-2">
         <div class="summaryLabel">Postcode</div>
          <div class="summaryValue">{{ customer.postcode }}</div>
        </div>
        <v-divider style="opacity:0.5"></v-divider>
        <div style="display: flex; align-items: center;" class="pl-4 pr-4 pt-2 pb-2">
         <div class="summaryLabel">Wedding Date</div>
          <div class="summaryValue">{{ new Date(customer.weddingDate).toLocaleDateString('en-gb') }}</div>
        </div>
        <v-divider style="opacity:0.5"></v-divider>
        <div style="display: flex; align-items: center;" class="pl-4 pr-4 pt-2 pb-2">
         <div class="summaryLabel">Email</div>
          <div class="summaryValue">{{ customer.email }}</div>
        </div>
      </v-container>
    </v-card>
  </v-card>
    <!-- <v-container fluid pa-0>
        <v-layout row wrap>
            <v-flex xs12 ma-0 pa-0>
                <v-card flat dark color = "primary" class="pa-2 mb-3">
                    <div class="titleLabel">Contact Details</div>
                    <v-btn 
                        fab
                        light
                        absolute
                        bottom
                        right
                        color="white" 
                        large
                        class="editButton"
                        @click="editDetails()"
                        >
                        <v-icon dark>edit</v-icon>
                    </v-btn>
                </v-card>
                <v-card class="pt-2 pb-2 pl-4 pr-4" 
                style="display:flex;"
                v-for="(item,i) in items"
                :key="i">
                    <div class="summaryLabel"> {{ item.label }} </div>
                    <div class="summaryValue"> {{ item.value }} </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container> -->
</template>

<script>
export default {
  props: ["customer"],
    data() {
      return {

      }
    },
    methods: {
    close() {
      this.$emit("close");
    },
    edit(app) {
      this.$emit("edit", this.customer);
    },
    remove() {
      if(this.deleteDialog) {
        this.$emit("remove", this.customer)
        this.deleteDialog = false
      } else {
        this.deleteDialog = true
      }
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
    }
  }
}
</script>

