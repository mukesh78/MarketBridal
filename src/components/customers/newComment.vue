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
                <v-textarea
                 name="input-7-4"
                 v-model="comment.text"
                 label="Comment"
               ></v-textarea>
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
import { mapState, mapActions } from "vuex";
import rules from "@/components/rules.js";
import deleteForm from '@/components/shared/delete';


    export default {
      props: ['newObj', 'comment'],
      components: {
        deleteForm
      },
      data() {
        return {
            title: "Comment",
            rules: rules,
            deleteDialog: false,
            menu2: false
        };
      },
      methods: {
        reset() {
          vm.$refs.form.reset();
        },
        submit() {
          if (this.$refs.form.validate()) {
            this.newObj ? this.create() : this.update();
          }
        },
        create() {
          this.$emit("create");
        },
        update() {
          this.$emit("update");
        },
        close() {
          this.$emit("closeComment");
        },
        remove() {
          if(this.deleteDialog) {
            this.$emit("remove", this.payment)
            this.deleteDialog = false
          } else {
            this.deleteDialog = true
          }
        },
      },
    };
</script>
