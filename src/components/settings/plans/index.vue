<template>
  <v-container :fluid="this.$vuetify.breakpoint.mdAndDown">
    <v-card>
      <v-card-title primary-title>
        <div style="width:100%" class="text-xs-center">
          <div class="display-1 ma-1">Choose a plan</div>
          <div>
            <span class="subheading font-weight-thin">
              You are currently on the
              <span class="font-weight-bold">Trial</span> plan
            </span>
            <div class="mt-4">
              <v-btn
                :outline="!monthly"
                color="secondary"
                class="ma-0"
                @click="monthly=!monthly"
              >Monthly</v-btn>
              <v-btn
                :outline="monthly"
                color="secondary"
                class="ma-0"
                @click="monthly=!monthly"
              >Annual</v-btn>
            </div>
            <div
              class="ma-2 font-weight-bold subheading"
              v-bind:style="monthly ? 'opacity:0.7; color:grey' : 'opacity:0.8;color:red'"
            >{{ monthly ? '0' : '2' }} months free</div>
          </div>
        </div>
      </v-card-title>
      <v-container grid-list-xl fluid pt-0>
        <v-layout row wrap>
          <!-- <v-flex xs12 md3 v-if="this.$vuetify.breakpoint.xlAndUp">
            <v-card class="elevation-5">
              <v-list class="pa-0">
                <v-card color="grey lighten-2">
                  <div class="text-xs-center pa-3 headline">
                    <span class="font-weight-medium" style="opacity:0.4">Features</span>
                  </div>
                </v-card>
                <template v-for="(service, indexService) in services">
                  <v-hover :key="indexService">
                  <v-tooltip right :key="indexService">
                    <template v-slot:activator="{ hover }">
                      <v-list-tile
                        :key="indexService"
                        v-bind:style="indexService % 2 == 0 ? 'background-color: #f9fafc' : null"
                        v-on="hover"
                      >
                        <v-list-tile-content>
                          <v-list-tile-title class="text-xs-center" v-text="service.name"></v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                    <span>{{ service.description }}</span>
                  </v-tooltip>
                  </v-hover>
                </template>
                <v-list-tile style="background-color: #f9fafc">
                  <v-list-tile-content>
                    <v-list-tile-title class="text-xs-center headline">Price</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex> -->
          <v-flex xs12 md4 sm6 v-for="(plan, indexPlan) in plans" :key="indexPlan">
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 16 : 5}`"
                @click="chosenPlan(plan)"
                :disabled="plan.current"
                ripple
              >
                <v-list class="pa-0">
                  <v-card dark :color="plan.color">
                    <div class="text-xs-center pa-3 headline text-capitalize">
                      <span class="font-weight-medium" style="opacity:0.5">{{ plan.name }}</span>
                    </div>
                  </v-card>
                  <template v-for="(item, indexService) in plan.services">
                    <v-list-tile
                      :key="indexService"
                      v-bind:style="indexService % 2 == 0 ? 'background-color: #f9fafc' : null"
                    >
                      <v-list-tile-content class="font-weight-regular" style="opacity:0.6">
                        {{ services[indexService].name }}
                      </v-list-tile-content>
                      <v-list-tile-content class="font-weight-medium subheading align-end">
                        {{ item }}
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>
                  <v-list-tile style="background-color: #f9fafc">
                    <v-list-tile-content>
                      <v-list-tile-title class="text-xs-center headline">
                        £{{ monthly ? plan.price: plan.yearlyPrice }}
                        <span
                          class="body-2 font-weight-thin"
                        >/ month</span>
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile style="background-color: #f9fafc">
                    <v-list-tile-content>
                      <v-btn
                        color="secondary"
                        block
                        :disabled="plan.current"
                      >{{ plan.current ? 'Current plan' : 'Choose' }}</v-btn>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container class="text-xs-center">
        <div class="font-weight-light.font-italic" style="opacity:0.7">Prices are excluding VAT</div>
        <div class="font-weight-medium.font-italic subheading" style="opacity:0.7">
          Don't see a plan that works for you?
          <a href>Let us know</a> your situation and we'll be happy to help
        </div>
      </v-container>
    </v-card>
  </v-container>
  <!-- <v-container dark grid-list-md text-xs-center class="v-container">
        <v-layout row wrap>
            <v-flex xs12 md2 x2 class="plan-section">
                <v-list-tile-title style="text-align:center"></v-list-tile-title>
                <v-list two-line style="margin-top: 8px; background-color:transparent">
                  <template>
                    <v-list-tile style="height: 56px" v-for="(service, index) in services" :key="index" avatar :class="index === 0 ? 'border-top' : ''">
                      <v-list-tile-content class="plan-list">
                        <span class="plan-text">{{ service }}</span>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                  </template>
                  <v-list-tile-title class="price-title">Price</v-list-tile-title>
                </v-list>
            </v-flex>
            <v-flex style="position: relative" v-for="(pack, index) in packages" :key="`2${index}`" xs12 md2 x2>
              <v-card light :color="getColor(pack.name)">
                <v-list-tile-title class="package-name" v-text="pack.name"></v-list-tile-title>
                  <template>
                     <v-list-tile v-for="(service, index) in pack.services" :key="index" avatar ripple>
                       <v-list-tile-content>
                         <v-list-tile-title class="package-detail"  :class="pack.name === 'Proffessional' ? 'light-text' : 'light-dark-text'">{{ service }}</v-list-tile-title>
                       </v-list-tile-content>
                     </v-list-tile>
                     <v-divider></v-divider>
                  </template>
                <v-list-tile-title v-text="pack.price" class="package-price" :class="pack.name === 'Proffessional' ? 'light-text' : 'dark-text'"></v-list-tile-title>
                <template v-if="pack.name === 'Proffessional'">
                   <span class="popular-package-tag">Most Popular</span>
                </template>
                <v-btn
                style="color: #fff"
                  :color="pack.name === 'Starter' ? 'secondary' : 'rgba(148, 230, 10, 1)'"
                >{{getButtonName(pack.name)}}</v-btn>
              </v-card>
            </v-flex>
        </v-layout>
  </v-container>-->
</template>
<script>
export default {
  data() {
    return {
      monthly: true,
      services: [
        {
          name: "Appointment Request",
          description:
            "Requests sent to BRID.AL from external sources such as a website"
        },
        {
          name: "Payments",
          description: "Payments made against a customers account"
        },
        { name: "Products", description: "Products used to make sales" },
        { name: "Sales", description: "Amount of sales" },
        {
          name: "Diary Appointments",
          description: "Amount of appointments in the diary"
        },
        { name: "Users", description: "Number of users" },
        { name: "Stores", description: "123" },
        { name: "FREE Texts", description: "12" }
      ],
      plans: [
        {
          name: "starter",
          color: "pink lighten-2",
          price: "50",
          yearlyPrice: "41.67",
          current: false,
          services: [
            "Unlimited",
            "Unlimited",
            "Unlimited",
            "20",
            "50",
            "1",
            "1",
            "50"
          ]
        },
        {
          name: "proffessional",
          color: "teal lighten-2",
          price: "85",
          yearlyPrice: "70.83",
          current: true,
          services: [
            "Unlimited",
            "Unlimited",
            "Unlimited",
            "Unlimited",
            "Unlimited",
            "Unlimited",
            "1",
            "250"
          ]
        },
        {
          name: "enterprise",
          color: "blue lighten-1",
          price: "150",
          yearlyPrice: "125",
          current: false,
          services: [
            "Unlimited",
            "Unlimited",
            "Unlimited",
            "Unlimited",
            "Unlimited",
            "Unlimited",
            "3",
            "1000"
          ]
        }
      ]
    };
  },
  methods: {
    getColor(name) {
      let color = "default";
      if (name == "Proffessional") {
        color = "blue";
      }
      return color;
    },
    getButtonName(name) {
      let btnName = "UPGRADE";
      if (name == "Starter") {
        btnName = "MY PLAN";
      }
      return btnName;
    },
    chosenPlan(plan) {
      this.$router.push({ path: "/billing/upgrade", query: { plan: plan.name, interval: this.monthly? 'monthly' : 'yearly'}})
    }
  }
};
</script>
<style scoped>
.v-container {
  padding: 24px 10px 24px 10px;
  background-color: rgb(68, 68, 68);
}
.plan-section {
  position: relative;
  padding: 3px 0px 0px 4px;
}
.plan-section .plan-text {
  font-size: 14px;
  color: white;
}
.plan-section .plan-list {
  height: 56px;
  text-align: -webkit-right;
}
.plan-section .price-title {
  position: absolute;
  text-align: center;
  padding: 12px 4px 38px 6px;
  font-size: 20px;
  background-color: rgba(132, 134, 134, 0.34);
  color: white;
}
.package-name {
  text-align: center;
  padding: 12px 0 28px 0;
  border-bottom: 1px solid #e2dbdb;
  font-size: 18px;
  font-weight: 100;
  color: #424242;
}
.package-detail {
  text-align: center;
  font-size: 14px;
}
.package-price {
  color: #424242;
  text-align: center;
  background-color: rgba(132, 134, 134, 0.34);
  padding: 12px 4px 38px 6px;
  font-size: 20px;
}
.popular-package-tag {
  font-size: 22px;
  font-weight: 500;
  color: #efe7e7;
}
.light-dark-text {
  color: #b7b7b5;
}
.dark-text {
  color: #424242;
}
.light-text {
  color: #efe7e7;
}
.border-top {
  border-top: 1px solid hsla(0, 0%, 100%, 0.12);
}
</style>
