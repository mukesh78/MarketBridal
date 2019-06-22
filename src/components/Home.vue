<template>
  <v-container fluid grid-list-lg pa-3 :fill-height="dashboard.loading">
    <v-layout align-center justify-center row fill-height class="pt-3">
      <v-progress-circular
        :size="70"
        :width="7"
        color="secondary"
        indeterminate
        v-if="dashboard.loading"
      ></v-progress-circular>
    </v-layout>
    <div v-if="!dashboard.loading">
    <v-dialog v-if="newJobDialog" v-model="newJobDialog" :fullscreen="this.$vuetify.breakpoint.xs" max-width="500">
      <newJob
        :newObj="this.newJobObj"
        :job="job"
        v-on:close="closeNewJobDialog"
        v-on:create="createJob"
        v-on:update="updateJob"
        v-on:remove="removeJob"
      ></newJob>
    </v-dialog>
    <v-layout row wrap justify-space-around>
      <v-flex xs12 sm6 md3 mt-1 xl3 v-for="(item, index) in statsItems" :key="index">
        <dashboard-stats-card :item="item"></dashboard-stats-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card class="mt-4 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto pa-2"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <linechart
              style="height: 200px"
              :chartData="[[1076,2293,350,1156,3495,2493,1203], [2076,1293,850,156,2495, 987,1483]]"
              :chartLabels="['Monday','Tuesday','Wednesday','Thursday','Friday', 'Saturday', 'Sunday']"
            ></linechart>
          </v-sheet>

          <v-card-text class="pt-0">
            <v-layout>
              <v-flex xs6>
                <div class="title font-weight-light mb-2">Weekly Sales</div>
                <div class="subheading font-weight-light grey--text">01/01/2019 - 07/01/2019</div>
              </v-flex>
              <v-flex xs6>
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startDate"
                      label="Week"
                      prepend-inner-icon="event"
                      readonly
                      v-on="on"
                      solo
                      hide-details
                      single-line
                      style="max-width:150px;float:right"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    @input="menu2 = false"
                    :max="new Date().toISOString().substr(0, 10)"
                    :allowed-dates="val => new Date(val).getDay() == 1"
                    first-day-of-week="1"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
            <v-divider class="my-2"></v-divider>
            <div style="display:table; margin:15px 5px 15px 5px">
              <span
                style="display: table-cell; padding:5px; vertical-align: middle"
                class="progressText"
                v-bind:style="getProgress()"
              >{{ salesTotal | currency('£',0) }}</span>
              <div style="display: table-cell; width:100%; vertical-align: middle">
                <v-progress-linear
                  color="cyan"
                  height="20"
                  :value="(salesTotal / target)*100"
                  class="pa-0 ma-0"
                  style="width:100%"
                ></v-progress-linear>
              </div>
              <span
                style="display: table-cell; padding:5px; vertical-align: middle"
                class="progressText"
              >{{ target | currency('£',0) }}</span>
            </div>
            
            <v-divider></v-divider>
            <v-icon class="mr-2" small>mdi-clock</v-icon>
            <span class="caption grey--text font-weight-light">last sale 26 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card class="mt-4 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto pa-2"
            color="primary"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <barchart
              style="height: 200px"
              :chartData="[[82.8,95.5,56,42,68,33,87], [65,91,76,34,55,87,72]]"
              :chartLabels="['Monday','Tuesday','Wednesday','Thursday','Friday', 'Saturday', 'Sunday']"
            ></barchart>
          </v-sheet>
          <v-card-text class="pt-0">
            <v-layout>
              <v-flex xs6>
                <div class="title font-weight-light mb-2">Conversion</div>
                <div class="subheading font-weight-light grey--text">01/01/2019 - 07/01/2019</div>
              </v-flex>
              <v-flex xs6>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startDate"
                      label="Week"
                      prepend-inner-icon="event"
                      readonly
                      v-on="on"
                      solo
                      hide-details
                      single-line
                      style="max-width:150px;float:right"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    @input="menu2 = false"
                    :max="new Date().toISOString().substr(0, 10)"
                    :allowed-dates="val => new Date(val).getDay() == 1"
                    first-day-of-week="1"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
            <v-divider class="my-2"></v-divider>
            <v-layout align-center justify-space-around row>
            <v-progress-circular
              :rotate="-90"
              :size="90"
              :width="10"
              :value=80
              color="primary"
            >
              <div class="text-xs-center"><span class="caption">Today</span><br>80%</div>
            </v-progress-circular>
            <v-progress-circular
              :rotate="-90"
              :size="90"
              :width="10"
              :value=72
              color="primary"
            >
              <div class="text-xs-center">This Week 72%</div>
            </v-progress-circular>
            <v-progress-circular
              :rotate="-90"
              :size="90"
              :width="10"
              :value=65
              color="primary"
            >
              <div class="text-xs-center">Last Week 65%</div>
            </v-progress-circular>
            </v-layout>
            
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="mt-4 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto pa-2"
            color="#ecaed1"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <span class="display-1 font-weight-thin white--text">Sales</span>
            <v-btn icon small color="#FFFFFFCC" style="float:right" @click="newSale()">
              <v-icon color="#ecaed1">add</v-icon>
            </v-btn>
          </v-sheet>
          <v-list subheader three-line>
            <template v-for="(item, index) in dashboard.sales">
              <v-list-tile
              :key="item._id"
              avatar
              ripple
              @click="viewSale(item)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.customer.customerNo }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.customer.name }}</v-list-tile-sub-title>
                <v-list-tile-sub-title><span v-for ="(saleItem, index1) in item.items" :key="index1"> {{ saleItem.category.name }} - {{ saleItem.code }}</span></v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>{{ timeFromNow(item.createdAt) }}</v-list-tile-action-text>
                <v-list-tile-action-text>£{{ item.total }}</v-list-tile-action-text>
                <v-list-tile-action-text>{{ item.employee.name }}</v-list-tile-action-text>
              </v-list-tile-action>

            </v-list-tile>
            
               <v-divider
                v-if="index + 1 < dashboard.sales.length"
                :key="index"
              ></v-divider>
              </template>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="mt-4 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto pa-2"
            color="#acebdc"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <span class="display-1 font-weight-thin white--text">Enquiries</span>
            <v-btn icon small color="#FFFFFFCC" style="float:right" @click="newEnquiry()">
              <v-icon color="#acebdc">add</v-icon>
            </v-btn>
          </v-sheet>
          <v-list subheader two-line>
            <template v-for="(item, index) in dashboard.enquiries">
              <v-list-tile
              :key="item._id"
              avatar
              ripple
              @click="viewEnquiry(enquiry)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.customerName }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ new Date(item.weddingDate).toLocaleString('en-gb', dateOptions) }}</v-list-tile-sub-title>
                <v-list-tile-sub-title><span v-for="(found, index1) in item.foundUs" :key="index1"> {{ found }}</span></v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>{{ timeFromNow(item.enquiryDate) }}</v-list-tile-action-text>
                <v-list-tile-action-text><span v-for="(budget, index2) in item.budget" :key="index2"> {{ budget }}</span></v-list-tile-action-text>
                <v-list-tile-action-text>{{ item.employee.name }}</v-list-tile-action-text>
              </v-list-tile-action>

            </v-list-tile>
            
               <v-divider
                v-if="index + 1 < salesItems.length"
                :key="index"
              ></v-divider>
              </template>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="mt-4 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto pa-2"
            color="secondary"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <span class="display-1 font-weight-thin white--text">Daily Checklist</span>
            <v-btn icon small color="#FFFFFFCC" style="float:right" @click="newJob()">
              <v-icon color="secondary">add</v-icon>
            </v-btn>
          </v-sheet>
          <v-list subheader three-line>
            <!-- <v-subheader>Hangout notifications</v-subheader> -->
            <v-list-tile
              v-for="(item, index) in dashboard.jobs"
              :key="index"
              @click="viewJob(item)"
            >
              <v-list-tile-action>
                <v-checkbox v-model="item.completed" @click.stop="item.completed = !item.completed"></v-checkbox>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.text }}</v-list-tile-sub-title>
              </v-list-tile-content>

            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <v-layout row wrap mt-2>
      <v-flex xs12 md6 mt-3 v-for="(item, index) in tableItems" :key="index">
        <dashboard-table-card :item="item"></dashboard-table-card>
      </v-flex>
    </v-layout>-->
    </div>
  </v-container>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment,{ min } from 'moment'

