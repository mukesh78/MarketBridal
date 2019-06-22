<template>
    <v-container fill-height>
        <v-layout row class="centerScreen">
            <v-flex xs12 sm10 md6 xl4>
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-spacer></v-spacer>
                        <img src="@/assets/Brid.al.png" width="100">
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-flex>
                        <v-card-text class="text-xs-center text-sm-center text-md-center text-lg-center">
                        <p class="font-weight-light display-1 ma-0">Sign up for a free trial</p>
                        <p>Get started with a 30 day trial. No card details required</p>
                        </v-card-text>
                    </v-flex>
                    <v-flex xs12 ml-4 mr-4 mb-4 mt-0>
                        <v-form ref="signup_form" @submit.prevent="submit" v-model="valid" lazy-validation>
                            <v-container grid-list-md pa-0>
                                <v-layout row wrap class="pl-3 pr-3 pt-1 pb-1 mb-3 grey lighten-5">
                                    <v-flex xs12>
                                        <v-text-field
                                            name="first_name"
                                            label="First Name"
                                            id="first-name"
                                            v-model="form.first_name"
                                            :rules="rules.firstName"
                                            type="text"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="last_name"
                                            label="Last Name"
                                            id="last-name"
                                            v-model="form.last_name"
                                            :rules="rules.lastName"
                                            type="text"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="email"
                                            label="Email Address"
                                            id="email"
                                            v-model="form.email"
                                            :rules="rules.email"
                                            type="email"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="password"
                                            label="Password"
                                            id="password"
                                            v-model="form.password"
                                            :rules="rules.password"
                                            type="password"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="confirm_password"
                                            label="Confirm Password"
                                            id="confirm-password"
                                            v-model="form.confirm_password"
                                            :rules="rules.confirmPassword"
                                            type="password"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-btn block
                                        color="info"
                                        type="submit"
                                        :loading="status.registering"
                                        :disabled="status.registering"
                                        @click.native="loader = 'loading'"
                                        >Create Account
                                    </v-btn>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-flex>
                    
                    <v-divider></v-divider>

                    <v-card-text>
                      <v-list class="text-xs-center text-sm-center text-md-center text-lg-center">
                        Already have an account?
                        <router-link color="active" :to="{ path: '/signin'}" class="routerLinkStyle">
                          Sign in
                        </router-link>
                      </v-list>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            form: {
              first_name: null,
              last_name: null,
              email: null,
              password: null,
              confirm_password: null,
            },
            valid: false,
            rules: {
              firstName: [
                v => !!v || 'First name is required',
              ],
              lastName: [
                v => !!v || 'Last name is required',
              ],
              email: [
                v => !!v || 'Email name is required',
                v => /.+@.+/.test(v) || 'Email must be valid'
              ],
              password: [
                v => !!v || 'Password is required',
              ],
              confirmPassword: [
                v => !!v || 'Confirm password is required',
                v => v == this.form.password || 'Your password and confirmation password do not match',
              ],
            },
        }
    },
    computed: {
        ...mapState('account', ['status']),
        ...mapState({
            alert: state => state.alert
        })
    },
    watch: {
         $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    },
    methods: {
        ...mapActions('account', ['register']),
        ...mapActions({
            clearAlert: 'alert/clear' 
        }),
        submit () {
            if (this.$refs.signup_form.validate()) {
              this.register({ 
                      "firstName": this.form.first_name,
                      "lastName": this.form.last_name,
                      "email": this.form.email,
                      "password": this.form.password
                  })
            }
        }
    }
}
</script>
