<template>
  <v-card>
    <v-dialog v-if="deleteDialog" v-model="deleteDialog" max-width="300">
      <delete-form
        item="task"
        v-on:close="closeDeleteDialog"
        v-on:remove="remove"
      ></delete-form>
    </v-dialog>
    <v-card :color="app.bgColor">
      <v-card flat height="5" :color="app.completed == true ? 'success' : 'error'"></v-card>
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
      >Task</v-card-title>
      <v-btn fab dark absolute bottom left color="darkPrimary" class="editButton" @click="edit(app)">
        <v-icon dark>edit</v-icon>
      </v-btn>
    </v-card>
    <v-card class="pt-3 pl-2">
      <v-container mb-0 pb-0>
        <div style="display: flex; align-items: center;" class="pb-2" v-if="app.startTime">
          <v-icon color="darkPrimary" class="pr-3">watch_later</v-icon>
          <span>{{ new Date(app.startTime).toLocaleString('en-gb', dateOptions)}}</span>
        </div>
        <div style="display: flex; align-items: flex-start" class="pb-2" v-if="app.notes">
          <v-icon color="darkPrimary" class="pr-3">comment</v-icon>
          <span v-if="app.notes">{{ app.notes }}</span>
        </div>
      </v-container>
    </v-card>
    <v-card>
      <v-container pa-2 ma-0 grid-list-sm>
        <v-layout row wrap>
        <v-flex xs6>
          <v-btn block :outline="app.completed" color="error" dark @click="completed(false)">Incomplete</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn block :outline="!app.completed" color="success" dark @click="completed(true)">Complete</v-btn>
        </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-card>
</template>
<style media="screen">
    .deleteButton {
        position: absolute;
        top: 5px;
        right: 40px;
    }
</style>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["app"],
  data() {
    return {
      deleteDialog: false,
      dateOptions: {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
      }
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    edit(app) {
      this.$emit("edit", this.app);
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
    completed(val) {
      this.app.completed = val
      this.$emit("update")
    }
  }
};
</script>