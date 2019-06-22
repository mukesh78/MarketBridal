<template>
  <v-container fluid pa-3>
    <v-dialog
      v-if="newDialog"
      v-model="newDialog"
      :fullscreen="this.$vuetify.breakpoint.xs"
      max-width="500"
    >
      <new-employees
        :newObj="this.newObj"
        :employee="employee"
        :editingSaved="editingSaved"
        v-on:close="closeNewDialog"
        v-on:save="save"
        v-on:create="create"
        v-on:update="update"
        v-on:remove="remove"
      ></new-employees>
    </v-dialog>
    <v-dialog v-if="viewDialog" v-model="viewDialog" max-width="400">
      <view-employee
        :employee="employee"
        v-on:edit="edit"
        v-on:close="closeViewDialog"
        v-on:remove="remove"
      ></view-employee>
    </v-dialog>
    <v-card>
      <v-btn fab dark color="secondary" large fixed bottom right @click="add()">
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-toolbar color="transparent" flat class="pa-1">
        <div class="display-1 font-weight-medium">{{ pageTitle }}</div>
        <v-spacer></v-spacer>
        <v-badge color="red" overlap v-if="savedEmployee">
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
      <v-container fluid grid-list-xl>
        <v-data-iterator
          :items="staff.items"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          content-tag="v-layout"
          row
          wrap
          :loading="loading"
          :search="search"
        >
          <template v-slot:item="props">
            <v-flex xs12 sm6 md4 lg3>
              <v-hover>
              <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 16 : 5}`"
              @click="selectRow(props.item)"
           
              >
                <v-card-title>
                  <div class="title">{{ props.item.name }}</div>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense class="pa-0">
                  <v-list-tile style="background-color: #f9fafc">
                    <v-list-tile-content>Fhone</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.phone }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Email</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.email }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile style="background-color: #f9fafc">
                    <v-list-tile-content>Address</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.address }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>City</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.city }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile style="background-color: #f9fafc">
                    <v-list-tile-content>Postcode</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.postcode }}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
              </v-hover>
            </v-flex>
          </template>
        </v-data-iterator>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import newEmployees from "./newEmployees";
import viewEmployee from "./viewEmployee";
import employeeModel from "@/models/employee.js";

export default {
  components: {
    "new-employees": newEmployees,
    "view-employee": viewEmployee
  },
  data: () => ({
    pageTitle: "STAFF",
    employee: null,
    savedEmployee: null,
    editingSaved: false,
    newDialog: false,
    viewDialog: false,
    newObj: true,
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: 10
    },
    search: "",
    searchLabel: "Search Name",
    searchType: "name",
    dateOptions: {
      weekday: "long",
      month: "short",
      day: "numeric"
    }
  }),
  methods: {
    ...mapActions("staff", [
      "createEmployee",
      "fetchEmployees",
      "updateEmployee",
      "deleteEmployee"
    ]),
    closeNewDialog() {
      this.newDialog = false;
    },
    closeViewDialog() {
      this.viewDialog = false;
    },
    add() {
      this.employee = window.cloneDeep(employeeModel);
      this.editingSaved = false;
      this.newObj = true;
      this.newDialog = true;
    },
    selectRow(item) {
      this.employee = item;
      this.viewDialog = true;
    },
    save() {
      let parsed = JSON.stringify(this.employee);
      localStorage.setItem("employee", parsed);
      this.savedEmployee = this.employee;
      this.newDialog = false;
    },
    create(editingSaved) {
      this.createEmployee(this.employee).then(() => {
        this.newDialog = false;
        if (editingSaved) {
          localStorage.removeItem("employee");
          this.savedEmployee = null;
        }
      });
    },
    update() {
      this.updateEmployee(this.employee).then(() => {
        this.newDialog = false;
      });
    },
    edit(employee) {
      this.employee = window.cloneDeep(employee);
      this.editingSaved = false;
      this.newObj = false;
      this.newDialog = true;
      this.viewDialog = false;
    },
    remove(employee) {
      this.deleteEmployee(employee._id).then(() => {
        this.viewDialog = false;
        this.newDialog = false;
      });
    },
    saved() {
      this.employee = window.cloneDeep(this.savedEmployee);
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
    this.fetchEmployees();
    this.savedEmployee = JSON.parse(localStorage.getItem("employee"));
  },
  computed: {
    ...mapState({
      staff: state => state.staff
    }),
    loading() {
      return this.staff.loading;
    }
  }
};
</script>

