<template>
  <v-container fluid pa-3>
    <v-dialog v-if="newDialog" v-model="newDialog" :fullscreen="this.$vuetify.breakpoint.xs" max-width="800">
      <new-enquiry
        :newObj="this.newObj"
        :enquiry="enquiry"
        :editingSaved="editingSaved"
        v-on:close="closeNewDialog"
        v-on:save="save"
        v-on:create="create"
        v-on:update="update"
      ></new-enquiry>
    </v-dialog>
    <v-dialog v-if="viewDialog" v-model="viewDialog" :fullscreen="this.$vuetify.breakpoint.xs" max-width="400">
      <view-enquiry
        :enquiry="enquiry"
        v-on:edit="edit"
        v-on:close="closeViewDialog"
        v-on:remove="remove"
      ></view-enquiry>
    </v-dialog>
    <v-card>
      <v-btn fab dark color="secondary" large fixed bottom right @click="add()">
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-toolbar color="transparent" flat class="pa-1">
        <div class="display-1 font-weight-medium">{{ pageTitle }}</div>
        <v-spacer></v-spacer>
        <v-badge color="red" overlap v-if="savedEnquiry">
          <span slot="badge">!</span>
          <v-icon large color="black" @click="saved()">save</v-icon>
        </v-badge>
      </v-toolbar>
      <v-layout row wrap xs12 class="searchBar">
        <v-flex xs12 md8 xl6>
          <v-btn
            :color="this.searchType === 'name' ? 'secondary' : 'buttonGrey'"
            @click="filter('name')"
          >Name</v-btn>
          <v-btn
            :color="this.searchType === 'address' ? 'secondary' : 'buttonGrey'"
            @click="filter('address')"
          >Address</v-btn>
          <v-btn
            :color="this.searchType === 'postcode' ? 'secondary' : 'buttonGrey'"
            @click="filter('postcode')"
          >Postcode</v-btn>
          <v-btn
            :color="this.searchType === 'phone' ? 'secondary' : 'buttonGrey'"
            @click="filter('phone')"
          >Phone</v-btn>
          <v-btn
            :color="this.searchType === 'email' ? 'secondary' : 'buttonGrey'"
            @click="filter('email')"
          >Email</v-btn>
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
      <v-data-table
        :headers="headers"
        :items="enquiries.items"
        :search="search"
        class="elevation-1"
        :pagination.sync="pagination"
        :loading="loading"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
          <tr @click="selectRow(props.item)">
            <td class="text-xs-left" style="padding: 0px">
              <v-chip
                label
                disabled
                text-color="black"
                color="rgba(0, 0, 0, 0)"
              >{{ props.item.customerName }}</v-chip>
            </td>
            <td class="text-xs-left" style="padding: 0px">
              <v-chip
                label
                disabled
                text-color="black"
                color="rgba(0, 0, 0, 0)"
              >{{ props.item.address }}</v-chip>
            </td>
            <td class="text-xs-left" style="padding: 0px">
              <v-chip
                label
                disabled
                text-color="black"
                color="rgba(0, 0, 0, 0)"
              >{{ props.item.city }}</v-chip>
            </td>
            <td class="text-xs-center" style="padding: 0px">
              <v-chip
                label
                disabled
                text-color="black"
                color="rgba(0, 0, 0, 0)"
              >{{ props.item.postcode }}</v-chip>
            </td>
            <td class="text-xs-center" style="padding: 0px">
              <v-chip
                label
                disabled
                text-color="black"
                color="rgba(0, 0, 0, 0)"
              >{{ props.item.phone }}</v-chip>
            </td>
            <td class="text-xs-left" style="padding: 0px">
              <v-chip
                label
                disabled
                text-color="black"
                color="rgba(0, 0, 0, 0)"
              >{{ props.item.email }}</v-chip>
            </td>
          </tr>
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
import newEnquiry from "./newEnquiry";
import viewEnquiry from "./viewEnquiry";
import enquiryModel from "@/models/enquiry.js";

