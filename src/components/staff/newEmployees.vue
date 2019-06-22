<template>
  <v-card>
    <v-dialog v-if="deleteDialog" v-model="deleteDialog" max-width="300">
      <delete-form
        item="employee"
        v-on:close="closeDeleteDialog"
        v-on:remove="remove"
      ></delete-form>
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
    <v-card flat class="pa-0 ma-0">
      <v-card flat color="grey lighten-5" class="ma-4">
        <v-form ref="form" lazy-validation>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="employee.name"
                  label="Name"
                  required
                  :rules="rules.requiredRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="employee.email"
                  label="E-mail"
                  required
                  :rules="employee.email === '' ? [] : rules.emailRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                v-model="employee.phone"
                label="Phone"
                :mask="rules.phoneMask"
                required
                :rules="rules.phoneRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="employee.birthday"
                    label="DOB"
                    hint="Ignore the year"
                    persistent-hint
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    first-day-of-week="1"
                    ref="birthdayPicker"
                    v-model="date"
                    no-title
                    min="2019-01-01"
                    max="2019-12-31"
                    ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                label="Address" 
                v-model="employee.address"
                required
                :rules="rules.requiredRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field 
                label="City" 
                v-model="employee.city" 
                required
                :rules="rules.requiredRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Post Code"
                  v-model="employee.postcode"
                  required
                  :rules="rules.requiredRules"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
      <v-card flat class="pl-4 pr-4 pb-2">
        <v-btn block
        color="secondary"
        @click="submit()"
        v-text="newObj ? 'Submit': 'Update'"
        ></v-btn>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
import rules from "@/components/rules.js";

export default {
  props: ['newObj', 'employee', 'editingSaved'],
  data() {
    return {
      title: "Employee",
      rules: rules,
      deleteDialog: false,
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      dateOptions: {
        month: "long",
        day: "numeric",
      }
    };
  },
  watch: {
    date(value) {
      this.employee.birthday = new Date(value).toLocaleString('en-gb', this.dateOptions)
    },
    menu2 (val) {
      val && this.$nextTick(() => (this.$refs.birthdayPicker.activePicker = 'MONTH'))
    },
    'employee.name': function (value){
        this.employee.name = this.toUpper(value)
    },
    'employee.email': function (value){
        this.employee.email = value.toLowerCase()
    },
  },
  
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      if (this.$refs.form.validate()) {
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
    remove() {
      if(this.deleteDialog) {
        this.$emit("remove", this.employee)
        this.deleteDialog = false
      } else {
        this.deleteDialog = true
      }
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
    }
  },
  mounted () {
    if(this.editingSaved) {
      this.$refs.form.validate()
    }
  }
};
</script>
