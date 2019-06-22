<template>
  <v-container fill-height>
    <v-layout row class="centerScreen">
      <v-flex xs8 sm6 md4 xl2>
        <v-card>
          <v-toolbar dark color="menu">
            <v-spacer></v-spacer>
            <img src="@/assets/Brid.al.png" width="100">
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-form ref="form" lazy-validation>
            <v-container pa-2>
              <v-layout align-center justify-center row ma-4>
                <v-text-field
                  label="Store Postcode"
                  placeholder="WF17 6HR"
                  v-model="postcode"
                  required
                  hint="Enter the postcode of the bridal store"
                  persistent-hint
                  :rules="rules.requiredRules"
                  style="max-width:200px"
                  class="capitalizeInput"
                ></v-text-field>
              </v-layout>
              <div v-if="noResult != null">
              <v-subheader>Result</v-subheader>
              <v-alert
                :value="noResult"
                type="error"
              >
                This is a error alert.
              </v-alert>
                <v-list subheader three-line class="elevation-2" v-if="store">
                  
                    <v-list-tile  avatar ripple @click="goToStore()">
                      <v-list-tile-content>
                        <v-list-tile-title>{{ store.companyName }}</v-list-tile-title>
                        <v-list-tile-sub-title class="text--primary">{{ store.storeName }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ store.postcode }}</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <!-- <v-btn icon ripple> -->
                          <v-icon color="grey lighten-1">chevron_right</v-icon>
                        <!-- </v-btn> -->
                      </v-list-tile-action>
                    </v-list-tile>
                  
                </v-list>
              </div>
              <v-btn block color="secondary" @click="submit()">Search</v-btn>
              <v-btn block color="primary" @click="currentLocation()">Use Current Location</v-btn>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import rules from "@/components/rules.js";

export default {
  data() {
    return {
      postcode: "HD1 3RD",
      rules: rules,
      store: null,
      noResult: null,
    };
  },
  computed: {
    ...mapState("account", ["status"])
  },
  methods: {
    ...mapActions("account", ["getStore"]),
    submit() {
      if (this.$refs.form.validate()) {
        this.getStore(this.postcode).then(resp => {
          if (resp.company) {
            var matchingStore = resp.company.stores.find(element => {
              return element.postcode === this.postcode
            })
            this.store = matchingStore
            this.store.companyName = resp.company.companyName
            this.noResult = false
          } else {
            this.noResult = true
            this.store = null
          }
        })
      }
    },
    currentLocation() {

    },
    goToStore() {
      if (this.store) {
        this.$router.push("/store/" + this.postcode)
      }
    }
  }
};
</script>

<style>
.capitalizeInput input {
  text-transform: uppercase;
}
</style>
