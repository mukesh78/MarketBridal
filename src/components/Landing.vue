<template>
    <v-content class="test">
      <v-container fluid grid-list-lg banner-section>
          <v-container>
              <v-layout row wrap main-banner-section text-md-center>
                <v-flex lg24>
                  <span class="main-title">A better way to run your bridal store</span>
                  <v-layout row>
                        <v-flex lg6 offset-lg3 xs12>
                            <p class="info-text">
                                Take bookings, create sales, manage customers from any device, anywhere
                            </p>
                            <v-btn class="custom-button">Start your free trial</v-btn>
                        </v-flex>
                  </v-layout>
                  <v-layout row>
                      <v-flex lg24>
                          <img class="hero-image img-fluid" src="@/assets/home.png" alt="checkly monitoring dashboard">
                      </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
          </v-container>
      </v-container>
      <v-container fluid grid-list-lg curve-up-down help-section>
          <v-container>
          <v-layout main>
              <br/>
              <br/>
              <v-layout row text-md-center>
                  <v-flex xs6 offset-xs3>
                      <span class="bridal-management-title">Bridal helps your bussiness success</span>
                      <p>We take of all the boring bits so you can concentrate on doing what you do best</p>
                  </v-flex>
              </v-layout>
          </v-layout>
          <br/>
          <br/>
          <v-layout  wrap>
              <v-flex  xs12 md3 small-card text-md-center>
                  <span class="blank-div"></span>
                  <v-card class="card-div">
                      <br/>
                      <span class="bridal-management-title">
                          Realtime Dashboard
                      </span>
                      <br/>
                      <p>Monitor your store(s) from one simple dashboard</p>
                  </v-card>
              </v-flex>
              <v-flex xs12 md3 small-card text-md-center>
                  <span class="blank-div"></span>
                  <v-card class="card-div">
                      <br/>
                      <span class="bridal-management-title">Dairy Management</span>
                      <br/>
                      <p>Mange your diary and your day with our simple calendar</p>
                  </v-card>
              </v-flex>
              <v-flex xs12 md3 small-card text-md-center>
                  <span class="blank-div"></span>
                  <v-card class="card-div">
                      <br/>
                      <span class="bridal-management-title">Customer Accounts </span>
                      <br/>
                      <p>View the customer's timeline of events and manage their lifecycle </p>
                  </v-card>
              </v-flex>
              <v-flex xs12 md3 small-card text-md-center>
                  <span class="blank-div"></span>
                  <v-card class="card-div">
                      <br/>
                      <span class="bridal-management-title">Automatic PDF's </span>
                      <br/>
                      <p>Just print the sale receipt, payment receipt or enquiry form</p>
                  </v-card>
              </v-flex>
          </v-layout>
       </v-container>
      </v-container>
      <v-container fluid feature-section>
          <v-layout main>
              <v-layout wrap>
                  <v-flex xs12 md6 py-5 calendar-image-div>
                      <img class="small-calendar-image" src="@/assets/home.png" alt="checkly monitoring dashboard">
                  </v-flex>
                  <v-flex  xs12 md6 py-5 calendar-image-div>
                      <h2>Feature to run every part of your business</h2>
                      <p>Bridal is still in development but has a extensive list of current feature</p>
                      <v-layout wrap button-section>
                          <v-flex xs12 sm12 md6>
                              <v-btn depressed  small class="active" color="primary">> Simple Diary</v-btn>
                              <v-btn depressed small color="primary">> Simple Diary</v-btn>
                              <v-btn depressed small color="primary">> Simple Diary</v-btn>
                              <v-btn depressed small color="primary">> Simple Diary</v-btn>
                          </v-flex>
                          <v-flex xs12 sm12 md6>
                              <v-btn depressed small color="primary">> Mobile App</v-btn>
                              <v-btn depressed small color="primary">> Mobile App</v-btn>
                              <v-btn depressed small color="primary">> Mobile App</v-btn>
                              <v-btn depressed small color="primary">> Mobile App</v-btn>
                          </v-flex>
                      </v-layout>
                  </v-flex>
              </v-layout>
          </v-layout>
      </v-container>
      <v-container fluid curve-up-down feature-section-2 style="position: relative">
          <v-layout main>
              <v-layout wrap>
                  <v-flex xs12 sm12 md6 calendar-image-div>
                      <h2>Feature to run every part of your business</h2>
                      <p>Bridal is still in development but has a extensive list of current feature</p>
                      <v-layout wrap button-section>
                          <v-flex xs12 sm12 md6>
                              <v-btn depressed small class="active" color="primary">> Simple Diary</v-btn>
                              <v-btn depressed small color="primary">> Simple Diary</v-btn>
                              <v-btn depressed small color="primary">> Simple Diary</v-btn>
                              <v-btn depressed small color="primary">> Simple Diary</v-btn>
                          </v-flex>
                          <v-flex xs12 sm12 md6>
                              <v-btn depressed small color="primary">> Mobile App</v-btn>
                              <v-btn depressed small color="primary">> Mobile App</v-btn>
                              <v-btn depressed small color="primary">> Mobile App</v-btn>
                              <v-btn depressed small color="primary">> Mobile App</v-btn>
                          </v-flex>
                      </v-layout>
                  </v-flex>
                  <v-flex xs12 sm12 md6 calendar-image-div>
                      <img class="small-calendar-image" src="@/assets/home.png" alt="checkly monitoring dashboard">
                  </v-flex>
              </v-layout>
          </v-layout>
      </v-container>
      <v-container fluid contact-section>
          <v-layout main>
              <v-layout row text-md-center contact-main-section>
                  <v-flex xs12 sm12 md6 contact-text style="background-color: rgb(52, 134, 226)">
                    <br/><br/><br/><br/><br/><br/>
                    <h3>GET IN TOUCH</h3>
                    <p>You can call us for help integrating your current system into Brid.al</p>
                    <v-btn outline color="indigo">Contact Us</v-btn>
                  </v-flex>
                  <v-flex xs12 sm12 md6 contact-text style="background-color: #5f5959;">
                      <br/><br/><br/><br/><br/><br/>
                      <h3>API & SDK</h3>
                      <p>Connect your website to send appointment request into your diary.</p>
                      <v-btn outline color="indigo">Documentation</v-btn>
                  </v-flex>
              </v-layout>
          </v-layout>
      </v-container>
      <v-container fluid packages>
         <v-container>
          <br/>
          <v-layout row>
              <v-flex xs12 text-md-center>
                  <span class="plan-heading">Pricing plan</span>
                  <p class="plan-description">All plan start with a 30 day free trial</p>
              </v-flex>
          </v-layout><br/>
          <br/><br/><br/>
          <v-layout wrap class="gutter-3" text-md-center>

             <v-flex xs12 sm4>
              <v-card class="price-card">
                <v-card-text class="package-title"> Starter</v-card-text>
                <br/>
                <br/>
                <v-card-text class="price-text">50<small>/month</small></v-card-text>
                <br/>
                <p>Unlimted Appointment Request</p>
                <p>Unlimted Payments</p>
                <p>Unlimted Products</p>
                <p>Unlimted Sales</p>
                <p>Unlimted Dairy Appointments</p>
                <p>1 User </p>
                <p>1 Store </p>
                <p>50 FREE Texts </p>
                <v-btn outline color="indigo">Documentation</v-btn>
                <br/>
                <br/>
              </v-card>
            </v-flex>
             <v-flex xs12 sm4 >
              <v-card class="price-card">
                <v-card-text class="package-title">Proffessional</v-card-text>
                <br/>
                <br/>
                <v-card-text class="price-text blue-text">85<small>/month</small></v-card-text>
                <br/>
                <p>Unlimted Appointment Request</p>
                <p>Unlimted Payments</p>
                <p>Unlimted Products</p>
                <p>Unlimted Sales</p>
                <p>Unlimted Dairy Appointments</p>
                <p>1 User </p>
                <p>1 Store </p>
                <p>50 FREE Texts </p>
                <v-btn outline color="indigo">Documentation</v-btn>
                <br/>
                <br/>
              </v-card>
            </v-flex>
             <v-flex xs12 sm4>
              <v-card class="price-card">
                <v-card-text class="package-title">Proffessional</v-card-text>
                <br/>
                <br/>
                <v-card-text class="price-text">85<small>/month</small></v-card-text>
                <br/>
                <p>Unlimted Appointment Request</p>
                <p>Unlimted Payments</p>
                <p>Unlimted Products</p>
                <p>Unlimted Sales</p>
                <p>Unlimted Dairy Appointments</p>
                <p>1 User </p>
                <p>1 Store </p>
                <p>50 FREE Texts </p>
                <v-btn outline color="indigo">Documentation</v-btn>
                <br/>
                <br/>
              </v-card>
            </v-flex>
         </v-layout>
         <br/><br/><br/>
        </v-container>
      </v-container>
      <v-container fluid about-section style="background-color: #efefef; margin-top: -60px">
          <v-container>
              <br/><br/><br/>
              <v-layout wrap class="gutter-3" >
                 <v-flex xs12 sm3>
                    <span class="heading-text"> Babil</span>
                    <p>Morbi convallis bibendum urna ut viverra. Maecenas quis consequat libero,</p>
                    <p>% &nbsp; &nbsp;  & &nbsp; &nbsp;  ' &nbsp; &nbsp;  +  &nbsp; &nbsp; &nbsp; )</p>
                 </v-flex>
                 <v-flex xs12 sm3>
                     <span class="heading-text">Helpful Links</span>
                     <p><a href="#"> < About Us</a></p>
                     <p><a href="#"> < Features</a></p>
                     <p><a href="#"> < FAQ's</a></p>
                     <p><a href="#"> < Blogs</a></p>
                 </v-flex>
                 <v-flex xs12 sm3>
                     <span class="heading-text">Support</span>
                     <p><a href="#"> < Privacy Policy</a></p>
                     <p><a href="#"> < Terms of Use </a></p>
                     <p><a href="#"> < Support Center</a></p>
                     <p><a href="#"> < Contact</a></p>
                 </v-flex>
                 <v-flex xs12 sm3>
                     <span class="heading-text">Contact Us</span>
                     <p>455 West Orchard Street Kings MOuntains, Nc 28086</p>
                     <p>Phone: (272) 211-7370</p>
                     <p>Email: <a href="#">support@yourbrand.com </a></p>
                 </v-flex>

          </v-layout>
        </v-container>
      </v-container>
    </v-content>
