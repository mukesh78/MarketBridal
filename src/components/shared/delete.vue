<template>
  <v-card>
    <v-container pa-3>
      <p class="body">Are you sure you want to delete this {{ item }}?</p>
      <v-card-actions>
      <v-btn class="text-xs-left" color="error" @click="remove()">YES</v-btn>
      <v-spacer></v-spacer>
      <v-btn align-end class="text-xs-right" color="info" @click="close()">NO</v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props:['item'],
  methods: {
    close() {
      this.$emit("close");
    },
    remove() {
      this.$emit("remove");
    }
  }
  
}
</script>
