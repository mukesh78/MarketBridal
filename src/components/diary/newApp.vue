<template>
  <v-card>
    <v-dialog v-if="deleteDialog" v-model="deleteDialog" max-width="300">
      <delete-form
        item="appointment"
        v-on:close="closeDeleteDialog"
        v-on:remove="remove"
      ></delete-form>
    </v-dialog>
    <v-dialog v-if="newTextDialog" v-model="newTextDialog" max-width="300">
      <new-text-form
      :newObj="this.newObjText"
      :text="newText"
      v-on:close="closeTextDialog"
      v-on:create="createText"
      ></new-text-form>
    </v-dialog>
    <v-dialog v-if="newCategoryDialog" v-model="newCategoryDialog" max-width="300">
      <diary-category
        :newObj="this.newObjCategory"
        :category="category"
        v-on:close="closeCategoryDialog"
        v-on:create="createCategory"
      ></diary-category>
    </v-dialog>
    <v-card dark color="primary">
      <v-toolbar flat color="transparent" height="45">
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn v-if="!newObj" slot="activator" flat icon @click="remove()">
            <v-icon>delete</v-icon>
          </v-btn>
          <span>Delete</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn v-if="newObj" slot="activator" flat icon @click="save()">
            <v-icon>save</v-icon>
          </v-btn>
          <span>Save Draft</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn slot="activator" flat icon @click="reset()">
            <v-icon>replay</v-icon>
          </v-btn>
          <span>Reset</span>
        </v-tooltip>
        <v-btn flat icon @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title
        class="display-1 justify-center"
        primary-title
        style="padding-top: 0px; padding-bottom:10px; opacity:0.6"
        v-text="newObj ? 'New ' + title: 'Update ' + title"
      ></v-card-title>
    </v-card>
    <v-divider></v-divider>
    <v-card flat class="pa-0 ma-0">
      <v-tabs
    centered
    color="primary"
    dark
    grow
    v-model="tabModel"
    v-if="this.newObj"
    >
    <v-tabs-slider style="height: 5px" color="grey lighten-3"></v-tabs-slider>
    <v-tab :disabled="!this.newObj && this.app._type == 'task'">Appointment</v-tab>
    <v-tab :disabled="!this.newObj && this.app._type == 'time'">Task</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabModel">
      <v-tab-item>
      <v-card flat color="grey lighten-5" class="ma-4">
        <v-form ref="form" lazy-validation>
          <v-container grid-list-sm>
            <v-layout row wrap>
              <v-flex xs12 md4>
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
                  ></v-text-field>
                  <v-date-picker
                    first-day-of-week="1"
                    v-model="app.date"
                    @change="saveDate"
                    ref="datePicker"
                    :max="maxDate"
                    :min="new Date().toISOString().substr(0, 10)"
                  ></v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex xs12 md4>
                <v-menu
                  ref="dateTimeMenu"
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
                    v-model="app.start"
                    label="Start Time"
                    prepend-icon="watch_later"
                    readonly
                  ></v-text-field>
                  <v-time-picker 
                    v-model="app.start" 
                    ref="dateTimePicker"
                    format="24hr" 
                    :allowed-minutes="allowedStep"
                    :allowed-hours="allowedHours"
                  ></v-time-picker>
                </v-menu>
              </v-flex>

              <v-flex xs12 md4>
                <v-menu
                  ref="dateTimeMenu"
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
                    v-model="app.end"
                    label="End Time"
                    prepend-icon="watch_later"
                    readonly
                  ></v-text-field>
                  <v-time-picker 
                    v-model="app.end" 
                    ref="dateTimePicker" 
                    format="24hr" 
                    :allowed-minutes="allowedStep"
                    :allowed-hours="allowedHours"
                  ></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                class="pa-0"
                v-model="app.customerName"
                label="Name"
                required
                :rules="rules.requiredRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="categories"
                  v-model="app.appType"
                  label="Category"
                  required
                  :rules="rules.requiredRules"
                ><v-btn small class="mt-0" slot="append-outer" icon color="secondary" @click="newCategory()">
                    <v-icon small>add</v-icon>
                  </v-btn>
                  <template
                  slot="selection"
                  slot-scope="data">
                  <v-list-tile>
                  <v-list-tile-action>
                  <v-icon :color="data.item.borderColour">fiber_manual_record</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>
                  {{data.item.name}}
                  </v-list-tile-title>
                  </v-list-tile>
                  </template>
                  <template
                  slot="item"
                  slot-scope="data">
                  <!-- <v-list-tile>
                   
                  <v-list-tile-action> -->
                  <v-icon :color="data.item.borderColour">fiber_manual_record</v-icon>
                  <!-- </v-list-tile-action>
                  <v-list-tile-title> -->
                  {{data.item.name}}
                  <!-- </v-list-tile-title>
                  </v-list-tile> -->
                  </template>
                </v-select>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  v-model="app.employee"
                  :items="employees"
                  label="Employee"
                  required
                  :rules="rules.requiredRules"
                  item-text="name"
                  return-object
                ><v-btn small class="mt-0" slot="append-outer" icon color="secondary" @click="newEmployee()">
                  <v-icon small>add</v-icon>
                  </v-btn>
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="bookingTypes"
                  v-model="app.bookingType"
                  label="Booking Type"
                  required
                  :rules="rules.requiredRules"
                  item-text="name"
                  return-object
                ><v-btn small class="mt-0" slot="append-outer" icon color="secondary" @click="newBookingType()">
                  <v-icon small>add</v-icon>
                </v-btn>
                </v-select>
              </v-flex>
              <v-flex xs12>
                <v-textarea 
                label="Notes" 
                v-model="app.notes" 
                auto-grow
                rows="1"
                ></v-textarea>
              </v-flex>
              <!-- <v-flex> -->
                <v-text-field
                v-model="app.phone"
                label="Phone"
                :mask="rules.phoneMask"
                required
                :rules="rules.phoneRules"
                ></v-text-field>
              <!-- </v-flex> -->
              <!-- <v-flex> -->
                <v-menu
                  ref="weddingDateMenu"
                  :close-on-content-click="false"
                  :nudges-right="40"
                  v-model="weddingMenu"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="formattedWeddingDate"
                    label="Wedding Date"
                    prepend-icon="date_range"
                    readonly
                    style="max-width:150px"
                  ></v-text-field>
                  <v-date-picker
                    first-day-of-week="1"
                    v-model="app.weddingDate"
                    @change="saveWeddingDate"
                    ref="weddingDatePicker"
                    :max="maxWeddingDate"
                    :min="new Date().toISOString().substr(0, 10)"
                  ></v-date-picker>
                </v-menu>
              <!-- </v-flex> -->
              <v-flex xs12>
                <v-text-field
                v-model="app.email"
                label="Email" type="email"
                :rules="app.email === '' ? [] : rules.emailRules"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat color="grey lighten-5" class="ma-4">
        <v-form ref="form2" lazy-validation>
          <v-container grid-list-sm>
            <v-layout row wrap>
              <v-flex xs12 md4>
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
                  ></v-text-field>
                  <v-date-picker
                    first-day-of-week="1"
                    v-model="app.date"
                    @change="saveDate"
                    ref="datePicker"
                    :max="maxDate"
                    :min="new Date().toISOString().substr(0, 10)"
                  ></v-date-picker>
                </v-menu>
              </v-flex>  
              <v-flex xs12 md8>
                <v-autocomplete
                  v-model="app.employee"
                  :items="employees"
                  label="Employee"
                  required
                  :rules="rules.requiredRules"
                  item-text="name"
                  return-object
                ><v-btn small class="mt-0" slot="append-outer" icon color="secondary" @click="newEmployee()">
                  <v-icon small>add</v-icon>
                  </v-btn>
                </v-autocomplete>
              </v-flex>
              
              <v-flex xs12>
                <v-textarea 
                label="Notes" 
                v-model="app.notes" 
                auto-grow
                rows="1"
                required
                :rules="rules.requiredRules"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
      </v-tab-item>
    </v-tabs-items>
      <v-card flat class="pl-4 pr-4 pb-2">
        <v-btn
        block
        color="secondary"
        @click="submit()"
        v-text="newObj ? 'SUBMIT': 'UPDATE'"
        ></v-btn>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment,{ min } from 'moment'
