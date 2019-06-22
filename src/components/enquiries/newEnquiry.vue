<template>
  <v-card>
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
                 <v-btn slot="activator" flat icon @click="downloadPdf()">
                     <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="#FFFFFF" d="M10,4H14V13L17.5,9.5L19.92,11.92L12,19.84L4.08,11.92L6.5,9.5L10,13V4Z" />
                        </svg>
                 </v-btn>
                 <span>Download</span>
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
    <v-card flat class="pa-0 ma-0" id="pdf-view">
      <v-card flat color="grey lighten-5" class="ma-4">
        <v-form ref="form" lazy-validation>
          <v-container grid-list-md>
            <v-subheader>Appointment Details</v-subheader>
            <v-divider></v-divider>
            <v-layout row wrap>
              <!-- <v-flex> -->
                <v-autocomplete
                    v-model="enquiry.employee"
                    :items="employees"
                    label="Employee"
                    required
                    :rules="rules.requiredRules"
                    item-text="name"
                    return-object
                  >
                  </v-autocomplete>
                <!-- </v-flex>
                <v-flex> -->
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
                    style="max-width:150px"
                  ></v-text-field>
                  <v-date-picker
                    first-day-of-week="1"
                    v-model="enquiry.date"
                    @change="saveDate"
                    ref="datePicker"
                    :max="maxDate"
                    :min="new Date().toISOString().substr(0, 10)"
                  ></v-date-picker>
                </v-menu>
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
                    v-model="enquiry.startTime"
                    label="Start Time"
                    prepend-icon="watch_later"
                    readonly
                    style="max-width:150px"
                  ></v-text-field>
                  <v-time-picker 
                    v-model="enquiry.startTime" 
                    ref="dateTimePicker"
                    format="24hr" 
                    :allowed-minutes="allowedStep"
                    :allowed-hours="allowedHours"
                  ></v-time-picker>
                </v-menu>
                <!-- </v-flex> -->
            </v-layout>
            <v-divider></v-divider>
            <v-subheader>Customer Details</v-subheader>
            <v-divider></v-divider>
            <v-layout row wrap>
              <!-- <v-flex xs12 sm6>
                <v-select
                  v-model="enquiry.store"
                  :items="stores"
                  label="Store"
                  :rules="rules.requiredRules"
                  required
                  clearable
                  hint="Select your store"
                  persistent-hint
                  @change="didChange"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field solo dark readonly label="Address" disabled v-model="address"></v-text-field>
              </v-flex> -->
              <v-flex xs12>
                <v-text-field
                  v-model="enquiry.customerName"
                  :rules="rules.nameRules"
                  label="Customer Name"
                  required
                ></v-text-field>
              </v-flex>
              <!-- <v-flex xs12 sm6>
                <v-text-field
                  v-model="enquiry.lastName"
                  :rules="rules.requiredRules"
                  required
                  label="Last Name"
                ></v-text-field>
              </v-flex> -->
              <v-flex xs12 md6>
                <v-text-field
                  label="Address"
                  v-model="enquiry.address"
                  required
                  :rules="rules.requiredRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs6 md4>
                <v-text-field
                  label="City"
                  v-model="enquiry.city"
                  required
                  :rules="rules.requiredRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs6 md2>
                <v-text-field
                  label="Postcode"
                  v-model="enquiry.postcode"
                  required
                  :rules="rules.requiredRules"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <!-- <v-flex xs6 md3>
                <v-text-field label="Landline" v-model="enquiry.landline" :mask="rules.phoneMask"></v-text-field>
              </v-flex> -->
              <v-flex xs12 sm4>
                <v-text-field
                  label="Phone"
                  v-model="enquiry.phone"
                  :mask="rules.phoneMask"
                  required
                  :rules="rules.phoneRules"
                  hint="Mobile is preferred"
                  persistent-hint
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm8>
                <v-text-field v-model="enquiry.email" :rules="rules.emailRules" label="Email"></v-text-field>
              </v-flex>
            </v-layout>
            <v-subheader>Venue Information</v-subheader>
            <v-divider></v-divider>
            <v-layout row wrap>
              <!-- <v-flex xs12 sm6> -->
                <v-text-field label="Venue" v-model="enquiry.venue"></v-text-field>
              <!-- </v-flex>
              <v-flex xs12 sm6> -->
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
                    v-model="enquiry.weddingDate"
                    @change="saveWeddingDate"
                    ref="weddingDatePicker"
                    :max="maxWeddingDate"
                    :min="new Date().toISOString().substr(0, 10)"
                  ></v-date-picker>
                </v-menu>
              <!-- </v-flex> -->
            </v-layout>
            <v-subheader>How did you find out about us?</v-subheader>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs6 md3 v-for="item in foundUsItems" :key="item">
                <v-checkbox
                  :value="item"
                  :label="item"
                  v-model="enquiry.foundUs"
                  required
                  :rules="rules.requiredRules"
                >></v-checkbox>
              </v-flex>
              <v-flex xs6 sm3 md2>
                <v-text-field
                  label="Other"
                  required
                  :rules="rules.requiredRules"
                  v-if="enquiry.foundUs.includes('Other')"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-subheader>Budget/Price?</v-subheader>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs6 sm4 md2 v-for="item in budgetItems" :key="item">
                <v-checkbox :value="item" :label="item" v-model="enquiry.budget"></v-checkbox>
              </v-flex>
            </v-layout>
            <v-subheader>Tell us about your special day..?</v-subheader>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs6 md3>
                <v-select
                  v-model="enquiry.bridesmaids"
                  :items="numberItems"
                  label="# Bridesmaids"
                  hint="Number of Bridesmaids"
                  persistent-hint
                  clearable
                ></v-select>
              </v-flex>
              <v-flex xs6 md3>
                <v-select
                  v-model="enquiry.flowergirls"
                  :items="numberItems"
                  label="# Flowergirls"
                  hint="Number of Flowergirls"
                  persistent-hint
                  clearable
                ></v-select>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field v-model="enquiry.partnersName" label="Partners Name"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
      <v-card flat class="pl-4 pr-4 pb-2">
        <v-btn block color="secondary" @click="submit()" v-text="newObj ? 'SUBMIT': 'UPDATE'"></v-btn>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import rules from "@/components/rules.js";

