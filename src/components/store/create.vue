<template>
    <v-container mt-5>
        <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md6 offset-md3 xl4 offset-xl4>
                <v-card>
                    <v-toolbar dark>
                        <v-spacer></v-spacer>
                        <img src="@/assets/Brid.al.png" width="100">
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm10 offset-sm1 md6 offset-md3 xl4 offset-xl4>
                <v-card>
                    <v-card-text>
                      <v-card-text class="text-xs-center text-sm-center text-md-center text-lg-center">
                        <p class="font-weight-light display-1 ma-0">Let's get started</p>
                        <p>Add your bridal store</p>
                      </v-card-text>
                      <v-form ref="create_store_form" @submit.prevent="create()" v-model="valid" lazy-validation>
                        <v-container class="grey lighten-5">
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="address"
                                            label="Address"
                                            id="address"
                                            v-model="form.address"
                                            :rules="rules.address"
                                            type="text"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="city"
                                            label="City"
                                            id="city"
                                            v-model="form.city"
                                            :rules="rules.city"
                                            type="text"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="postcode"
                                            label="Postcode"
                                            id="postcode"
                                            v-model="form.postcode"
                                            :rules="rules.postcode"
                                            type="text"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="store-name"
                                            label="Store Name"
                                            id="store-name"
                                            v-model="form.store_name"
                                            :rules="rules.storeName"
                                            type="text"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="phone"
                                            label="Phone"
                                            id="phone"
                                            v-model="form.phone"
                                            :rules="rules.phone"
                                            type="text"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="email"
                                            label="Email"
                                            id="email"
                                            v-model="form.email"
                                            :rules="rules.email"
                                            type="email"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                        </v-container>
                        <v-container>
                          <v-layout row>
                            <v-flex xs12>
                              <v-btn block
                              color="info"
                              type="submit"
                              :loading="loading"
                              :disabled="loading"
                              >Create Store</v-btn>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row v-if="error">
            <v-flex xs12 sm10 offset-sm1 md6 offset-md3 xl4 offset-xl4>
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
          valid: false,
          form: {
            address: null,
            city: null,
            postcode: null,
            store_name: null,
            phone: null,
            email: null
          },
          rules: {
            address: [
              v => !!v || 'Address is required',
            ],
            city: [
              v => !!v || 'City is required',
            ],
            postcode: [
              v => !!v || 'Postcode is required',
            ],
            storeName: [
              v => !!v || 'Store name is required'
            ],
            phone: [
              v => !!v || 'Phone is required',
            ],
            email: [
              v => !!v || 'Email name is required',
              v => /.+@.+/.test(v) || 'Email must be valid'
            ]
        },
      }
    },
    computed: {
        error () {
            return this.$store.state.moduleStore.error;
        },
        loading () {
            return this.$store.state.moduleStore.loading;
        }
    },
    methods: {
        create () {
          if (this.$refs.create_store_form.validate()) {
            this.$store.dispatch('createStore', this.form);
          }
        },
        onDismissed () {
            this.$store.dispatch('clearError')
        }
    }
}
</script>
