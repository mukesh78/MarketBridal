<template>
  <v-card>
    <v-dialog v-if="deleteDialog" v-model="deleteDialog" max-width="300">
      <delete-form
        item="employee"
        v-on:close="closeDeleteDialog"
        v-on:remove="remove"
      ></delete-form>
    </v-dialog>
    <v-card dark color="blue">
      <v-card flat height="5" color="blue darken-4"></v-card>
      <v-toolbar flat color="transparent" height="45">
        <v-spacer></v-spacer>
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
      >{{ employee.name }}</v-card-title>
      <v-btn
        fab
        light
        absolute
        bottom
        left
        color="primary"
        class="editButton"
        @click="edit(employee)"
      >
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card>
    <v-card class="pt-3 pl-2">
      <v-container grid-list-md>
        <div style="display: flex; align-items: center;" class="pb-2" v-if="employee.email">
          <v-icon color="primary" class="mr-3">email</v-icon>
          <span>{{ employee.email }}</span>
        </div>
        <div style="display: flex; align-items: center;" class="pb-2" v-if="employee.phone">
          <v-icon color="primary" class="mr-3">phone</v-icon>
          <span>{{ employee.phone }}</span>
        </div>
        <div class="pb-2" v-if="employee.address">
          <v-icon color="primary" class="mr-3">home</v-icon>
          <span>{{ employee.address }}</span>
        </div>
        <div class="pb-2" v-if="employee.city">
          <v-icon color="transparent" class="mr-3">home</v-icon>
          <span>{{ employee.city }}</span>
        </div>
         <div class="pb-2" v-if="employee.postcode">
          <v-icon color="transparent" class="mr-3">home</v-icon>
          <span>{{ employee.postcode }}</span>
        </div>
        <div class="pb-2" v-if="employee.birthday">
          <font-awesome-icon
              class="mr-3"
              prefix="far"
              icon="birthday-cake"
              :style="{ color: 'black' }"
              size="2x"
            />
          <span>{{ new Date(employee.birthday).toLocaleString('en-gb', dateOptions) }}</span>
        </div>
      </v-container>
    </v-card>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ['employee'],
  data() {
    return {
      deleteDialog: false,
      dateOptions: {
        weekday: "long",
        month: "short",
        day: "numeric",
      }
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    edit(employee) {
      this.$emit("edit", this.employee);
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
  }
};
</script>
