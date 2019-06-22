<template>
  <v-container fill-height>
    <!-- <v-layout row class="centerScreen"> -->
      <v-flex xs12 sm10 offset-sm1 md6 offset-md3 xl4 offset-xl4>
        <v-card>
          <v-toolbar dark color="primary">
            <v-spacer></v-spacer>
            <img src="@/assets/Brid.al.png" width="100">
            <v-spacer></v-spacer>
            <v-icon>person</v-icon>
          </v-toolbar>
          <v-flex xs12 ma-4>
            <form @submit.prevent="onSignIn">
              <v-container grid-list-md pa-0>
                <v-layout row wrap class="pl-3 pr-3 pt-1 pb-1 mb-3 grey lighten-5">
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-btn
                    block
                    color="info"
                    type="submit"
                    :loading="status.loggingIn"
                    :disabled="status.loggingIn"
                    @click.native="loader = 'loading'"
                  >Sign In</v-btn>
                </v-layout>
              </v-container>
            </form>
          </v-flex>
          <v-divider></v-divider>

          <v-card-text>
            <v-list class="text-xs-center text-sm-center text-md-center text-lg-center pa-0">
              <div class="pa-2">
                <router-link :to="{ path: '/signin'}" class="routerLinkStyle">Forgot your password?</router-link>
              </div>
              <div>
                New to BRID.AL?
                <router-link :to="{ path: '/register'}" class="routerLinkStyle">Create an account</router-link>
              </div>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    <!-- </v-layout> -->
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapState("account", ["status"]),
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions("account", ["login"]),
    ...mapActions({
      clearAlert: "alert/clear"
    }),
    onSignIn() {
      const { email, password } = this;
      if (email && password) {
        this.login({ email, password });
      }
    }
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    }
  },
  mounted() {
    console.log("LOADED LOGIN");
  }
};
</script>

