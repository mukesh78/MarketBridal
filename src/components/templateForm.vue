<template>
  <v-card>
    <v-card dark color="primary">
      <v-toolbar dark>
              <v-spacer></v-spacer>
              <v-card-title
                      class="headline"
                      primary-title
                      style="padding:8px"
                      v-text="update ? 'Update ' + title : 'New ' + title"
                      >
              </v-card-title>
              <v-spacer></v-spacer>
            </v-toolbar>
    </v-card>
    <v-card flat class="pa-0 ma-0">
      <v-card flat color='grey lighten-5' class='ma-4'>
        <v-form ref="form" lazy-validation v-model="valid">
          <v-container grid-list-md>
              <v-layout row wrap style="min-height:500px">

              </v-layout>
          </v-container>
        </v-form>
    </v-card>
    <v-card flat class='pl-4 pr-4 pb-2'>
      <v-btn block
          class="white--text"
          color="black"
        type="submit"
        @click="submit()"
        >CONTINUE</v-btn>

        <v-layout>
          <v-flex xs12 md4 mr-3>
            <v-btn block white--text
            color="info"
            type="button"
            @click="save()"
            >SAVE</v-btn>
          </v-flex>
          <v-flex xs12 md4 mr-3>
            <v-btn block white--text
            color="warning"
            type="button"
            @click="reset()"
            >RESET</v-btn>
          </v-flex>
          <v-flex xs12 md4>
            <v-btn block white--text
            color="error"
            type="button"
            @click="cancel()"
            >CANCEL</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: ['update'],
  data () {
    return {
        title: 'Template',
        valid: false,
    }
  },
  methods: {
    submit() {
        this.$emit('submit')
    },
    create() {

    },
    update() {

    },
    save() {
        this.$emit('save')
    },
    reset() {
        this.$refs.form.reset()
    },
    cancel() {
        this.$emit('cancel')
    }
  },
  beforeDestroy() {
    this.$refs.form.reset()
  }
}
</script>

