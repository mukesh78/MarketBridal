<template>
  <v-container>
    <div>
      <v-subheader class="subheading">Diary</v-subheader>
      <v-divider></v-divider>
      <v-subheader>
        Appointment Types
        <v-spacer></v-spacer>
        <v-btn small class="mt-0" icon color="secondary" @click="newAppointmentType()">
          <v-icon small>add</v-icon>
        </v-btn>
      </v-subheader>
      <div style="overflow-x:scroll">
        <v-chip
          v-for="(item, index) in account.company.settings.appointmentTypes"
          :key="'c' + index"
          :color="item.colour"
          close
          @input="onRemoveAppointmentType(item)"
        >{{ item.name }}</v-chip>
      </div>
      <v-subheader>
        Booking Types
        <v-spacer></v-spacer>
        <v-btn small class="mt-0" icon color="secondary" @click="newAppointmentBookingType()">
          <v-icon small>add</v-icon>
        </v-btn>
      </v-subheader>
      <div style="overflow-x:scroll">
        <v-chip
          v-for="(item, index) in account.company.settings.appointmentBookingTypes"
          :key="'b' + index"
          close
          @input="onRemoveAppointmentBookingType(item)"
        >{{ item.name }}</v-chip>
      </div>
    </div>
    <div class="mt-2">
      <v-subheader class="subheading">Sales</v-subheader>
      <v-divider></v-divider>
      <v-subheader>
        Comments
        <v-spacer></v-spacer>
        <v-btn small class="mt-0" icon color="secondary" @click="newAppointmentType()">
          <v-icon small>add</v-icon>
        </v-btn>
      </v-subheader>
      <div style="overflow-x:scroll">
        <v-chip
          v-for="(item, index) in account.company.settings.saleComments"
          :key="'s' + index"
          close
          @input="onRemoveSaleComment(item)"
        >{{ item.text }}</v-chip>
      </div>
    </div>
    <div class="mt-2">
      <v-subheader class="subheading">Payments</v-subheader>
      <v-divider></v-divider>
      <v-subheader>
        Comments
        <v-spacer></v-spacer>
        <v-btn small class="mt-0" icon color="secondary" @click="newAppointmentType()">
          <v-icon small>add</v-icon>
        </v-btn>
      </v-subheader>
      <div style="overflow-x:scroll">
        <v-chip
          v-for="(item, index) in account.company.settings.paymentComments"
          :key="'p' + index"
          close
          @input="onRemovePaymentComment(item)"
        >{{ item.text }}</v-chip>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      account: state => state.account
    })
  },
  methods: {
    onRemoveAppointmentType(item) {
      console.log(item);
    },
    onRemoveAppointmentBookingType(item) {},
    onRemoveSaleComment(item) {},
    onRemovePaymentComment(item) {},
    newAppointmentType() {}
  }
};
</script>
