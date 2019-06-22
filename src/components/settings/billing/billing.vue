<template>
  <v-container>
    <v-subheader class="mt-2 subheading">Plans & Usage</v-subheader>
    <v-layout row wrap ml-3 mr-3>
      <v-flex xs12>
        <v-divider class="mb-2"></v-divider>
        <p class="subheading" style="display:inline-block; width: 200px">Plan</p>
        <p class="subheading font-weight-thin" style="display:inline-block">
          You are currently on
          <span class="font-weight-medium">{{ this.account.company.plan }}</span> plan
        </p>
        <v-btn color="secondary" class="mt-0 mb-0" @click="changePlan()">Change Plan</v-btn>
        <span v-if="this.account.company.plan === 'Trial'"> Expires: {{ new Date(this.account.company.current_period_ends).toLocaleDateString('en-gb', dateOptions) }}</span>
      </v-flex>
      <v-flex xs12>
        <v-divider class="mb-2"></v-divider>
        <div>
          <p class="subheading" style="display:inline-block; width: 200px">Usage</p>
          <p class="subheading font-weight-thin" style="display:inline-block">
            <span class="font-weight-medium">1 of 100</span> texts
          </p>
        </div>
        <div>
          <p class="subheading" style="display:inline-block; width: 200px"></p>
          <p class="subheading font-weight-thin" style="display:inline-block">
            <span class="font-weight-medium">3 of 20</span> sales
          </p>
        </div>
      </v-flex>
    </v-layout>
    <v-subheader class="mt-2 subheading">Invoices</v-subheader>

   
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      dateOptions: {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      },
    };
  },
  methods: {
    changePlan() {
      this.$router.push("/billing/plans");
    }
  },
  computed: {
    ...mapState({
      account: state => state.account
    }),
    
  }
};
</script>