</template>
<style scoped>
.heading-text {
    color: #4c4c4c;
    font-weight: 500;
}
.price-card button {
    border-color: rgb(52, 134, 226);
    color: rgb(52, 134, 226) !important;
}
.button-section button {
  background-color: #f3f3f3 !important;
  border-color: #babef7 !important;
  color: #8c8986 !important;
}
.button-section button.active {
  background-color: #313896 !important;
  border-color: #313896 !important;
  color: #ffffff !important;
}
.feature-section-2 button {
  background-color: #f9f9f9 !important;
  border-color: #f9f9f9 !important;
  color: #8c8986 !important;
}

.plan-heading {
    font-size: 30px;
    color: #867f7f
}
.plan-description {
    color: #929aa0;
}
.packages  {
    position: relative;
    background-color: #FFF;
    border-radius: 200vh 200vh 200vh 200vh / 20vh 20vh 20vh 20vh;
    -moz-border-radius: 200vh 200vh 200vh 200vh / 20vh 20vh 20vh 20vh;
    -webkit-border-radius: 200vh 200vh 200vh 200vh / 20vh 20vh 20vh 20vh;
    margin-top: -30px
}
.price-text {
    color: #66baffed;
    font-size: 30px;
    font-size: 30px;
    padding: 2px 0;
    background-color: #efefef;
}
.package-title {
    position: absolute;
    background-color: rgb(52, 134, 226);
    color: #ffffff;
    top: -17px;
    width: 132px;
    padding: 9px;
    text-align: center;
    left: 113px;
}
.price-text.blue-text {
        background-image: linear-gradient(to right, #8ab8ec, #0d62a9ed) !important;
        color: #ffffff;
}
.gutter-3 {
  box-sizing: border-box;
  margin-left: -16px;
  margin-right: -16px;
}

.gutter-3 > * {
   padding-left: 16px;
   padding-right: 16px;
}
.contact-section {
    padding: 0px;
    margin-top: -60px;
    z-index: 0;
}
.contact-main-section {
    min-height: 300px;
}
.curve-up {
  border-radius: 200vh 200vh 0% 0% / 20vh  20vh 0% 0%;
  -moz-border-radius: 200vh 200vh 0% 0% / 20vh  20vh 0% 0%;
  -webkit-border-radius: 200vh 200vh 0% 0% / 20vh  20vh 0% 0%;
}
 .curve-down {
  border-radius: 0% 0% 200vh 200vh / 0% 0% 20vh 20vh;
  -moz-border-radius: 0% 0% 200vh 200vh / 0% 0% 20vh 20vh;
  -webkit-border-radius: 0% 0% 200vh 200vh / 0% 0% 20vh 20vh;
}
 .curve-up-down {
  border-radius: 200vh 200vh 200vh 200vh / 20vh 20vh 20vh 20vh;
  -moz-border-radius: 200vh 200vh 200vh 200vh / 20vh 20vh 20vh 20vh;
  -webkit-border-radius: 200vh 200vh 200vh 200vh / 20vh 20vh 20vh 20vh;
}
.banner-section {
      background: rgb(102, 140, 255);
      background-image: linear-gradient(to right, #db95fd, #66baffed);
      height: 100vh;
      min-height: 55rem;
      overflow: hidden;
}
.main-banner-section {
    margin-top: 100px !important;
}
.v-toolbar {
    box-shadow: none !important;
}
.main-title {
    font-size: 54px;
    color: #ffffff;
}
.info-text {
    font-size: 24px;
    color: #ffffff;
}
.bridal-management-title {
    font-size: 24px;
}
.custom-button {
    color: #ffffff;
    background-color: #33ea3a !important;
    border-color: #33ea3a !important;
}
.card-div {
    padding: 20px;
    border-radius: 10px;
    min-height: 215px;
}
.purple-box {

}
.help-section {
    background: #efefef;
    min-height: 33rem;
    margin-top: -98px;
    position: relative;
}
.hero-image {
    width: 100%;
}
.blank-div {
    width: 60px;
    height: 60px;
    background-color: #7269ce;
    position: absolute;
    left: 113px;
    top: -21px;
    border-radius: 8px;
    z-index: 1;
}
.small-card {
    position: relative;
}
.v-content {
    background-color: #ffffff !important;
}
.feature-section-2 {
    background-color: #efefef;
}
.small-calendar-image {
    width: 100%
}
.calendar-image-div {
    padding: 70px
}
.button-section button {
    width: 176px;
}
@media only screen and (max-width: 767px) {
  .banner-section {
      height: 55vh;
      min-height: 100vh;
  }
  .button-section button {
    width: -webkit-fill-available;
  }
  .main-title {
    font-size: 24px;
    text-align: center;
  }
  .blank-div {
      left: 103px;
  }
  .main-banner-section {
    text-align: center;
    margin-top: 50px !important
  }
  .info-text {
    text-align: center;
    font-size: 16px
  }
  .packages .text-md-center {
    text-align: center;
  }
  .packages .text-md-center .flex.xs12.sm4{
    margin-bottom: 40px
  }
  .package-title {
    left: 66px;
  }
  .about-section {
    text-align: center;
  }
  .help-section .small-card {
      margin-bottom: 148px;
  }
  .contact-section {
      margin-top: -108px;
      margin-bottom: 17px;
  }
  .calendar-image-div {
    padding: 7px
  }
}
.contact-text {
    color: #ffffff;
}
.contact-text button {
    border-color: #ffffff;
    color: #ffffff !important;
}
.about-section p, .about-section a {
    color: #597b98;
    text-decoration: none;
}
</style>
<script>
import { mapState, mapActions } from 'vuex'
import moment,{ min } from 'moment'

export default {
  data() {
    return {

    };
  },
  methods: {

  },
  mounted() {

  },
  computed: {

  }
};
</script>