export default {
  props: ['newObj', 'enquiry', 'editingSaved', 'app'],
  data() {
    return {
      title: "Enquiry",
      employees: [],
      rules: rules,
      valid: false,
      snackbar: false,
      snackBarColour: "",
      y: "bottom",
      mode: "",
      timeout: 6000,
      text: "Error",
      dateMenu: false,
      weddingMenu: false,
      address: "",
      stores: ["Castleford", "Huddersfield", "Hull", "Test Ben"],
      addresses: [
        "Unit 2, Carwood Rd, Castleford, WF10 4SR",
        "Unit 11, The Ringways Centre, Huddersfield, HD1 4TU",
        "334 Priory Road, Hull, HU5 5RS",
        "334 Priory Road, Hull, HU5 5RS"
      ],
      budgetItems: [
        "£0-£199",
        "£200-£399",
        "£400-£599",
        "£600-£799",
        "£800-£999",
        "£1000+"
      ],
      foundUsItems: [
        "Facebook",
        "Email",
        "Passing By",
        "Website",
        "Friend/Family",
        "Instagram",
        "Other"
      ],
      numberItems: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    };
  },
  computed: {
    ...mapState({
      staff: state => state.staff,
      account: state => state.account,
    }),
    formattedDate() {
      return this.formatDate(this.enquiry.date);
    },
    formattedWeddingDate() {
      return this.formatDate(this.enquiry.weddingDate);
    },
    maxWeddingDate() {
      var max = new Date().setFullYear(new Date().getFullYear() + 6);
      return new Date(max).toISOString().substr(0, 10);
    },
    maxDate() {
      var max = new Date().setFullYear(new Date().getFullYear() + 1);
      return new Date(max).toISOString().substr(0, 10);
    },
    formattedTime() {
      return this.startTime.substr(11, 5)
    }
  },
  methods: {
    allowedHours: v => v >= 8 && v <= 20,
    allowedStep: m => m % 15 === 0,
    didChange(value) {
      var index = this.stores.findIndex(i => i === value);
      this.address = this.addresses[index];
    },
    saveWeddingDate(date) {
      this.$refs.weddingDateMenu.save(date);
    },
    saveDate(date) {
      this.$refs.dateMenu.save(date);
    },
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      if (this.$refs.form.validate()) {
        var enquiryDate = new Date(
          this.enquiry.date + "T" + this.enquiry.startTime + ":00+00:00"
        );
        this.enquiry.enquiryDate = enquiryDate
        console.log(this.enquiry)
        this.newObj ? this.create() : this.update();
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
    downloadPdf() {
          let doc = new jsPDF('p', 'mm', [297, 210])
          let source = document.getElementById('pdf-view')
          let html = source.innerHTML()
          
          // let options = {
          // }
          // source.style.display = 'block'
          // doc.addHTML(source, options, function () {
            doc.save('enquiry.pdf')
          // })
      },

    // submit() {
    //   if (this.$refs.form.validate()) {
    //     if (this.enquiry.foundUs.length === 0) {
    //       this.showSnackbar("ERROR: Please choose how you found us!", "red");
    //       return;
    //     } else if (this.enquiry.budget.length === 0) {
    //       this.showSnackbar("ERROR: Please choose your budget!", "red");
    //       return;
    //     } else {
    //       this.submitEnquiry();
    //     }
    //   } else {
    //     this.showSnackbar("ERROR: Missing fields!", "red");
    //     return;
    //   }
    // },
    showSnackbar(text, colour) {
      this.snackBarColour = colour;
      this.text = text;
      this.snackbar = true;
    },
    clear() {
      this.$refs.form.reset();
    }
  },
  mounted() {
    this.employees = this.staff.items.map(employee => ({ _id: employee._id, name: employee.name }));
  },
  watch: {
    "enquiry.firstName": function(value) {
      this.enquiry.firstName = this.toUpper(value);
    },
    "enquiry.lastName": function(value) {
      this.enquiry.lastName = this.toUpper(value);
    },
    "enquiry.address": function(value) {
      this.enquiry.address = this.toUpper(value);
    },
    "enquiry.city": function(value) {
      this.enquiry.city = this.toUpper(value);
    },
    "enquiry.postcode": function(value) {
      this.enquiry.postcode = value.toUpperCase();
    },
    "enquiry.venue": function(value) {
      this.enquiry.venue = this.toUpper(value);
    },
    "enquiry.partnersName": function(value) {
      this.enquiry.partnersName = this.toUpper(value);
    },
    weddingMenu(val) {
      val &&
        this.$nextTick(
          () => (this.$refs.weddingDatePicker.activePicker = "YEAR")
        );
    },
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: bold;
  font-size: 5vh;
  text-align: center;
}
#title {
  background-color: #f8f8f9;
  border-radius: 10px;
  border-color: lightgray;
  border-width: 1px;
  border-style: solid;
}
.container {
  max-width: 800px;
}
</style>
