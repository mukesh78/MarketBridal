    <template>
      <v-card>
        <v-dialog v-if="deleteDialog" v-model="deleteDialog" max-width="300">
          <delete-form
            item="employee"
            v-on:close="closeDeleteDialog"
            v-on:remove="remove"
          ></delete-form>
        </v-dialog>
        <v-dialog v-if="pdfViewDialog" v-model="pdfViewDialog" max-width="730">
          <pdf-view
          :payment="payment"
          :customer="customer"
          v-on:close="closePdfViewDialog"></pdf-view>
        </v-dialog>
        <v-card dark color="primary">
          <v-toolbar flat color="transparent" height="45">
             <v-spacer></v-spacer>
             <v-tooltip top>
                 <v-btn slot="activator" flat icon @click="print(payment)">
                     <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                         <path fill="#FFFFFF" d="M14,2L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H14M18,20V9H13V4H6V20H18M10.92,12.31C10.68,11.54 10.15,9.08 11.55,9.04C12.95,9 12.03,12.16 12.03,12.16C12.42,13.65 14.05,14.72 14.05,14.72C14.55,14.57 17.4,14.24 17,15.72C16.57,17.2 13.5,15.81 13.5,15.81C11.55,15.95 10.09,16.47 10.09,16.47C8.96,18.58 7.64,19.5 7.1,18.61C6.43,17.5 9.23,16.07 9.23,16.07C10.68,13.72 10.9,12.35 10.92,12.31M11.57,13.15C11.17,14.45 10.37,15.84 10.37,15.84C11.22,15.5 13.08,15.11 13.08,15.11C11.94,14.11 11.59,13.16 11.57,13.15M14.71,15.32C14.71,15.32 16.46,15.97 16.5,15.71C16.57,15.44 15.17,15.2 14.71,15.32M9.05,16.81C8.28,17.11 7.54,18.39 7.72,18.39C7.9,18.4 8.63,17.79 9.05,16.81M11.57,11.26C11.57,11.21 12,9.58 11.57,9.53C11.27,9.5 11.56,11.22 11.57,11.26Z" />
                     </svg>
                 </v-btn>
                 <span>PDF</span>
             </v-tooltip>
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
                  <v-flex xs9>
                      <v-text-field
                        name="input-3"
                        v-model="payment.customerName"
                        label="Customer name"
                        readonly
                        ></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                      <v-text-field
                        name="input-3"
                        v-model="payment.customerNo"
                        label="Customer no"
                        readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs8>
                      <v-autocomplete
                        v-model="payment.employee"
                        :items="employees"
                        label="Employee"
                        required
                        :rules="rules.requiredRules"
                        return-object
                        item-text="name"
                      >
                      </v-autocomplete>
                  </v-flex>
                  <v-flex xs4>
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="date"
                        label="Date"
                        persistent-hint
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker
                        first-day-of-week="1"
                        ref="birthdayPicker"
                        v-model="payment.date"
                        no-title
                        min="2019-01-01"
                        max="2019-12-31"
                        ></v-date-picker>
                    </v-menu>
                  </v-flex>
                <!-- </V-layout> -->

                  <v-flex xs4>
                    <v-text-field
                    v-model="payment.balance"
                    type="number"
                    label="£ Balance"
                    box
                    readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                    v-model="payment.amount"
                    type="number"
                    label="£ Payment"
                    required
                    :rules="rules.requiredRules"
                    box
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                    label="New balance"
                    v-model="payment.newBalance"
                    type="number"
                    box
                    readonly
                    ></v-text-field>
                  </v-flex>
                  <!-- <v-layout row> -->
                  <v-flex xs12>
                      <v-autocomplete
                        v-model="payment.moneyType"
                        :items="paymentTypes"
                        label="Type"
                        required
                        :rules="rules.requiredRules"
                      >
                      </v-autocomplete>
                  </v-flex>
                  <v-flex xs12>
                      <v-combobox
                        v-model="payment.comment"
                        :items="commentItems"
                        label="Comments"
                        chips
                        clearable
                        solo
                      >
                        <template slot="selection" slot-scope="data" style="padding:20px;">
                          <v-card color="grey lighten-3" class="ma-1 pa-1">{{ data.item }}</v-card>
                        </template>
                      </v-combobox>
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
    import pdfView from '@/components/customers/pdfView';

    export default {
      props: ['newObj', 'payment', 'customer', 'employees'],
      components: {
        deleteForm,
        pdfView
      },
      data() {
        return {
            title: "Payment",
            rules: rules,
            deleteDialog: false,
            pdfViewDialog: false,
            date: new Date().toLocaleDateString(),
            menu2: false,
            dateOptions: {
                weekday: "long",
                month: "short",
                day: "numeric",
            },
            paymentTypes: [
                'Debit Card',
                'Credit Card',
                'Cash',
                'Credit Note'
            ],
            commentItems: [
                "Alterations NOT INCLUDED",
                "Price guide provided at point of purchase",
                "All items are sold as seen and it is agreed that any loose threads or beads etc. will  be repaired by Elite free of charge during the final preparation process",
                "Customer does not qualify for any other offers advertised Instore/online Due to minimum spend or dress reduction",
                "small comment"
            ]
        };
      },
      watch: {
        'payment.date': function(value) {
          this.date = new Date(value).toLocaleDateString()
        },
        'payment.amount': function(value){
          const balance = parseFloat(this.payment.balance)
          const payment = parseFloat(value) || 0
          this.payment.newBalance = balance - payment
        }
      },

      methods: {
        print() {
            this.pdfViewDialog = true;
        },
        closePdfViewDialog() {
            this.pdfViewDialog = false;
        },
        reset() {
          let vm = this
          vm.$refs.form.reset();
          vm.$emit("reset");

          setTimeout(function() {
              vm.payment.customerName = vm.customer.name
              vm.payment.customerNo = vm.customer.customerNo
          }, 1000)
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
          this.$emit("closePayment");
        },
        remove() {
          if(this.deleteDialog) {
            this.$emit("remove", this.payment)
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
    <style>
        .v-menu__content.theme--light.menuable__content__active.v-autocomplete__content {
            top: 95px;
            left: 433px;
            width: 28%;
            transform-origin: left top;
            z-index: 204;
            min-width: 420px;
        }
    </style>
