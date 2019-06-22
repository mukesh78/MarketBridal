<template>
  <v-card>
    <v-dialog v-if="deleteDialog" v-model="deleteDialog" max-width="300">
      <delete-form item="user" v-on:close="closeDeleteDialog" v-on:remove="remove"></delete-form>
    </v-dialog>
    <v-card dark color="primary">
      <v-toolbar flat color="transparent" height="45">
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn
            v-if="!newObj"
            :disabled="!allowDelete"
            slot="activator"
            flat
            icon
            @click="remove()"
          >
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
    <v-card flat class="pa-0 ma-0">
      <v-card flat color="grey lighten-5" class="ma-4">
        <v-form ref="form" lazy-validation>
          <v-container grid-list-sm>
            <v-flex xs12 class="text-xs-center">
              <v-btn
                :outline="user.role==='user'"
                color="secondary"
                class="ma-0"
                @click="allowDelete ? user.role='admin' : null"
              >ADMIN</v-btn>
              <v-btn
                :outline="user.role==='admin'"
                color="secondary"
                class="ma-0"
                @click="allowDelete ? user.role='user' : null"
              >USER</v-btn>
            </v-flex>
            <div
              v-if="!allowDelete"
              class="text-xs-center mt-2 mb-0"
              style="opacity:0.5"
            >Cannot change: must have at least 1 admin</div>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  name="first_name"
                  label="First Name"
                  id="first-name"
                  v-model="user.firstName"
                  :rules="rules.firstName"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="last_name"
                  label="Last Name"
                  id="last-name"
                  v-model="user.lastName"
                  :rules="rules.lastName"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="stores"
                  box
                  label="Default Store"
                  item-text="storeName"
                  v-model="user.defaultStore"
                  return-object
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="email"
                  label="Email Address"
                  id="email"
                  v-model="user.email"
                  :rules="rules.email"
                  type="email"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="newObj">
                <v-text-field
                  name="password"
                  label="Password"
                  id="password"
                  v-model="user.password"
                  :rules="rules.password"
                  type="password"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="newObj">
                <v-text-field
                  name="confirm_password"
                  label="Confirm Password"
                  id="confirm-password"
                  v-model="user.confirm_password"
                  :rules="rules.confirmPassword"
                  type="password"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
      <v-card flat class="pl-4 pr-4 pb-2">
        <v-btn block color="secondary" @click="submit()" v-text="newObj ? 'Submit': 'Update'"></v-btn>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: ["newObj", "user", "stores", "allowDelete"],
  data() {
    return {
      title: "User",
      deleteDialog: false,
      rules: {
        firstName: [v => !!v || "First name is required"],
        lastName: [v => !!v || "Last name is required"],
        email: [
          v => !!v || "Email name is required",
          v => /.+@.+/.test(v) || "Email must be valid"
        ],
        password: [v => !!v || "Password is required"],
        confirmPassword: [
          v => !!v || "Confirm password is required",
          v =>
            v == this.user.password ||
            "Your password and confirmation password do not match"
        ]
      }
    };
  },

  methods: {
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
      this.$emit("close");
    },
    remove() {
      if (this.deleteDialog) {
        this.$emit("remove", this.user);
        this.deleteDialog = false;
      } else {
        this.deleteDialog = true;
      }
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
    }
  }
};
</script>
