<template>
  <v-container fluid pa-3>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="#f9fafc">
          <v-card-title class="display-1 font-weight-medium">SETTINGS</v-card-title>
          <v-divider></v-divider>
          <v-tabs fixed-tabs color="transparent">
            <v-tab
              v-for="(item, index) in tabs"
              :key="index"
              @change="route(item.routeName)"
            >{{ item.name }}</v-tab>
          </v-tabs>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <router-view></router-view>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      tabs: [
        { name: "Account", routeName: "AccountSettings" },
        { name: "Users & Stores", routeName: "UsersSettings" },
        { name: "Defaults", routeName: "DefaultsSettings" },
        { name: "Billing", routeName: "BillingSettings" }
      ]
    };
  },
  methods: {
    route(routeName) {
      this.$router.push({ name: routeName });
    }
  },
  mounted() {
    this.route(this.tabs[0].routeName)
  }
};
</script>
