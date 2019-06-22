<template>
  <v-container>
    <v-dialog v-if="newDialog" v-model="newDialog" max-width="800">
      <new-enquiry 
        :newObj="this.newObj"
        :enquiry="enquiry"
        v-on:close="closeNewDialog"
        v-on:save="save"
        v-on:create="create"
        v-on:update="update"
      ></new-enquiry>
    </v-dialog>
     <v-dialog v-if="viewDialog" v-model="viewDialog" max-width="800">
      <view-enquiry
        :enquiry="enquiry"
        v-on:edit="edit"
        v-on:close="closeViewDialog"
        v-on:remove="remove"
      ></view-enquiry>
    </v-dialog>
    <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3 xl4 offset-xl4>
      <v-card>
        <div v-if="store">
          <v-card color="menu" dark>
            <v-container class="pa-2">
              <v-flex class="text-xs-center mb-2">
                <img src="@/assets/Brid.al.png" width="100">
              </v-flex>
              <v-flex>
                <div class="text-xs-center">
                  <span class="headline">{{ store.companyName }}</span>
                  <br>
                  <span class="subheading">{{ store.address }}</span>
                  <br>
                  <span class="subheading">{{ store.city }}</span>
                  <br>
                  <span class="subheading">{{ store.postcode }}</span>
                </div>
              </v-flex>
            </v-container>
          </v-card>

          
          <v-card flat color="menu">
            <v-divider dark></v-divider>
            <v-layout justify-center class="pa-2">
              <v-btn @click="newEnquiry()" outline color="white">Enquiry Form</v-btn>
              <v-btn @lcick="newAppRequest()" outline color="white">Request Appointment</v-btn>
            </v-layout>
            <v-divider dark></v-divider>
            <v-card>
              
              <v-toolbar flat>
                <v-btn icon @click="prev()">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-btn light @click="today()">Today</v-btn>
                <v-btn icon @click="next()">
                  <v-icon>chevron_right</v-icon>
                </v-btn>
                <v-spacer></v-spacer>

                <v-menu
                  ref="dateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="formattedDate"
                    label="Date"
                    prepend-icon="date_range"
                    readonly
                    
                    single-line
                    hide-details
                    style="max-width:200px"
                  ></v-text-field>
                  <v-date-picker
                    first-day-of-week="1"
                    v-model="date"
                    @change="saveDate"
                    ref="datePicker"
                  ></v-date-picker>
                </v-menu>
              </v-toolbar>

              <v-list subheader two-line>
                <v-subheader>Select your appointment
                  <v-spacer></v-spacer>
                  <v-btn icon @click="refresh()">
                    <v-icon>refresh</v-icon>
                  </v-btn>
                  </v-subheader>
                
                <div v-for="(item, index) in listApps" :key="index" :style="{ 'border-left': '' + item.colour + ' solid 5px' }">
              
                  <v-list-tile avatar ripple @click="selectedApp(item)">
                    
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.customerName }}</v-list-tile-title>
                      <v-list-tile-sub-title v-if="item.type">{{ item.type.name }}</v-list-tile-sub-title>
                      
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-list-tile-action-text>{{ new Date(item.startTime).toLocaleString('en-gb', timeOptions) }}</v-list-tile-action-text>
                      <!-- <v-list-tile-action-text v-if="item.weddingDate">{{ new Date(item.weddingDate).toLocaleString('en-gb', dateOptions) }}</v-list-tile-action-text> -->
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider></v-divider>
                </div>
              </v-list>
            </v-card>
          </v-card>
        </div>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment,{ min } from 'moment'
import newEnquiry from "@/components/enquiries/newEnquiry";
import viewEnquiry from "@/components/enquiries/viewEnquiry";
import enquiryModel from "@/models/enquiry.js";

