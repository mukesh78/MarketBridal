<template>
  <v-card>
    <v-dialog v-if="deleteDialog" v-model="deleteDialog" max-width="300">
      <delete-form item="appointment" v-on:close="closeDeleteDialog" v-on:remove="remove"></delete-form>
    </v-dialog>
    <v-dialog v-if="viewDialog" v-model="viewDialog" max-width="300">
      <texting :apps="[app]" v-on:close="closeViewDialog" v-on:updateStatus="updateStatus"></texting>
    </v-dialog>
    <v-card :color="app.bgColor">
      <v-card flat height="5" :color="app.borderColor"></v-card>
      <v-toolbar flat color="transparent" height="45">
        <v-spacer></v-spacer>
        <v-tooltip bottom color="primary">
          <v-btn slot="activator" flat icon @click="sale()">
            <v-icon>add_shopping_cart</v-icon>
          </v-btn>
          <span>Add Sale</span>
        </v-tooltip>
        <v-tooltip bottom color="primary">
          <v-btn slot="activator" flat icon @click="enquiry()">
            <v-icon>assignment</v-icon>
          </v-btn>
          <span>{{ app.enquiry == null ? 'Add Enquiry Form' : 'View Enquiry Form' }}</span>
        </v-tooltip>
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
        class="headline"
        primary-title
        style="margin-left:80px; padding-top: 0px; padding-bottom:5px"
      >{{ app.customerName }}</v-card-title>
      <v-btn
        fab
        dark
        absolute
        bottom
        left
        color="darkPrimary"
        class="editButton"
        @click="edit(app)"
      >
        <v-icon dark>edit</v-icon>
      </v-btn>
    </v-card>
    <v-card class="pt-3 pl-2">
      <v-container pb-2>
        <div style="display: flex; align-items: center;" class="pb-2" v-if="app.startTime">
          <v-icon color="darkPrimary" class="pr-3">watch_later</v-icon>
          <span>{{ new Date(app.startTime).toLocaleString('en-gb', dateOptions)}}</span>
        </div>
        <div style="display: flex; align-items: center;" class="pb-2" v-if="app.phone">
          <v-icon color="darkPrimary" class="pr-3">phone</v-icon>
          <span>{{ app.phone }}</span>
        </div>
        <div style="display: flex; align-items: center;" class="pb-2" v-if="app.type">
          <v-icon :color="app.borderColor" class="pr-3">fiber_manual_record</v-icon>
          <span>{{ app.type.name }}</span>
        </div>
        <div style="display: flex; align-items: center;" class="pb-2" v-if="app.weddingDate">
          <v-icon color="darkPrimary" class="pr-3">wc</v-icon>
          <span>{{ new Date(app.weddingDate).toLocaleDateString('en-gb')}}</span>
        </div>
        <div style="display: flex; align-items: center;" class="pb-2" v-if="app.email">
          <v-icon color="darkPrimary" class="pr-3">email</v-icon>
          <span v-if="app.email">{{ app.email }}</span>
        </div>
        <div style="display: flex; align-items: flex-start" class="pb-2" v-if="app.notes">
          <v-icon color="darkPrimary" class="pr-3">comment</v-icon>
          <span v-if="app.notes">{{ app.notes }}</span>
        </div>
      </v-container>
    </v-card>
    <v-card>
      <v-container pa-2 ma-0 grid-list-sm>
        <v-subheader style="height:30px">
          Booking Confirmation
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon color="secondary" dark v-on="on">help</v-icon>
            </template>
            <span>Send when the appointment is first booked</span>
          </v-tooltip>
        </v-subheader>
        <v-layout row wrap>
          <v-flex xs6>
            <v-btn
              block
              :outline="app.bookingConfirmation != 0"
              color="secondary"
              dark
              @click="bookingConfirmation(0)"
            >None</v-btn>
          </v-flex>
          <v-flex xs6>
            <v-btn
              block
              :outline="app.bookingConfirmation != 1"
              color="secondary"
              dark
              @click="sendConfirmation()"
            >{{ app.bookingConfirmation == 1 ? 'Sent Text' : 'Send Text' }}</v-btn>
          </v-flex>
        </v-layout>
        <v-subheader style="height:30px">Appointment Reminder
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon color="secondary" dark v-on="on">help</v-icon>
            </template>
            <span>Send 1-2 days before the appointment. If they reply, it automatically confirms</span>
          </v-tooltip>
        </v-subheader>
        <v-layout row wrap>
          <v-flex xs4>
            <v-btn block :outline="app.status != 0" color="secondary" dark @click="status(0)">None</v-btn>
          </v-flex>
          <v-flex xs4>
            <v-btn
              block
              :outline="app.status != 1"
              color="error"
              dark
              @click="sendReminder()"
            >{{ app.status == 1 ? 'Sent' : 'Send' }}</v-btn>
          </v-flex>
          <v-flex xs4>
            <v-btn
              block
              :outline="app.status != 2"
              color="success"
              dark
              @click="status(2)"
            >Confirmed</v-btn>
          </v-flex>
        </v-layout>
        <v-subheader style="height:30px">Appointment Attendance
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon color="secondary" dark v-on="on">help</v-icon>
            </template>
            <span>Set if they turn up for their appointment</span>
          </v-tooltip>
        </v-subheader>
        <v-layout row wrap>
          <v-flex xs4>
            <v-btn
              block
              :outline="app.turnedUp != 0"
              color="secondary"
              dark
              @click="turnedUp(0)"
            >None</v-btn>
          </v-flex>
          <v-flex xs4>
            <v-btn
              block
              :outline="app.turnedUp != 1"
              color="error"
              dark
              @click="turnedUp(1)"
            >No Show</v-btn>
          </v-flex>
          <v-flex xs4>
            <v-btn
              block
              :outline="app.turnedUp != 2"
              color="success"
              dark
              @click="turnedUp(2)"
            >Turned Up</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-card>
</template>
<style media="screen">
.deleteButton {
  position: absolute;
  top: 5px;
  right: 40px;
}
</style>

<script>
import { mapState, mapActions } from "vuex";

import texting from "@/components/texting/texting";

export default {
  props: ["app"],
  components: {
    texting: texting
  },
  data() {
    return {
      deleteDialog: false,
      viewDialog: false,
      dateOptions: {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    updateStatus(status) {
      this.app.status = status;
    },
    edit(app) {
      this.$emit("edit", this.app);
    },
    remove() {
      if (this.deleteDialog) {
        this.$emit("remove", this.app);
        this.deleteDialog = false;
      } else {
        this.deleteDialog = true;
      }
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
    },
    enquiry() {
      this.$emit("enquiry");
    },
    sale() {
      this.$emit("sale");
    },
    status(val) {
      this.app.status = val;
      this.$emit("update");
    },
    turnedUp(val) {
      this.app.turnedUp = val;
      this.$emit("update");
    },
    sendConfirmation() {
      this.viewDialog = true
    },
    bookingConfirmation(val){
      this.app.bookingConfirmation = val
    },
    sendReminder() {
      this.viewDialog = true;
    },
    closeViewDialog() {
      this.viewDialog = false;
    }
  },
  mounted() {
    console.log(this.app);
  }
};
</script>
