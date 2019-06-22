<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-subheader class="subheading">Company Name</v-subheader>
        <v-text-field
          v-model="companyName"
          box
          single-line
          :append-outer-icon="this.account.company.companyName === companyName ? null : 'save'"
          @click:append-outer="updateCompany()"
          :readonly="currentUser.role !== 'admin'"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md6>
        <v-subheader class="subheading">API KEY</v-subheader>
        <v-text-field
          :append-icon="showAPIKey ? 'visibility' : 'visibility_off'"
          :type="showAPIKey ? 'text' : 'password'"
          name="input-10-2"
          box
          single-line
          :value="this.account.company.api_key"
          class="input-group--focused"
          @click:append="showAPIKey = !showAPIKey"
          readonly
          hint="Use this API key to send appointment requests from your website, directly into BRID.AL  <a>View Documentation</a>"
          persistent-hint
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-subheader class="subheading">Logo</v-subheader>
    <vue-dropzone id="logo" :options="dropzoneOptions" :useCustomSlot="true">
      <div class="dropzone-custom-content">
        <h3 class="dropzone-custom-title">Drag and drop to upload logo!</h3>
        <div class="subtitle">...or click to select a file from your computer</div>
      </div>
    </vue-dropzone>

  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      companyName: "",
      showAPIKey: false,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailHeight: 200,
        thumbnailMethod: 'contain',
        addRemoveLinks: true,
        maxFiles: 1
      }
    };
  },
  methods: {},
  computed: {
    ...mapState({
      account: state => state.account
    }),
    currentUser() {
      return this.account.user;
    },
  },
  mounted() {
    this.companyName = this.account.company.companyName;
  }
};
</script>