export default {
  props: ["postcode"],
  components: { 
    'new-enquiry': newEnquiry ,
    'view-enquiry': viewEnquiry
  },
  data() {
    return {
      store: null,
      apps: [],
      listApps: [],
      noResult: null,
      dateMenu: false,
      date: new Date().toISOString().substr(0, 10),
      company: null,
      enquiry: null,
    savedEnquiry: null,
    editindSaved: false,
    newDialog: false,
    viewDialog: false,
    newObj: true,
      dateOptions: {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
      },
      timeOptions: {
        hour: "2-digit",
        minute: "2-digit"
      }
    };
  },
  computed: {
    ...mapState("account", ["status"]),
    formattedDate() {
      return this.formatDate(this.date);
    },
    appointmentTypes() {
      const types = this.company
        ? this.company.settings.appointmentTypes
        : [];
      return types;
    }
  },
  watch: {
    date(newVal, oldVal) {

      var oldStartDate = moment(oldVal).startOf('isoWeek')
      var oldEndDate = moment(oldVal).endOf('isoWeek')

      var newVal = moment(newVal)

      if(newVal._d < oldStartDate._d || newVal._d > oldEndDate._d) {

        var startDate = new Date(this.date).toISOString();
        var endDate = new Date(this.date).toISOString();

        this.getAppointments(startDate, endDate)
      } else {
        this.createList()
      }
    }
  },
  methods: {
    ...mapActions("account", ["getStore"]),
    ...mapActions("diary", ["fetchStoreAppointments"]),
    getAppointments(start, end) {
      this.fetchStoreAppointments({
        storeId: this.store._id,
        start: start,
        end: end
      }).then(resp => {
        this.apps = resp.apps
        this.createList()
      });
    },
    refresh() {
      var startDate = new Date(this.date).toISOString();
      var endDate = new Date(this.date).toISOString();

      this.getAppointments(startDate, endDate);
    },
    createList() {
      var apps = []

      var startDate = moment(this.date).startOf('day')
      var endDate = moment(this.date).endOf('day')

      this.apps.forEach((app, index) => {
        if(app._type === 'time') {

          var appStart = moment(app.startTime)
          var appEnd = moment(app.endTime)

          if(appStart._d >= startDate._d && appEnd._d <= endDate._d) {
            var type = this.getType(app.appType);
            app.type = type
            app.colour = type.borderColour

            apps.push(app)
          }
        }
      })
      this.listApps = apps
    },
    getType(type) {
      return this.appointmentTypes.find(cat => {
        return cat.name === type.name || cat._id == type._id;
      });
    },
    saveDate(date) {
      this.$refs.dateMenu.save(date);
    },
    next() {
      var d = new Date(this.date);
      d.setDate(d.getDate() + 1);
      this.date = new Date(d).toISOString().substr(0, 10);
    },
    prev() {
      var d = new Date(this.date);
      d.setDate(d.getDate() - 1);
      this.date = new Date(d).toISOString().substr(0, 10);
    },
    today() {
      this.date = new Date().toISOString().substr(0, 10);
    },
    selectedApp(app) {
      this.enquiry = window.cloneDeep(enquiryModel);
      this.enquiry.customerName = app.customerName
      this.enquiry.phone = app.phone
      this.enquiry.weddingDate = app.weddingDate
      this.enquiry.email = app.email
      this.newObj = true;
      this.newDialog = true;
    },
    newEnquiry() {
      this.enquiry = window.cloneDeep(enquiryModel);
      this.enquiry.customerName = app.customerName
      this.newObj = true;
      this.newDialog = true;
    },
    newAppRequest() {

    },
    closeNewDialog() {
      this.newDialog = false;
    },
    closeViewDialog() {
      this.viewDialog = false;
    },
    save() {
      let parsed = JSON.stringify(this.enquiry);
      localStorage.setItem("enquiry", parsed);
      this.savedEnquiry = this.enquiry;
      this.newDialog = false;
    },
    create(editindSaved) {
      this.createStoreEnquiry({
        storeId: this.account.user._default_store_id,
        enquiry: this.enquiry
        }).then(resp => {
        this.newDialog = false;
        this.items.push(resp.enquiry);
        if(editingSaved) {
          localStorage.removeItem("enquiry")
          this.savedEnquiry = null
        }
      });
    },
    update() {
      this.updateEnquiry(this.enquiry).then(resp => {
        var index = this.items.findIndex(enquiry => {
          return this.enquiry._id === enquiry._id
        })
        this.$set(this.items, index, this.employee)
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
        return this.enquiry._id === enquiry._id
      })
      this.items.splice(index, 1);
      this.viewDialog = false;
      this.newDialog = false;
    },
    saved() {
      this.enquiry = window.cloneDeep(this.savedEnquiry);
      this.editingSaved = true
      this.newObj = true;
      this.newDialog = true;
    },
  },
  mounted() {
    this.getStore(this.postcode).then(resp => {
      if (resp.company) {
        this.company = resp.company
        var matchingStore = resp.company.stores.find(element => {
          return element.postcode === this.postcode;
        });

        this.store = matchingStore;
        this.store.companyName = resp.company.companyName;
        this.noResult = false;

        var startDate = new Date(this.date).toISOString();
        var endDate = new Date(this.date).toISOString();

        this.getAppointments(startDate, endDate);
      } else {
        this.noResult = true;
        this.store = null;
      }
    });
  }
};
</script>