<template>
  <v-container grid-list-xl>
    <v-dialog
      v-if="newUserDialog"
      v-model="newUserDialog"
      :fullscreen="this.$vuetify.breakpoint.xs"
      max-width="500"
    >
      <new-user
        :newObj="this.newObj"
        :user="user"
        :stores="stores"
        :allowDelete="allowDelete"
        v-on:close="closeNewUserDialog"
        v-on:create="createNewUser"
        v-on:update="updateExistingUser"
        v-on:remove="removeUser"
      ></new-user>
    </v-dialog>
    <v-dialog
      v-if="newStoreDialog"
      v-model="newStoreDialog"
      :fullscreen="this.$vuetify.breakpoint.xs"
      max-width="500"
    >
      <new-store
        :newObj="this.newObj"
        :store="store"
        :allowDelete="allowDelete"
        v-on:close="closeNewStoreDialog"
        v-on:create="createNewStore"
        v-on:update="updateExistingStore"
        v-on:remove="removeStore"
      ></new-store>
    </v-dialog>

    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-subheader class="subheading">
          Users
          <v-spacer></v-spacer>
          <v-btn small class="mt-0" icon color="secondary" @click="newUser()">
            <v-icon small>add</v-icon>
          </v-btn>
        </v-subheader>
        <v-divider></v-divider>
        <v-list subheader three-line>
          <!-- <v-subheader>Hangout notifications</v-subheader> -->
          <v-list-tile v-for="(item, index) in users" :key="index" @click="viewUser(item)">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.firstName }} {{ item.lastName }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.email }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ item.store.storeName }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-chip
                v-if="currentUser._id === item._id"
                text-color="white"
                label
                disabled
                color="success"
                class="text-uppercase"
              >Current</v-chip>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-chip
                label
                disabled
                :text-color="item.role === 'admin' ? 'white' : 'black'"
                :color="item.role === 'admin' ? 'secondary' : 'buttonGrey'"
                class="text-uppercase"
              >{{ item.role }}</v-chip>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex xs12 md6>
        <v-subheader class="subheading">
          Stores
          <v-spacer></v-spacer>
          <v-btn small class="mt-0" icon color="secondary" @click="newStore()">
            <v-icon small>add</v-icon>
          </v-btn>
        </v-subheader>
        <v-divider></v-divider>
        <v-list subheader three-line>
          <!-- <v-subheader>Hangout notifications</v-subheader> -->
          <v-list-tile v-for="(item, index1) in stores" :key="index1" @click="viewStore(item)" :disabled="item.storeName === 'Demo'">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.storeName }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.address }}, {{ item.city }}, {{ item.postcode }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ item.phone }} | {{ item.email }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-chip
                v-if="defaultStore === item._id"
                label
                disabled
                text-color="white"
                color="secondary"
                class="text-uppercase"
              >DEFAULT</v-chip>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

import newUser from "./newUser";
import newStore from "./newStore";

export default {
  components: {
    "new-user": newUser,
    "new-store": newStore
  },
  data() {
    return {
      showAPIKey: false,
      user: null,
      newUserDialog: false,
      store: null,
      newStoreDialog: false,
      newObj: true,
      allowDelete: false
    };
  },
  methods: {
    ...mapActions("account", [
      "getUsers",
      "createUser",
      "updateUser",
      "deleteUser",
      "createStore",
      "updateStore",
      "deleteStore"
    ]),
    viewUser(item) {
      this.user = {
        _id: item._id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        role: item.role,
        defaultStore: item.store
      };
      this.allowDelete =
        item.role !== "admin" ||
        (item.role === "admin" && this.admins.length > 0);
      this.newObj = false;
      this.newUserDialog = true;
    },
    newUser() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
        confirm_password: "",
        defaultStore: null
      };
      this.allowDelete = true;
      this.newObj = true;
      this.newUserDialog = true;
    },
    closeNewUserDialog() {
      this.newUserDialog = false;
    },
    createNewUser() {
      this.createUser(this.user).then(() => {
        this.newUserDialog = false;
      });
    },
    updateExistingUser() {
      this.user._default_store_id = this.user.defaultStore._id
      console.log(this.user)
      this.updateUser(this.user).then(() => {
        this.newUserDialog = false;
      });
    },
    removeUser() {
      this.deleteUser(user._id).then(() => {
        this.newUserDialog = false;
      });
    },
    viewStore(item) {
      this.store = {
        _id: item._id,
        address: item.address,
        city: item.city,
        postcode: item.postcode,
        storeName: item.storeName,
        phone: item.phone,
        email: item.email
      };
      this.allowDelete = this.stores.count > 1
      this.newObj = false;
      this.newStoreDialog = true;
    },
    newStore() {
      this.store = {
        address: "",
        city: "",
        postcode: "",
        storeName: "",
        phone: "",
        email: ""
      };
      this.allowDelete = true
      this.newObj = true;
      this.newStoreDialog = true;
    },
    closeNewStoreDialog() {
      this.newStoreDialog = false;
    },
    createNewStore() {
      this.createStore(this.store).then(() => {
        this.newStoreDialog = false;
      });
    },
    updateExistingStore() {
      this.updateStore(this.user).then(() => {
        this.newStoreDialog = false;
      });
    },
    removeStore() {
      this.deleteStore(store._id).then(() => {
        this.newStoreDialog = false;
      });
    },
  },
  computed: {
    ...mapState({
      account: state => state.account
    }),
    defaultStore() {
      return this.currentUser._default_store_id;
    },
    currentUser() {
      return this.account.user;
    },
    admins() {
      return this.users.filter(user => {
        return user.role === "admin";
      });
    },
    users() {
      return this.account.users;
    },
    stores() {
      return this.account.company.stores;
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>
