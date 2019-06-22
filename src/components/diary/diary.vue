<template>
  <v-container fluid pa-3 style="height:100%">
    <v-dialog v-if="newDialog" v-model="newDialog" :fullscreen="this.$vuetify.breakpoint.xs" max-width="500">
      <new-app
        :newObj="this.newObj"
        :app="appointment"
        :editingSaved="editingSaved"
        v-on:close="closeNewDialog"
        v-on:save="save"
        v-on:create="create"
        v-on:update="update"
        v-on:remove="remove"
      ></new-app>
    </v-dialog>
    <v-dialog v-if="viewDialog" v-model="viewDialog" persistent max-width="400">
      <view-app
        :app="appointment"
        v-on:close="closeViewDialog"
        v-on:edit="edit"
        v-on:remove="remove"
        v-on:enquiry="enquiry"
        v-on:update="update"
        v-on:sale="sale"
        v-if="appointment._type === 'time'"
      ></view-app>
      <view-task
        :app="appointment"
        v-on:close="closeViewDialog"
        v-on:edit="edit"
        v-on:remove="remove"
        v-on:update="update"
        v-if="appointment._type === 'task'"
      ></view-task>
    </v-dialog>
    <v-card style="max-height: 100%; height: 100%">
      <v-btn v-if="diaryView !== 'day'" fab dark color="secondary" large fixed bottom right @click="add()">
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-speed-dial
      v-if="diaryView === 'day'"
      v-model="fab"
      bottom
      right
      open-on-hover
      fixed
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="secondary"
          dark
          fab
          large
        >
          <v-icon>add</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        color="indigo"
        @click="add()"
      >
        <v-icon>event</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        color="green"
        @click="message()"
      >
        <v-icon>message</v-icon>
      </v-btn>
    </v-speed-dial>
      <v-layout row wrap style="max-height: 100%; height: 100%">
        <v-flex xs12 md4 lg3 xl2 style="border-right: 1px solid #F5F5F5;">
          <v-card style="height: 100%" color="menu">
            <v-card dark flat color="transparent" class="pa-3 text-xs-center">
              <span class="display-1 font-weight-medium">{{ pageTitle }}</span>
            </v-card>
            <!-- <v-toolbar dark flat color="transparent">
              <v-spacer></v-spacer>
              <v-btn icon @click="prev()">
                <v-icon>chevron_left</v-icon>
              </v-btn>
              <v-btn light @click="today()">Today</v-btn>
              <v-btn icon @click="next()">
                <v-icon>chevron_right</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-toolbar> -->
            <v-date-picker header-color="menu" color="secondary" flat full-width v-model="date" first-day-of-week="1"></v-date-picker>
            <v-card flat color="transparent">
              <h2 class="header">Summary</h2>
            </v-card>
            <div class="pa-2">
              <div v-for="(item, i) in categories" :key="i">
                <v-chip
                  v-if="item.count>0"
                  :color="item.colour"
                  class="appCount"
                  style="padding:0px !important; border:1px white solid"
                  text-color="black"
               
                >
                  <!-- <v-avatar color="white"> -->
                    <v-avatar :color="item.borderColour" style="border:1px white solid">
                      <span class="black--text subheading font-weight-bold">{{ item.count }}</span>
                    </v-avatar>
                  <!-- </v-avatar> -->
                  {{ item.name }}
                </v-chip>
              </div>
            </div>
          </v-card>
        </v-flex>
        <v-flex xs12 md8 lg9 xl10>
          <!-- <v-toolbar wrap> -->
          <v-layout row wrap align-center pa-2>
            <v-btn dark color="secondary" @click="today()">Today</v-btn>
            <v-btn-toggle v-model="diaryView">
              <v-btn flat value="day" :color="this.diaryView === 'day' ? 'secondary' : ''">Day</v-btn>
              <v-btn
                
                flat
                value="week"
                :color="this.diaryView === 'week' ? 'secondary' : ''"
              >Week</v-btn>
            </v-btn-toggle>
            
            <v-spacer></v-spacer>
            <v-layout row justify-end>
              <v-chip color="red" text-color="white" v-if="this.categories.length == 0">
                <v-avatar>
                  <v-icon>error</v-icon>
                </v-avatar>Please select at least 1
              </v-chip>
              <v-icon
                v-for="(item, i) in categories"
                :key="i"
                :color="item.borderColour"
                class="hidden-xs-only"
              >fiber_manual_record</v-icon>
            </v-layout>
            <v-menu bottom left :close-on-content-click="false">
              <v-btn slot="activator" icon>
                <v-icon large>arrow_drop_down_circle</v-icon>
              </v-btn>

              <v-list>
                <v-list-tile ripple @click="toggleCategories">
                  <v-list-tile-action>
                    <v-icon :color="categories.length > 0 ? 'secondary' : ''">{{ icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>Select All</v-list-tile-title>
                </v-list-tile>
                <v-divider slot="prepend-item" class="mt-2"></v-divider>
                <v-list-tile
                  ripple
                  v-for="(item, i) in appointmentTypes"
                  :key="i"
                  @click="toggleCategory(item)"
                >
                  <v-list-tile-action>
                    <v-icon
                      color="secondary"
                    >{{ categories.includes(item) ? 'check_box' : 'check_box_outline_blank' }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>
                    <v-icon :color="item.borderColour">fiber_manual_record</v-icon>
                    {{item.name}}
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>

            <v-btn :color=" searching ? 'secondary' : 'transparent'" icon large>
              <v-icon large @click="toggleSearch()">search</v-icon>
            </v-btn>
            <v-badge color="red" overlap class="ma-2">
              <span slot="badge">2</span>
              <v-icon large color="black">event</v-icon>
            </v-badge>
            <v-badge color="red" overlap class="ma-2" v-if="savedApp">
              <span slot="badge">!</span>
              <v-icon large color="black" @click="saved()">save</v-icon>
            </v-badge>
          </v-layout>
          <v-layout row wrap v-if="searching" class="searchBarDiary">
            <v-flex xs12 md8 xl6>
              <v-btn
                :color="this.searchType === 'name' ? 'secondary' : 'buttonGrey'"
                @click="filter('name')"
              >Name</v-btn>
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
          <div style="height:90%">
            <calendar
              style="height:100%"
              ref="tuiCalendar"
              :calendars="calendarList"
              :schedules="scheduleList"
              :view="diaryView"
              :taskView="taskView"
              :scheduleView="scheduleView"
              :theme="theme"
              :timezones="timezones"
              :disableDblClick="disableDblClick"
              :isReadOnly="isReadOnly"
              :template="template"
              :useCreationPopup="useCreationPopup"
              :useDetailPopup="useDetailPopup"
              :week="weekOptions"
              @afterRenderSchedule="onAfterRenderSchedule"
              @beforeCreateSchedule="onBeforeCreateSchedule"
              @beforeDeleteSchedule="onBeforeDeleteSchedule"
              @beforeUpdateSchedule="onBeforeUpdateSchedule"
              @clickSchedule="onClickSchedule"
              
            />
          </div>
        </v-flex>
        
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

import "tui-calendar/dist/tui-calendar.css";
import { Calendar } from "@toast-ui/vue-calendar";
import viewApp from "./viewApp";
import viewTask from "./viewTask";
import newApp from "./newApp";
import moment,{ min } from 'moment'

export default {
  name: "myCalendar",
  components: {
    calendar: Calendar,
    "view-app": viewApp,
    "view-task": viewTask,
    "new-app": newApp
  },
  props: ["app"],
  data() {
    return {
      pageTitle: "DIARY",
      fab: false,
      appointment: null,
      savedApp: null,
      editingSaved: false,
      newDialog: false,
      viewDialog: false,
      newObj: true,
      categories: [],
      searching: false,
      search: "",
      daySwitch: false,
      searchLabel: "Search Name",
      searchType: "name",
      date: new Date().toISOString().substr(0, 10),
      calendarList: [
        {
          id: "0",
          name: "home"
        }
      ],
      dateOptions: {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      },
      scheduleList: [],
      diaryView:
        localStorage.getItem("diaryView") !== null
          ? localStorage.getItem("diaryView")
          : "day",
      diaryViews: ["Day", "Week"],
      taskView: ["task"],
      scheduleView: ["time"],
      theme: {
        "week.today.color": "#0086E7",
        "week.dayname.height": "42px",
        "common.holiday.color": "black",
        "week.timegridOneHour.height": "80px",
        "week.pastDay.color": "black"
      },
      timezones: [
        {
          timezoneOffset: 1,
          displayLabel: "GMT+01:00",
          tooltip: "London"
        }
      ],
      weekOptions: {
        hourStart: 8,
        hourEnd: 18,
        startDayOfWeek: 1
      },
      disableDblClick: true,
      isReadOnly: false,
      template: {
        milestone: function(schedule) {
          return `<span>${schedule.title}</span>`;
        },
        milestoneTitle: function() {
          return "MILESTONE";
        },
        task: function(schedule) {
          return `<span>${schedule.title}</span>`;
        },
        time: function(schedule) {

          var html = ``
          if(schedule.raw.app.status == 1) {
            html += `<i style="float:right;width:10px;height:10px; margin-left:5px; margin-right:20px; margin-bottom:10px" class="material-icons">email</i>`
          } else if(schedule.raw.app.status == 2) {
            html += `<i style="float:right;width:10px;height:10px; margin-left:5px; margin-right:20px; margin-bottom:10px" class="material-icons">check_circle</i>`
          }

          if(schedule.raw.app.turnedUp == 1) {
            html += `<div style="position:absolute;top:0px;right:0px;width:5px;height:100%;background-color:red"></div>`
          } else if(schedule.raw.app.turnedUp == 2) {
            html += `<div style="position:absolute;top:0px;right:0px;width:5px;height:100%;background-color:green"></div>`
          }
  
          return html += `<div>
                <span>${schedule.title}</span>
                <br>
                <span>${new Date(
                  schedule.raw.app.weddingDate
                ).toLocaleDateString("en-gb")}<span>
                <br>
                <span>${schedule.raw.app.phone}</span>
                <br>
                <span>${schedule.raw.app.notes}</span>
                <br>
                <span>${schedule.raw.app.email}</span>
                </div>`;
          
        }
      },
      useCreationPopup: false,
      useDetailPopup: false
    };
  },
  watch: {
    date(val) {

      var oldStart = this.$refs.tuiCalendar.invoke("getDateRangeStart");
      var oldEnd = this.$refs.tuiCalendar.invoke("getDateRangeEnd");

      var oldStartDate = moment(oldStart._date).startOf('isoWeek')
      var oldEndDate = moment(oldEnd._date).endOf('isoWeek')

      this.$refs.tuiCalendar.invoke("setDate", val);

      var oldVal = moment(val)

      if(oldVal._d < oldStartDate._d || oldVal._d > oldEndDate._d) {

        var start = this.$refs.tuiCalendar.invoke("getDateRangeStart");
        var end = this.$refs.tuiCalendar.invoke("getDateRangeEnd");

        var startDate = new Date(start._date).toISOString();
        var endDate = new Date(end._date).toISOString();

        console.log("API CALL")
        this.getAppointments(startDate, endDate)
      } else {
        this.createSchedule()
      }
    },
    diaryView(val) {
      localStorage.setItem("diaryView", val);
      this.createSchedule()
    },
    apps(val) {
      this.createSchedule();
    },
    categories(val) {
      this.createSchedule();
    }
  },
  mounted() {
    var start = this.$refs.tuiCalendar.invoke("getDateRangeStart");
    var end = this.$refs.tuiCalendar.invoke("getDateRangeEnd");

    var startDate = new Date(start._date).toISOString();
    var endDate = new Date(end._date).toISOString();

    this.getAppointments(startDate, endDate);
    this.savedApp = JSON.parse(localStorage.getItem("appointment"));
  },
  methods: {
    ...mapActions("diary", [
      "fetchAppointments",
      "createAppointment",
      "updateAppointment",
      "deleteAppointment",
      "addApp",
      "getEnquiry"
    ]),
    getAppointments(start, end) {
      this.fetchAppointments({
        start: start,
        end: end
      });
    },
    createSchedule() {
      this.scheduleList = [];
      this.categories.map(cat => {
        cat.count = 0;
      });

      var start = this.$refs.tuiCalendar.invoke("getDateRangeStart");
      var end = this.$refs.tuiCalendar.invoke("getDateRangeEnd");
      if(this.diaryView === 'day') {
        var startDate = moment(this.date).startOf('day')
        var endDate = moment(this.date).endOf('day')
      } else {
        var startDate = moment(this.date).startOf('isoWeek')
        var endDate = moment(this.date).endOf('isoWeek')
      }

      this.apps.forEach((app, index) => {
        if(app._type == 'task') {
          var schedule = {
            id: index,
            calendarId: "1",
            title: app.notes,
            category: app._type,
            start: new Date(app.startTime),
            end: new Date(app.startTime),
            bgColor: "#E0E0E0",
            color: "black",
            borderColor: app.completed ? "#4CAF50" : "#FF5252",
            dragBgColor: "black",
            raw: {
              app
            }
          }
          this.scheduleList.push(schedule);
        } else {

          var appStart = moment(app.startTime)
          var appEnd = moment(app.endTime)

          var type = this.getType(app.appType);
          var cat = this.categories.find(cat => cat._id === type._id);
          if (cat) {
            
            if(appStart._d >= startDate._d && appEnd._d <= endDate._d) {
              cat.count += 1;
              app.type = type;
              var schedule = {
                id: index,
                calendarId: "1",
                title: app.customerName,
                category: app._type,
                start: new Date(app.startTime),
                end: new Date(app.endTime),
                bgColor: type && type.colour ? type.colour : "",
                color: "black",
                borderColor: type && type.borderColour ? type.borderColour : "",
                dragBgColor: type && type.borderColour ? type.borderColour : "",
                raw: {
                  app
                }
              };
              this.scheduleList.push(schedule);
            }
          }
        }
        
      });
    },
    toggleCategories() {
      this.$nextTick(() => {
        if (this.allCategories) {
          this.categories = [];
        } else {
          this.categories = this.appointmentTypes.slice();
        }
      });
    },
    toggleCategory(category) {
      var index = this.categories.findIndex(cat => {
        return cat._id === category._id;
      });
      if (index == -1) {
        this.categories.push(category);
      } else {
        this.categories.splice(index, 1);
      }
    },
    toggleSearch() {
      this.searching = !this.searching;
    },
    filter(type) {
      this.searchType = type;
      if (type === "name") {
        this.searchLabel = "Search Name";
      } else if (type === "phone") {
        this.searchLabel = "Search Phone";
      } else if (type === "email") {
        this.searchLabel = "Search Email";
      }
    },
    closeViewDialog() {
      this.viewDialog = false;
    },
    closeNewDialog() {
      this.newDialog = false;
    },
    save() {
      let app = this.createApp();
      let parsed = JSON.stringify(app);
      localStorage.setItem("appointment", parsed);
      this.savedApp = app;
      this.newDialog = false;
    },
    create(editingSaved) {
      let app = this.createApp();
      this.createAppointment(app).then(() => {
        this.newDialog = false;
        if (editingSaved) {
          localStorage.removeItem("appointment");
          this.savedApp = null;
        }
      });
    },
    update() {
      let app = this.createApp();
      this.updateAppointment(app).then(() => {
        this.newDialog = false;
      });
    },
    createApp() {
      var app = this.appointment
      if(app._type == 'task'){
        var startTime = new Date(
          app.date + "T" + "10:00+00:00"
        );

        let appointment = {
          startTime: startTime,
          employee: app.employee
            ? {
                _id: app.employee._id,
                name: app.employee.name
              }
            : "",
          notes: app.notes,
          _type: app._type,
          completed: app.completed,
          _id: app._id
        }
        console.log(appointment)
        return appointment;

      } else {
        var startTime = new Date(
          app.date + "T" + app.start + ":00+00:00"
        );
        var endTime = new Date(
          app.date + "T" + app.end + ":00+00:00"
        );

        let appointment = {
          startTime: startTime,
          endTime: endTime,
          customerName: app.title,
          appType: app.appType
            ? {
                _id: app.appType._id,
                name: app.appType.name
              }
            : "",
          employee: app.employee
            ? {
                _id: app.employee._id,
                name: app.employee.name
              }
            : "",
          notes: app.notes,
          weddingDate: app.weddingDate,
          phone: app.phone,
          bookingType: app.bookingType,
          email: app.email,
          customerName: app.customerName,
          status: app.status,
          turnedUp: app.turnedUp,
          _type: app._type,
          _id: app._id
        };
        return appointment;
      }

    },
    edit(app) {
      this.convertToApp(app)
      this.editingSaved = false;
      this.newObj = false;
      this.newDialog = true;
      this.viewDialog = false;
    },
    convertToApp(app) {
      if(app._type=="task") {
        app.date = new Date(app.startTime).toISOString().substr(0, 10)
        this.appointment = app
      } else {
        app.date = new Date(app.startTime).toISOString().substr(0, 10)
        app.start = app.startTime.substr(11, 5)
        app.end = app.endTime.substr(11, 5)
        app.weddingDate = new Date(app.weddingDate).toISOString().substr(0, 10)
        app.selected = true
        this.appointment = app
      };
    },
    remove(app) {
      this.deleteAppointment(app.raw.app._id).then(() => {
        this.viewDialog = false;
        this.newDialog = false;
      });
    },
    saved() {
      this.appointment = window.cloneDeep(this.savedApp);
      this.editingSaved = true;
      this.newObj = true;
      this.newDialog = true;
    },
    getType(type) {
      return this.appointmentTypes.find(cat => {
        return cat.name === type.name || cat._id == type._id;
      });
    },
    makeToday(date) {
      var time = new Date(date);
      var d = new Date();
      d.setHours(time.getHours());
      d.setMinutes(time.getMinutes());
      d.setSeconds(time.getSeconds());
      return d;
    },
    next() {
      var d = this.$refs.tuiCalendar.invoke("getDate");
      d.setDate(d.getDate() + 1);
      this.date = new Date(d).toISOString().substr(0, 10);
    },
    prev() {
      var d = this.$refs.tuiCalendar.invoke("getDate");
      d.setDate(d.getDate() - 1);
      this.date = new Date(d).toISOString().substr(0, 10);
    },
    today() {
      this.date = new Date().toISOString().substr(0, 10);
    },
    onAfterRenderSchedule(e) {
      // var hours = this.$refs.tuiCalendar.$el.getElementsByClassName("tui-full-calendar-timegrid-gridline");
      // for (var i = 0; i < hours.length; i++) {
      //     // hours[i].style.backgroundColor = "red";
      //     var icon = document.createElement('i');
      //     icon.className = "material-icons"
      //     hours[i].appendChild(icon);
      //     hours[i].appendChild(document.createTextNode('test'))
      // }
    },
    onBeforeCreateSchedule(e) {
      // CREATE APP FROM CLICKING
      console.log(e)
    },
    onBeforeDeleteSchedule(e) {
      // implement your code
      // cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
      this.$refs.tuiCalendar.invoke(
        "deleteSchedule",
        e.schedule.id,
        e.schedule.calendarId
      );
    },
    onBeforeUpdateSchedule(e) {
      // implement your code
      var elementPos = this.scheduleList
        .map(function(x) {
          return x.id;
        })
        .indexOf(e.schedule.id);

      if (elementPos > -1) {
        this.scheduleList[elementPos].start = new Date(e.start);
        this.scheduleList[elementPos].end = new Date(e.end);
        this.$set(this.scheduleList, elementPos, this.scheduleList[elementPos]);
      }
      e.schedule.start = e.start;
      e.schedule.end = e.end;
      // this.updateScheduleList(e.schedule.id, e.schedule.calendarId, e.schedule);
      // this.$refs.tuiCalendar.invoke('updateSchedule', e.schedule.id, e.schedule.calendarId, e.schedule)
      let app = e.schedule.raw.app;
      let appointment = {
        startTime: new Date(e.start),
        endTime: new Date(e.end),
        _id: app._id
      };
      this.updateAppointment(appointment);
    },
    onClickSchedule(e) {
      this.convertToApp(e.schedule.raw.app);
      this.appointment.bgColor = e.schedule.bgColor
      this.appointment.borderColor = e.schedule.borderColor
      this.viewDialog = true;
    },
    add() {
      this.appointment = {
        customerName: "",
        notes: "",
        email: "",
        phone: "",
        date: new Date().toISOString().substr(0, 10),
        start: "10:00",
        end: "11:00",
        appType: null,
        bookingType: null,
        employee: null,
        weddingDate: null,
        _type: "time"
      };
      this.editingSaved = false;
      this.newObj = true;
      this.newDialog = true;
    },
    enquiry() {
      if(this.appointment.enquiry) {
        this.getEnquiry(this.appointment.enquiry).then(() => {
          this.$router.push({ path: '/enquiries', query: { enquiry: true }})
        })
      } else {
        this.addApp(this.appointment)
        this.$router.push({ path: '/enquiries', query: { app: true }})
      }
    },
    sale() {
      if(this.appointment.enquiry) {
        this.getEnquiry(this.appointment.enquiry).then(() => {
          this.$router.push({ path: '/customers', query: { enquiry: true }})
        })
      } else {
        this.addApp(this.appointment)
        this.$router.push({ path: '/customers', query: { app: true }})
      }
    },
    message() {
      
    }
  },
  computed: {
    ...mapState({
      account: state => state.account,
      diary: state => state.diary,
      dashboard: state => state.dashboard
    }),
    apps() {
      return this.diary.items;
    },
    icon() {
      if (this.allCategories) return "check_box";
      if (this.someCategories) return "indeterminate_check_box";
      return "check_box_outline_blank";
    },
    allCategories() {
      return this.appointmentTypes.length === this.categories.length;
    },
    someCategories() {
      return this.categories.length > 0 && !this.allCategories;
    },
    appointmentTypes() {
      const types = this.account.company
        ? this.account.company.settings.appointmentTypes
        : [];
      this.categories = types.slice();
      return types;
    }
  }
};
</script>

<style>
/* .tui-full-calendar-time-date-schedule-block-wrap {
        margin-left: 40px !important;
    } */
.tui-full-calendar-time-guide-creation {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.85) !important;
}
/* .tui-full-calendar-timegrid-gridline {
        border-right: 48px solid rgba(0,0,255, 0.03);
    } */
.closeFormButton {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>

<style scoped>

.header {
  text-align: center;
  color: white;
  padding: 10px;
}

.columnAdd {
  position: absolute;
  left: 370px;
  top: 0px;
  height: 100%;
  width: 38px;
  /* background-color: rgba(33,150,243, 0.4); */
  background-color: rgba(29, 43, 54, 0.2);
  pointer-events: none;
}
.iconAdd {
  position: absolute;
  left: 0;
  top: 0;
  height: 42px;
  width: 38px;
  pointer-events: none;
  text-align: center;
  background-color: rgba(29, 43, 54, 0.9);
}

.addButton {
  background-color: red;
  bottom: 10px;
  left: 10px;
}

.searchBarDiary {
  padding: 10px 20px;
  background-color: #e3f2fd;
}
</style>




<!-- <v-select
              :items="this.account.company ? this.account.company.settings.appointmentTypes : []"
              v-model="categories"
              label="Category"
              hide-details
              class="ml-5 mr-5"
              multiple
            ><v-list-tile
              slot="prepend-item"
              ripple
              @click="toggleCategories"
            >
              <v-list-tile-action>
                <v-icon :color="categories.length > 0 ? 'secondary' : ''">{{ icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Select All</v-list-tile-title>
            </v-list-tile>
            <v-divider
              slot="prepend-item"
              class="mt-2"
            ></v-divider>
              <template slot="selection" slot-scope="data"><v-icon :color="data.item.borderColour">fiber_manual_record</v-icon></template>
              <template 
              slot="item"
              slot-scope="data">
              <v-list-tile-action>
                <v-icon color="secondary">{{ categories.includes(data.item) ? 'check_box' : 'check_box_outline_blank' }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>
                <v-icon :color="data.item.borderColour">fiber_manual_record</v-icon>{{data.item.name}}
                </v-list-tile-title>
              </template>
            </v-select> -->
            <!-- <v-spacer></v-spacer> -->