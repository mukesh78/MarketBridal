<template>
  <v-card>
    <v-dialog v-if="deleteDialog" v-model="deleteDialog" max-width="300">
      <delete-form
        item="job"
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
                    v-model="job.date"
                    @change="saveDate"
                    ref="datePicker"
                    :max="maxDate"
                    :min="new Date().toISOString().substr(0, 10)"
                  ></v-date-picker>
                </v-menu>
              </v-flex>  
              <v-flex xs12 md8>
                <v-autocomplete
                  v-model="job.employee"
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
                v-model="job.notes" 
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

export default {
  props: ["newObj", "job"],
  data() {
    return {
      title: "Job",
      rules: rules,
      deleteDialog: false,
      dateMenu: false,
      employees: [],
    };
  },
  computed: {
    formattedDate() {
      return this.formatDate(this.job.date);
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
  },
  mounted() {
  
    this.employees = this.staff.items.map(employee => ({ _id: employee._id, name: employee.name }));

  }
};
</script>
