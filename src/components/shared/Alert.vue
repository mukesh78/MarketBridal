<template>
  <v-alert :type="alert.type" dismissible @input="onClose" :value="true">
    {{ alert.message }}
  </v-alert>
</template>

<script>
  export default {
    props: ['alert'],
    methods: {
      onClose () {
        this.$emit('dismissed')
      }
    }
  }
</script>
