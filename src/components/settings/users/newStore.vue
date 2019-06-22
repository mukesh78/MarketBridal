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
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  name="address"
                  label="Store Address"
                  id="address"
                  v-model="store.address"
                  :rules="rules.address"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  name="city"
                  label="City"
                  id="city"
                  v-model="store.city"
                  :rules="rules.city"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  name="postcode"
                  label="Postcode"
                  id="postcode"
                  v-model="store.postcode"
                  :rules="rules.postcode"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="store-name"
                  label="Store Name"
                  id="store-name"
                  v-model="store.storeName"
                  :rules="rules.storeName"
                  hint="Use the city/town/village that represents the location of your store"
                  persistent-hint
                  type="text"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="phone"
                  label="Store Phone"
                  id="phone"
                  v-model="store.phone"
                  :rules="rules.phone"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="email"
                  label="Store Email"
                  id="email"
                  v-model="store.email"
                  :rules="rules.email"
                  type="email"
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
  props: ["newObj", "store", "allowDelete"],
  data() {
    return {
      title: "Store",
      deleteDialog: false,
      rules: {
        companyName: [v => !!v || "Company name is required"],
        address: [v => !!v || "Address is required"],
        city: [v => !!v || "City is required"],
        postcode: [v => !!v || "Postcode is required"],
        storeName: [v => !!v || "Store name is required"],
        phone: [v => !!v || "Phone is required"],
        email: [
          v => !!v || "Email name is required",
          v => /.+@.+/.test(v) || "Email must be valid"
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
        this.$emit("remove", this.store);
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