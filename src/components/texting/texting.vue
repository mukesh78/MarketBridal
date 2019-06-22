<template>
  <v-card>
    <v-flex xs12 class="text-xs-center pa-2">
      <v-btn
          :outline="!text"
          color="secondary"
          class="ma-0"
          @click="text=!text"
        >TEXT</v-btn>
        <v-btn
          :outline="text"
          color="secondary"
          class="ma-0"
          @click="text=!text"
        >EMAIL</v-btn>
      </v-flex>
    <v-list subheader two-line>
      
      <v-subheader class="pr-0">Select appointments
        <v-spacer></v-spacer>
        <v-btn icon @click="close()">
          <v-icon>close</v-icon>
        </v-btn>

      </v-subheader>

      <div
        v-for="(item, index) in listApps"
        :key="index"
        :style="{ 'border-left': '' + item.borderColor + ' solid 5px' }"
      >
        <v-list-tile @click="item.selected = !item.selected" :disabled="checkError(item) != null">
          <v-list-tile-action>
            <v-checkbox :value="checkError(item) ? false : item.selected" v-model="item.selected"></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.customerName }}</v-list-tile-title>
            <v-list-tile-sub-title v-if="item.type">{{ item.type.name }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>{{ checkError(item) ? checkError(item) : (text ? item.phone: item.email)}}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-list-tile-action-text>{{ new Date(item.startTime).toLocaleString('en-gb', timeOptions) }}</v-list-tile-action-text>
            <!-- <v-list-tile-action-text v-if="item.weddingDate">{{ new Date(item.weddingDate).toLocaleString('en-gb', dateOptions) }}</v-list-tile-action-text> -->
          </v-list-tile-action>
        </v-list-tile>
        <v-divider></v-divider>
      </div>
    </v-list>
    <v-card flat class="pa-2">
        <v-btn
        block
        color="secondary"
        @click="send()"
        v-text="'SEND'"
        ></v-btn>
      </v-card>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["apps"],
  data() {
    return {
      listApps: [],
      text: true,
      dateOptions: {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
      },
      timeOptions: {
        hour: "2-digit",
        minute: "2-digit"
      }
    };
  },
  computed: {
    
  },
  methods: {
    ...mapActions('texting', ['getCredits', 'sendSMS']),
    checkError(item) {
      if (this.text) {
        if(item.phone) {
          return null
        } else {
          return "Missing phone"
        }
      } else {
        if(item.email) {
          return null
        } else {
          return "Missing email"
        }
      }
      console.log("error")
    },
    close() {
      this.$emit('close')
    },
    send() {
      var i = 0
      this.listApps.forEach(app => {
        this.sendSMS(app).then(resp => {
          this.$emit('updateStatus', resp.status)
          i += 1
          if(i == this.listApps.length) {
            this.close()
          }
        })
      })
    }
  },
  mounted() {
    this.listApps =  this.apps.map(x => {
    return {
      ...x,
      selected: true
    };
  });
  }
};
</script>