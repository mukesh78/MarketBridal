<template>
  <v-container fluid pa-3>
    <div>
      <v-card v-if="customer !== null">
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <h1 class="name">{{customer.name}}</h1>
            <!-- <h2 class="customerNo">C18-0001</h2> -->
          </v-flex>
          <v-flex xs12 sm6>
            <v-toolbar flat color="white">
              <v-toolbar-title></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn flat @click="viewContact()">
                  <v-icon large>contact_phone</v-icon>
                </v-btn>
                <v-btn flat>
                  <v-icon large>event</v-icon>
                </v-btn>
                <v-btn flat>
                  <v-icon large>add_shopping_cart</v-icon>
                </v-btn>
                <v-btn flat @click="newPayment()">
                  <font-awesome-icon
                    prefix="far"
                    icon="pound-sign"
                    :style="{ color: 'black' }"
                    size="2x"
                  />
                </v-btn>
                <v-btn flat @click="newComment()">
                  <v-icon large>comment</v-icon>
                </v-btn>
              </v-toolbar-items>
              <v-dialog v-model="contactDialog" max-width="400">
                <contact-form
                :customer="customer"
                v-on:edit="editCustomer"
                v-on:close="closeCustomer"
                ></contact-form>
              </v-dialog>
            </v-toolbar>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12 md7 lg8>
            <v-container grid-list-sm ma-0 style="padding:10px">
              <v-layout row wrap>
                <v-flex xs6>
                    <v-card dark class="pt-1 pb-1 pl-2 pr-2" color="primary">
                      <div class="statTitle">Customer #</div>
                      <div class="statValue">{{customer.customerNo || '#'}} </div>
                    </v-card>
                </v-flex>
                <v-flex xs6>
                  <v-card dark class="pt-1 pb-1 pl-2 pr-2" color="primary">
                    <div class="statTitle">Wedding Date</div>
                    <div class="statValue">{{new Date(customer.weddingDate).toLocaleDateString('en-gb') || '##/##/####'}}</div>
                  </v-card>
                </v-flex>
                <v-flex xs6 sm3 v-for="(item, i) in summaryItems2" :key="'B' + i">
                  <v-card dark class="pt-1 pb-1 pl-2 pr-2" color="primary">
                    <div class="statTitle">{{ item.title }}</div>
                    <div class="statValue">{{ item.value }}</div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
            <v-flex xs12>
              <v-tabs fixed-tabs v-model="tabModel">
                <v-tab ripple>SALES</v-tab>
                <v-tab>PAYMENTS</v-tab>
                <v-tab>COMMENTS</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tabModel">
                <v-tab-item>
                  <v-alert
                      :value="true"
                      type="info"
                      class="ma-2"
                      v-if="sales.length == 0"
                    >
                      No Sales
                    </v-alert>
                  <v-container fluid grid-list-md ma-0 style="padding:10px" v-if="sales.length > 0">
                    <v-layout row wrap>
                      <v-flex xs12 sm6 xl4 v-for="(item, i) in sales" :key="i">
                        <view-sale
                          :sale="item"
                          :popup="false"
                          v-on:edit="editSale(item, i)"
                        ></view-sale>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-tab-item>
                <v-tab-item>
                  <v-alert
                      :value="true"
                      type="info"
                      class="ma-2"
                      v-if="payments.length == 0"
                    >
                      No Payments
                    </v-alert>
                  <v-container fluid grid-list-md ma-0 v-if="payments.length > 0">
                    <v-layout row wrap>
                      <v-flex xs12 sm6 xl4 v-for="(item, i) in payments" :key="i">
                        <view-payment
                          :payment="item"
                          :popup="false"
                          v-on:edit="editPayment(item, i)"
                        ></view-payment>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-tab-item>
                <v-tab-item>
                  <v-alert
                      :value="true"
                      type="info"
                      class="ma-2"
                      v-if="customer.comments.length == 0"
                    >
                      No Comments
                    </v-alert>
                  <v-container pa-0 pr-3 v-if="customer.comments.length > 0">
                    <v-timeline align-top dense style="height:100%">
                      <v-timeline-item
                        v-for="(item, i) in customer.comments"
                        color="green lighten-1"
                        :key="i"
                        small
                        left
                      >
                        <v-card color="grey lighten-3">
                          <v-layout pa-3>
                            <v-flex xs3 md2 style="text-align:left">
                              <strong>{{ new Date(item.createdAt).toLocaleDateString('en-gb') }}</strong>
                            </v-flex>
                            <v-flex xs9 md10>{{ item.text }}</v-flex>
                          </v-layout>
                        </v-card>
                      </v-timeline-item>
                    </v-timeline>
                  </v-container>
                </v-tab-item>
              </v-tabs-items>
            </v-flex>
          </v-flex>
          <v-flex xs12 md5 lg4>
            <v-timeline align-top dense style="height:100%; padding-top:10px">
              <v-card flat dark color="primary" class="pa-2 timeline">
                <div class="timelineLabel">TIMELINE</div>
              </v-card>
              <v-timeline-item
                v-for="(item, i) in items"
                color="green lighten-1"
                :icon="item.icon"
                :key="i"
                small
                left
              >
                <v-layout pt-3>
                  <v-flex xs3 style="text-align:left">
                    <strong>{{ item.date }}</strong>
                  </v-flex>
                  <v-flex xs6 pl-1>
                    <strong>{{ item.type }}</strong>
                    <div class="caption">Web App</div>
                  </v-flex>
                  <v-flex xs3>
                    <v-btn icon>
                      <v-icon>visibility</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-timeline-item>
            </v-timeline>
          </v-flex>
        </v-layout>
      </v-card>
      <v-dialog v-if="newPaymentDialog" v-model="newPaymentDialog" max-width="500">
        <new-payment
        :newObj="this.newObj"
        :payment="payment"
        :customer="customer"
        :employees="employees"
        v-on:closePayment="closePayment"
        v-on:create="createNewPayment"
        v-on:update="updatePayment"
        v-on:remove="removePayment"
        v-on:reset="reset"
        ></new-payment>
      </v-dialog>
      <v-dialog v-if="newCommentDialog" v-model="newCommentDialog" max-width="500">
        <new-comment
        :newObj="this.newObj"
        :comment="comment"
        v-on:create="createNewComment"
        v-on:closeComment="closeComment"
        ></new-comment>
      </v-dialog>
    </div>
    <invoice-pdf v-if="customer" style="display: none"
    :payment="paymentInfo"
    :customer="customer"></invoice-pdf>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import contactForm from "./contact";