import rules from "@/components/rules.js";
import diaryCategory from '@/components/settings/defaults/diaryCategory';

export default {
  props: ["newObj", "app", 'editingSaved'],
  components: {
    "diary-category": diaryCategory
  },
  data() {
    return {
      title: "Appointment",
      tabModel: this.newObj ? 0 : this.app._type == 'time' ? 0 : 1,
      rules: rules,
      deleteDialog: false,
      startMenu: false,
      dateMenu: false,
      weddingMenu: false,
      employees: [],
      categories: [],
      bookingTypes: [],
      newCategoryDialog: false,
      newObjCategory: true,
      category: null,
      newTextDialog: false,
      newObjText: true,
      newText: null,
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
  watch: {
    "app.startTime": function(newValue, oldValue) {

      var startTime=moment(oldValue, "HH:mm");
      var newStartTime=moment(newValue, "HH:mm")
      var newEndTime = newStartTime.clone()
      var endTime=moment(this.app.endTime, "HH:mm");
      var duration = moment.duration(endTime.diff(startTime));
      var minutes = parseInt(duration.asMinutes());

      newEndTime.add(minutes, 'minutes')
      this.app.endTime = newEndTime.format("HH:mm")
    },
    tabModel(val) {
      if(val==0) {
        this.title = "Appointment"
        this.app._type = "time"
      } else {
        this.title = "Task"
        this.app._type = "task"
      }
    },
    weddingMenu(val) {
      val &&
        this.$nextTick(
          () => (this.$refs.weddingDatePicker.activePicker = "YEAR")
        );
    },
  },
  computed: {
    formattedDate() {
      return this.formatDate(this.app.date);
    },
    formattedWeddingDate() {
      return this.formatDate(this.app.weddingDate);
    },
    maxWeddingDate() {
      var max = new Date().setFullYear(new Date().getFullYear() + 6);
      return new Date(max).toISOString().substr(0, 10);
    },
    maxDate() {
      var max = new Date().setFullYear(new Date().getFullYear() + 1);
      return new Date(max).toISOString().substr(0, 10);
    },
    ...mapState({
      staff: state => state.staff,
      account: state => state.account,
    })
  },
  methods: {
    newCategory(){
      this.category = {
        name: null,
        colour: '#0086E720',
        borderColour: '#0086E7',
      }
      this.newCategoryDialog = true
    },
    newBookingType(){
      this.newText = {
        label: "Booking Type",
        value: ''
      }
      this.newTextDialog = true
    },
    newEmployee(){

    },
    ...mapActions("account", ["newSettingsAppointmentType", "newSettingsBookingType"]),
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      if(this.tabModel == 0) {
        if (this.$refs.form.validate()) {
          this.newObj ? this.create() : this.update();
        }
      } else {
        if (this.$refs.form2.validate()) {
          this.newObj ? this.create() : this.update();
        }
      }
    },
    create() {
      this.$emit("create", this.editingSaved);
    },
    update() {
      this.$emit("update");
    },
    save() {
      this.$emit("save");
    },
    close() {
      this.$emit("close");
    },
    remove() {
      if(this.deleteDialog) {
        this.$emit("remove", this.app)
        this.deleteDialog = false
      } else {
        this.deleteDialog = true
      }
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
    },
    saveDate(date) {
      this.$refs.dateMenu.save(date);
    },
    saveWeddingDate(date) {
      this.$refs.weddingDateMenu.save(date);
    },
    allowedHours: v => v >= 8 && v <= 20,
    allowedMinutes: v => v >= 15 && v <= 45,
    allowedStep: m => m % 15 === 0,
    closeCategoryDialog() {
      this.newCategoryDialog = false
    },
    createCategory(){
      this.newSettingsAppointmentType({
        companyId: this.account.company._id,
        category: this.category
        }).then(resp => {
          this.newCategoryDialog = false;
        })
    },
    closeTextDialog() {
      this.newTextDialog = false
    },
    createText() {
      this.newSettingsBookingType({
        companyId: this.account.company._id,
        name: this.newText.value
      }).then(resp => {
        this.newTextDialog = false
      })
    }
  },
  mounted() {
  
    this.employees = this.staff.items.map(employee => ({ _id: employee._id, name: employee.name }));

    this.categories = this.account.company.settings.appointmentTypes
    if(this.app.appType) {
      var index = this.categories.findIndex((cat)=>{
        return cat._id === this.app.appType._id
      })
      if(index === -1){
      } else {
        this.app.appType = this.categories[index]
      }
    }
    
    this.bookingTypes = this.account.company.settings.appointmentBookingTypes
   
    if(this.editingSaved) {
      this.$refs.form.validate()
    }

    console.log(this.app)
  }
};
</script>