export default {
  components: {
    "new-enquiry": newEnquiry,
    "view-enquiry": viewEnquiry
  },
  data: () => ({
    pageTitle: "ENQUIRIES",
    enquiry: null,
    savedEnquiry: null,
    editingSaved: false,
    newDialog: false,
    viewDialog: false,
    newObj: true,
    pagination: {
      rowsPerPage: 10
    },
    search: "",
    searchLabel: "Search Name",
    searchType: "name",
    headers: [
      { text: "Name", value: "name", align: "left" },
      { text: "Address", value: "address", align: "left" },
      { text: "City", value: "city", align: "left" },
      { text: "Postcode", value: "postcode", align: "center" },
      { text: "Phone", value: "phone", align: "center" },
      { text: "Email", value: "email", align: "left" }
    ]
  }),
  methods: {
    ...mapActions("enquiries", [
      "createEnquiry",
      "fetchEnquiries",
      "updateEnquiry",
      "deleteEnquiry"
    ]),
    closeNewDialog() {
      this.newDialog = false;
    },
    closeViewDialog() {
      this.viewDialog = false;
    },
    add() {
      this.enquiry = window.cloneDeep(enquiryModel);
      this.newObj = true;
      this.newDialog = true;
    },
    selectRow(item) {
      this.enquiry = item;
      this.viewDialog = true;
    },
    save() {
      let parsed = JSON.stringify(this.enquiry);
      localStorage.setItem("enquiry", parsed);
      this.savedEnquiry = this.enquiry;
      this.newDialog = false;
    },
    create(editindSaved) {
      this.createEnquiry(this.enquiry).then(resp => {
        this.newDialog = false;
        if (editingSaved) {
          localStorage.removeItem("enquiry");
          this.savedEnquiry = null;
        }
      });
    },
    update() {
      this.updateEnquiry(this.enquiry).then(resp => {
        var index = this.items.findIndex(enquiry => {
          return this.enquiry._id === enquiry._id;
        });
        this.$set(this.items, index, this.employee);
        this.newDialog = false;
      });
    },
    edit(enquiry) {
      this.enquiry = window.cloneDeep(enquiry);
      this.editingSaved = false;
      this.newObj = false;
      this.newDialog = true;
      this.viewDialog = false;
    },
    remove(enquiry) {
      this.deleteEnquiry(enquiry._id);
      var index = this.items.findIndex(enquiry => {
        return this.enquiry._id === enquiry._id;
      });
      this.items.splice(index, 1);
      this.viewDialog = false;
      this.newDialog = false;
    },
    saved() {
      this.enquiry = window.cloneDeep(this.savedEnquiry);
      this.editingSaved = true;
      this.newObj = true;
      this.newDialog = true;
    },
    filter(type) {
      this.searchType = type;
      if (type === "name") {
        this.searchLabel = "Search Name";
      } else if (type === "address") {
        this.searchLabel = "Search Address";
      } else if (type === "postcode") {
        this.searchLabel = "Search Postcode";
      } else if (type === "phone") {
        this.searchLabel = "Search Phone";
      } else if (type === "email") {
        this.searchLabel = "Search Email";
      }
    }
  },
  mounted() {
    this.fetchEnquiries();
    this.savedEnquiry = JSON.parse(localStorage.getItem("enquiry"));

    if (this.$route.query.app && this.diary.app) {
      var app = this.diary.app;
      this.maxWidth = 600;
      this.enquiry = window.cloneDeep(enquiryModel);
      this.enquiry.customerName = app.customerName;
      this.enquiry.phone = app.phone;
      this.enquiry.weddingDate = new Date(app.weddingDate).toISOString().substr(0, 10),
      this.enquiry.email = app.email
      this.enquiry.app = app._id;
      this.enquiry.date = new Date(app.startTime).toISOString().substr(0, 10)
      this.enquiry.startTime = app.startTime.substr(11, 5);
      this.newObj = true;
      this.newDialog = true;
    } else if (this.$route.query.enquiry && this.diary.enquiry) {
      this.enquiry = this.diary.enquiry;
      this.viewDialog = true;
    } else if (this.$route.query.new) {
      this.add()
    }
  },
  computed: {
    ...mapState({
      account: state => state.account,
      enquiries: state => state.enquiries,
      diary: state => state.diary
    }),
    loading() {
      return this.enquiries.loading;
    }
  }
};
</script>