import newPayment from "./newPayment";
import newComment from "./newComment";
import viewPayment from "./viewPayment";
import viewSale from "./viewSale"
import invoicePdf from '@/components/customers/invoicePdf';


export default {
  components: {
      contactForm,
      newPayment,
      newComment,
      viewPayment,
      viewSale,
      invoicePdf
  },
  data: () => ({
    customer: null,
    tabModel: 0,
    newPaymentDialog: false,
    newCommentDialog: false,
    newObj: true,
    payment: {},
    payments: [],
    employees: [],
    paymentInfo: {},
    comment: {},
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    contactDialog: false,
    // commentItems: [
    //   {
    //     date: "10/10/2018",
    //     type: "Sale",
    //     color: "green lighten-1",
    //     comment:
    //       "Customers mum has called and due to a financial problem may need to cancel the dress"
    //   },
    //   {
    //     date: "10/11/2018",
    //     type: "General",
    //     color: "green lighten-1",
    //     comment:
    //       "Customers mum has called and due to a financial problem may need to cancel the dress"
    //   },
    //   {
    //     date: "10/12/2018",
    //     type: "Payment",
    //     color: "green lighten-1",
    //     comment:
    //       "Customers mum has called and due to a financial problem may need to cancel the dress"
    //   }
    // ],
    sales: [],
    payments: [],
    summaryItems2: [
      {
        title: "Sales",
        value: "£1200"
      },
      {
        title: "Deposits",
        value: "£600"
      },
      {
        title: "Payments",
        value: "£300"
      },
      {
        title: "Balance",
        value: "£300"
      }
    ],
    items: [
      {
        color: "green lighten-1",
        icon: "mdi-star",
        date: "10/11/18",
        type: "Comment"
      },
      {
        color: "green lighten-1",
        icon: "mdi-book-variant",
        date: "01/10/18",
        type: "Comment"
      },
      {
        color: "red lighten-1",
        icon: "mdi-airballoon",
        date: "05/09/18",
        type: "Sale"
      },
      {
        color: "blue lighten-1",
        icon: "mdi-buffer",
        date: "23/08/18",
        type: "Appointment"
      }
    ]
  }),
  mounted() {
      this.employees = this.staff.items.map(employee => ({ _id: employee._id, name: employee.name }));
       
      this.fetchCustomerByNo(this.$route.params.id).then(resp => {
        this.customer = resp.customer;

        console.log(resp)

        resp.payments.forEach((payment)=>{
          payment.employee = this.getEmployee(payment.employeeId)
        })
        this.payments = resp.payments;
        
        resp.sales.forEach((sale)=>{
          sale.employee = this.getEmployee(sale.employeeId)
        })
        this.sales = resp.sales;
      });
  },
  computed: {
    ...mapState({
      staff: state => state.staff,
      account: state => state.account
    })
  },
  methods: {
    ...mapActions("staff", ["fetchEmployees"]),
    ...mapActions("customers", [
        "fetchCustomerByNo",
        "createPayment",
        'fetchPayments',
        'updatePayment',
        'deletePayment',
        'createComment'
    ]),

    viewContact() {
      this.contactDialog = true;
    },
    newPayment() {
        this.newPaymentDialog = true
        this.newObj = true
        this.payment = {
            customerName: this.customer.name,
            customerNo: this.customer.customerNo,
            customerId: this.customer._id,
            balance: 400, //dummy for now
            newBalance: 400,
            date: new Date().toISOString().substr(0, 10)
        }
    },
    closePayment() {
        this.newPaymentDialog = false
    },
    getEmployee(employeeId) {
        return this.employees.find(employee =>  {
          return employee._id === employeeId;
        })
    },
    createNewPayment() {
        this.payment.customer = this.customer._id
        this.payment.employee = this.payment.employee._id
        this.createPayment(this.payment).then((resp) => {
            this.paymentItems.push(resp.payment)
            this.paymentInfo = resp.payment;
            this.newPaymentDialog = false;
        })
    },
    downloadInvoice() {
        let doc = new jsPDF('p', 'mm', [500, 250])
        let source = document.getElementById('invoice')
        let options = {
            pagesplit: true,
        }
        source.style.display = 'block'
        doc.addHTML(source, options, function () {
          doc.save('payment-invoice.pdf')
        })
        setTimeout(function () {
          source.style.display = 'none'
        }, 100)
    },
    editPayment(payment, index) {
      this.payment = window.cloneDeep(payment);
      this.payment.index = index
      this.payment.customerNo = this.customer.customerNo
      this.payment.balance = 400 //dummy for now
      this.payment.newBalance = 400
      this.newPaymentDialog = true
      this.newObj = false
    },
    editSale(sale, index) {
      console.log("edit sale")
    },
    updatePayment() {
        this.updatePayment(this.payment).then(()=> {
            this.newPaymentDialog = false;
        })
    },
    removePayment(payment) {
        this.deletePayment(this.payment).then(() => {
            this.paymentItems.splice(payment.index, 1);
            this.newPaymentDialog = false;
        })
    },
    reset() {
        this.newObj = true
    },
    newComment() {
      this.newObj = true
      this.newCommentDialog = true
      this.comment = {
        text: ''
      }
    },
    closeComment() {
      this.newCommentDialog = false
    },
    createNewComment() {
      this.comment.customerId = this.customer._id
      this.createComment(this.comment).then((resp)=> {
        this.customer = resp.customer
        this.newCommentDialog = false
      })
    },
    updateComment() {

    },
    removeComment(comment) {

    },
    editCustomer() {

    },
    closeCustomer() {
      this.contactDialog = false
    }
  }
};
</script>

<style>
.summary {
  background-color: red;
  height: 50px;
}

.timeline {
  padding-left: 0px;
  margin-left: 0px;
}

.timeline {
  margin-left: 30px;
  margin-right: 10px;
}

.statTitle {
  text-align: right;
  font-size: 18px;
  opacity: 0.4;
}

.statValue {
  text-align: right;
  font-size: 30px;
  opacity: 0.75;
  font-weight: 100;
}

.name {
  padding: 10px;
  height: 100%;
  display: flex;
  align-items: center;
}

.customerNo {
  padding: 0px 10px 0px 10px;
  margin: -8px 0px 0px 0px;
}

.summaryLabel {
  text-align: left;
  font-size: 14px;
  opacity: 0.4;
  flex: 0 0 25%;
}

.summaryValue {
  text-align: right;
  font-size: 18px;
  opacity: 0.75;
  font-weight: 100;
  flex: 1;
}

.titleLabel {
  text-align: left;
  font-size: 26px;
  opacity: 0.4;
}
</style>

<style scoped>
.editButton {
  position: absolute;
  top: 15px;
}

.timelineLabel {
  text-align: center;
  font-size: 26px;
  opacity: 0.4;
}
</style>
