<template>
  <v-container>
    <v-card>
      <v-container grid-list-xl pa-5>
        <v-layout row v-if="plan">
          <v-flex xs6>
            <v-hover>
              <v-card
                class="pa-3"
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 10 : 3}`"
                @click="monthly = !monthly"
              >
                <v-checkbox class="ma-3" style="float:left" :value="monthly === true"></v-checkbox>
                <div class="title text-capitalize mb-2">{{ plan.name }} - Pay annually</div>
                <div class="subheading" style="opacity:0.5">£{{ plan.yearlyPrice }} per year</div>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex xs6>
            <v-hover>
              <v-card
                class="pa-3"
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 10 : 3}`"
                @click="monthly = !monthly"
              >
                <v-checkbox class="ma-3" style="float:left" :value="monthly === false"></v-checkbox>
                <div class="title text-capitalize mb-2">{{ plan.name }} - Pay monthly</div>
                <div class="subheading" style="opacity:0.5">£{{ plan.price }} per year</div>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
        <v-subheader class="title">Payment Details</v-subheader>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      monthly: false,
      plans: [
        {
          name: "starter",
          color: "pink lighten-2",
          price: "50",
          yearlyPrice: "41.67"
        },
        {
          name: "proffessional",
          color: "teal lighten-2",
          price: "85",
          yearlyPrice: "70.83"
        },
        {
          name: "enterprise",
          color: "blue lighten-1",
          price: "150",
          yearlyPrice: "125"
        }
      ],
      plan: null
    };
  },
  mounted() {
    if (this.$route.query.interval === "monthly") {
      this.monthly = true;
    } else {
      this.monthly = false;
    }
    this.plan = this.plans.find(item => {
      return item.name == this.$route.query.plan;
    });
  }
};
</script>

