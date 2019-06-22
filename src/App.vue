<template>
  <v-app>
      <template v-if="segment !== '/'">
        <v-navigation-drawer
        fixed
        v-model="drawerRight"
        right
        clipped
        app
        :mini-variant.sync="mini"
        hide-overlay
        stateless
        width="250"
        >
        <v-list dense>
          <v-list-tile @click.stop="right = !right">
            <v-list-tile-action>
              <v-btn
              icon
              @click.stop="mini = !mini"
              >
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Daily Checklist</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>

      <v-list subheader three-line>
        <!-- <v-subheader>Hangout notifications</v-subheader> -->
        <v-list-tile
        v-for="(item, index) in dashboard.jobs"
        :key="index"
        >
        <v-list-tile-action>
          <v-checkbox v-model="item.completed" @click.stop="item.completed = !item.completed"></v-checkbox>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.text }}</v-list-tile-sub-title>
        </v-list-tile-content>

      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
        <v-toolbar fixed app clipped-right v-if="account.company && account.user">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat class="mr-2 headline text-capitalize font-weight-medium" @click.stop="showDatePicker()">
            Today
            <!-- <v-btn icon > -->
              <v-icon class="ml-2">event</v-icon>
            <!-- </v-btn> -->
            </v-btn>
            <v-menu>
              <v-toolbar-title slot="activator">
                <span class="headline font-weight-medium" v-if="store">{{ store.storeName }}</span>
                <v-icon>arrow_drop_down</v-icon>
              </v-toolbar-title>

              <v-list>
                <v-list-tile>
                  <div class="font-weight-medium">Stores</div>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile
                  v-for="item in this.account.company.stores"
                  :key="item._id"
                  @click="changeStore(item)"
                >
                  <v-list-tile-title v-text="item.storeName"></v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>

            <v-menu offset-y bottom transition="slide-y-transition">
              <v-btn slot="activator" icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile>
                  <div class="font-weight-medium">{{ account.user.email }}</div>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile to="/profile">
                  <v-list-tile-action>
                    <v-icon>person</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>{{ account.user.firstName }} {{ account.user.lastName }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-for="item in userItems" :key="item.title" :to="item.link">
                  <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>{{ item.title }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="signout">
                  <v-list-tile-action>
                    <v-icon>exit_to_app</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>Log out</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar-items>
        </v-toolbar>

        <v-navigation-drawer
          v-if="account.company"
          v-model="drawer"
          fixed
          app
          dark
          width="200"
          class="menu"
        >
          <v-layout column align-center ma-2>
            <a href="/">
              <img src="./assets/Brid.al.png" width="120">
            </a>
          </v-layout>
          <v-divider></v-divider>
          <v-list>
            <v-list-tile
              @click.stop
              v-for="item in this.menuItems"
              :key="item.title"
              :to="item.link"
              active-class="active-menu"
              :class="item.path === $route.path ? 'highlighted' : ''"
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>{{ item.title }}</v-list-tile-content>
              <div v-if="item.count > 0" class="numberCircle">{{ item.count }}</div>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
    </template>
    <template v-else>
        <v-toolbar fixed class="fixed-navbar">
            <v-toolbar-title>
                <a href="/">
                  <img src="./assets/Brid.al.png" width="120">
                </a>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
               <v-btn @click="goToDashboard()" flat>
                   Dashboard
             </v-btn>
             <v-btn flat>Features</v-btn>
             <v-btn flat>Pricing</v-btn>
             <v-btn flat>Contact</v-btn>
            </v-toolbar-items>
            <v-btn v-if="!user" @click="goToLogin()" outline color="indigo">Login</v-btn>
            <v-btn color="success">FREE TRAIL</v-btn>
         </v-toolbar>
    </template>
    <v-content class="background">
      <router-view></router-view>
      <v-snackbar v-model="snackbar" :color="snackbarColour" :timeout="snackbarTimeout">
        {{ snackbarMessage }}
        <v-btn dark flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-content>

    <!-- <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div style="width: 100%;text-align: center">&copy; {{ new Date().getFullYear() }} Kentech Software Solutions Ltd</div>
    </v-footer>-->
  </v-app>
</template>


<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    drawer: null,
    drawerRight: true,
    mini: true,
    segment: null,
    diary: false,
    picker: null,
    store: null,
    userItems: [
      { icon: "settings", title: "Settings", link: "/settings" },
      { icon: "help", title: "Help", link: "/help" }
    ],
    userEmail: "example@example.com",
    snackbar: false,
  }),
  props: {
    source: String
  },
  methods: {
    ...mapActions("account", ["logout", "changeStoreId", "getCompany"]),
    ...mapActions("staff", ["fetchEmployees"]),
    ...mapActions({
      clearAlert: "alert/clear"
    }),
    changeStore(store) {
      this.store = store;
    },
    signout() {
      this.logout();
      this.$router.push("/login");
    },
    goToDashboard () {
      this.$router.push("/dashboard");
    },
    goToLogin () {
      this.$router.push("/login");
    },
    showDatePicker() {
      // this.$router.push("/diary");

    }
  },
  watch: {
    store(val) {
      this.changeStoreId(val._id);
    },
    alertSnackbar(val) {
      if (val) {
        this.snackbar = true;
      } else {
        this.snackbar = false;
      }
    },
    snackbar(val) {
      if (!val) {
        this.clearAlert();
      }
    },
    '$route' () {
      this.segment = this.$route.path;
    }
  },
  mounted() {
    const authRequired = this.$route.meta.requiresAuth;
    this.segment = this.$route.path;
    if (authRequired) {
      this.getCompany().then(() => {
        if (this.account.company) {
          var store = this.account.company.stores.find(store => {
            return store._id === this.account.user._default_store_id;
          });
          this.store = store;
          this.fetchEmployees();
        }
      });
    }

    window.onscroll = function changeNav(){
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementsByClassName("fixed-navbar")[0].classList.add("active")
       } else {
           document.getElementsByClassName("fixed-navbar")[0].classList.remove("active");
       }

    }
  },
  computed: {
    ...mapState({
      account: state => state.account,
      dashboard: state => state.dashboard,
      alert: state => state.alert
    }),
    alertSnackbar() {
      return this.alert.message ? true : false;
    },
    snackbarColour() {
      return this.alert.type;
    },
    snackbarTimeout() {
      return this.alert.timeout;
    },
    snackbarMessage() {
      return this.alert.message;
    },
    menuItems() {
      if (this.account.user) {
        if (this.account.user.role === "user") {
          return this.allMenuItems.filter(item => !item.admin);
        } else {
          return this.allMenuItems;
        }
      } else {
        return [];
      }
    },
    allMenuItems() {
      return [
        { icon: "home", title: "Home", link: "/dashboard", admin: false, count: this.dashboard.appointments.length },
        { icon: "event", title: "Diary", link: "/diary", admin: false },
        {
          icon: "account_box",
          title: "Customers",
          link: "/customers",
          admin: false
        },
        {
          icon: "list_alt",
          title: "Products",
          link: "/products",
          admin: false
        },
        { icon: "group", title: "Staff", link: "/staff", admin: false },
        { icon: "work", title: "Enquiries", link: "/enquiries", admin: false },
        {
          icon: "bar_chart",
          title: "Analytics",
          link: "/analytics",
          admin: true
        },
        { icon: "textsms", title: "Marketing", link: "/marketing", admin: true }
      ];
    }
  }
};
</script>

<style>
.active-menu {
  background: #7b77cc;
  border-left: 3px white solid;
}

.form-background {
  background-color: #fafafa;
}

.centerScreen {
  display: flex;
  align-items: center;
  justify-content: center;
}

.routerLinkStyle {
  color: #2196f3;
  text-decoration: "none";
}

.searchBar {
  padding: 10px 20px;
  background-color: rgba(232, 239, 252, 0.404);
}

.v-datatable__actions {
  margin-right: 60px;
}

.numberCircle {
  border-radius: 50%;
  width: 25px;
  height: 25px;
  padding: 4px;
  background: red;
  color: white;
  text-align: center;
  font: 14px Arial, sans-serif;
}
.fixed-navbar {
    color: white !important;
    background-color: #f5f5f500 !important;
    box-shadow: none;
}
.fixed-navbar button {
    color: white !important;
}
.active {
  background-color: #b1a6a6 !important ;
}
</style>