import dashboardStatsCard from "./DashboardStatsCard";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import Job from './Job.vue'

export default {
  components: {
    "dashboard-stats-card": dashboardStatsCard,
    linechart: LineChart,
    barchart: BarChart,
    newJob: Job,
  },
  data() {
    return {
      target: 12342,
      totalConversion: 80,
      targetConversion: 75,
      startDate: this.startOfWeek()
        .toISOString()
        .substr(0, 10),
      menu1: false,
      menu2: false,
      newJobDialog: false,
      newJobObj: true,
      values: [
        { day: "M", amount: 1789 },
        { day: "T", amount: 2000 },
        { day: "W", amount: 895 },
        { day: "T", amount: 1459 },
        { day: "F", amount: 1200 },
        { day: "S", amount: 3800 },
        { day: "S", amount: 2800 }
      ],
      dateOptions: {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
      },
      salesItems: [
        {
          customerNo: "C19-0012",
          name: "Ben Wilson",
          amount: 995,
          time: '5 min'
        },
        {
          customerNo: "C19-0012",
          name: "Ben Wilson",
          amount: 995,
          time: '15 min'
        }
      ]
    };
  },
  methods: {
    ...mapActions('texting', ['getCredits', 'sendSMS']),
    ...mapActions('dashboard', ['fetchData']),
    getProgress() {
      return {
        "margin-right": 100 - (this.total / this.target) * 100 + "%"
      };
    },
    startOfWeek() {
      var date = new Date();
      var diff =
        date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
      return new Date(date.setDate(diff));
    },
    timeFromNow(date) {
      return moment(date).fromNow()
    },
    newSale() {
      this.$router.push({ path: '/customers', query: { new: true }})
    },
    newEnquiry() {
      this.$router.push({ path: '/enquiries', query: { new: true }})
    },
    newJob() {
      this.job = {
        date: new Date().toISOString().substr(0, 10),
        notes: '',
        employee: null
      }
      this.newJobDialog = true
    },
    viewJob(item) {

    },
    updateJob() {

    },
    createJob() {

    },
    removeJob() {

    },
     closeNewJobDialog() {
      this.newJobDialog = false;
    },
    viewSale(sale) {
      this.$router.push("/customers/" + sale.customer._id);
    },
    viewEnquiry(enquiry){

    }
  },
  mounted() {
    // this.getCredits()
    // this.sendSMS()
    this.fetchData(this.date);
  },
  watch: {
    date(val) {
      this.fetchData(val);
    },
    'account.store': function(value) {
      this.fetchData(this.date)
    }
  },
  computed: {
    ...mapState({
      dashboard: state => state.dashboard,
      account: state => state.account,
    }),
    date() {
      return this.dashboard.date
    },
    salesTotal() {
      return this.dashboard.sales.reduce((a, b) => +(parseFloat(a) || 0) + (parseFloat(b.total) || 0),0)
    },
    statsItems(){
      return [
        {
          icon: "show_chart",
          title: this.dashboard.sales.length == 1 ? "Sale" : "Sales",
          count: this.dashboard.sales.length,
          value: "£" + this.salesTotal,
          color: "#ed8438"
        },
        {
          icon: "monetization_on",
          title: this.dashboard.payments.length == 1 ? "Payment Due" : "Payments Due",
          count: this.dashboard.payments.length,
          value: "£" + this.dashboard.payments.reduce((a, b) => +(parseFloat(a) || 0) + (parseFloat(b.amount) || 0),0),
          color: "#9575CD"
        },
        {
          icon: "event",
          title: "Appointment Requests",
          count: "",
          value: this.dashboard.appointments.length,
          color: "#4DB6AC"
        },
        {
          icon: "account_box",
          title: "Enquiries",
          count: "",
          value: this.dashboard.enquiries.length,
          color: "#FFB74D"
        }
      ]
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.progressText {
  text-align: right;
  font-size: 18px;
  opacity: 0.4;
}

.cardIconLeft {
  top: 4px;
  left: 20px;
  height: 50px;
  min-width: 0;
  padding: 4px;
  width: 50px;
}
.cardIconRight {
  top: -12px;
  right: 12px;
  height: 50px;
  min-width: 0;
  padding: 4px;
  width: 50px;
}

.dashTitle {
  opacity: 0.2;
  font-size: 1.2em;
  bottom: -15px;
  position: relative;
  margin: 0px;
  font-family: "Avenir-Medium";
}

.dashTitleRight {
  opacity: 0.2;
  font-size: 1.2em;
  bottom: -15px;
  right: 12px;
  position: relative;
  font-family: "Avenir-Medium";
}

.dashCount {
  opacity: 0.5;
  position: relative;
  font-size: 4.5em;
  left: -10px;
  font-family: "Avenir-Medium";
  vertical-align: middle;
}

.dashHeader {
  height: 50px;
}

.cardProgress {
  position: absolute;
  top: -20px;
  left: 15px;
  height: 150px;
  min-width: 0;
  right: 15px;
  display: flex;
  padding: 0px;
}

.progress {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}

.progressTitle {
  text-align: right;
  font-size: 18px;
  opacity: 0.4;
  width: 55%;
  position: absolute;
  right: 12px;
  top: 4px;
}

.progressValue {
  text-align: right;
  font-size: 30px;
  opacity: 0.75;
  position: absolute;
  bottom: 4px;
  right: 12px;
  width: 50%;
  font-weight: 100;
}

.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
