<template>
  <v-card>
    <v-card dark color="blue">
      <v-card flat height="5" color="blue darken-4"></v-card>
      <v-toolbar flat color="transparent" height="45">
        <v-spacer></v-spacer>
        <v-tooltip bottom color="primary">
          <v-btn slot="activator" flat icon @click="remove()">
            <v-icon>delete</v-icon>
          </v-btn>
          <span>Delete</span>
        </v-tooltip>
        <v-btn flat icon @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title
        class="headline"
        primary-title
        style="margin-left:80px; padding-top: 0px; padding-bottom:5px"
      >{{ enquiry.customerName }}</v-card-title>
      <v-btn
        fab
        dark
        absolute
        bottom
        left
        color="primary"
        class="editButton"
        @click="edit(enquiry)"
      >
        <v-icon dark>edit</v-icon>
      </v-btn>
    </v-card>
    <v-card class="pt-3 pl-2">
      <v-container grid-list-md>
        <div style="display: flex; align-items: center;" class="pb-2" v-if="enquiry.enquiryDate">
          <v-icon color="darkPrimary" class="pr-3">watch_later</v-icon>
          <span>{{ new Date(enquiry.enquiryDate).toLocaleString('en-gb', dateOptions)}}</span>
        </div>
        <div style="display: flex; align-items: center;" class="pb-2" v-if="enquiry.weddingDate">
          <v-icon color="darkPrimary" class="pr-3">wc</v-icon>
          <span>{{ new Date(enquiry.weddingDate).toLocaleDateString('en-gb')}}</span>
        </div>
        <div class="pb-2" v-if="enquiry.budget">
          <v-icon color="transparent" class="mr-3">home</v-icon>
          <span v-for="(item, index) in enquiry.budget" :key="index">{{ index == 0 ? item : ' | ' + item }}</span>
        </div>
        <div style="display: flex; align-items: center;" class="pb-2" v-if="enquiry.email">
          <v-icon color="primary" class="mr-3">email</v-icon>
          <span>{{ enquiry.email }}</span>
        </div>
        <div style="display: flex; align-items: center;" class="pb-2" v-if="enquiry.phone">
          <v-icon color="primary" class="mr-3">phone</v-icon>
          <span>{{ enquiry.phone }}</span>
        </div>
        <div class="pb-2" v-if="enquiry.address">
          <v-icon color="primary" class="mr-3">home</v-icon>
          <span>{{ enquiry.address }}</span>
        </div>
        <div class="pb-2" v-if="enquiry.city">
          <v-icon color="transparent" class="mr-3">home</v-icon>
          <span>{{ enquiry.city }}</span>
        </div>
         <div class="pb-2" v-if="enquiry.postcode">
          <v-icon color="transparent" class="mr-3">home</v-icon>
          <span>{{ enquiry.postcode }}</span>
        </div>
        <div class="pb-2" v-if="enquiry.venue">
          <v-icon color="transparent" class="mr-3">home</v-icon>
          <span>{{ enquiry.venue }}</span>
        </div>
        <div class="pb-2" v-if="enquiry.foundUs">
          <v-icon color="transparent" class="mr-3">home</v-icon>
           <span v-for="(item, index) in enquiry.foundUs" :key="index">{{ index == 0 ? item : ' | ' + item }}</span>
        </div>
        <div class="pb-2" v-if="enquiry.foundUsOther">
          <v-icon color="transparent" class="mr-3">home</v-icon>
          <span>{{ enquiry.foundUsOther }}</span>
        </div>
      </v-container>
    </v-card>
  </v-card>
</template>

<script>

export default {
  props: ['enquiry'],
  data() {
    return {
      dateOptions: {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    edit(enquiry) {
      this.$emit("edit", enquiry);
    },
    remove() {

    }
  }
};
</script>