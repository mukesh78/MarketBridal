<template>

  <v-card>
    <v-card :color="category.colour">
      <v-card flat height="5" :color="category.borderColour"></v-card>
      <v-toolbar flat color="transparent" height="45">
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn v-if="!newObj" slot="activator" flat icon @click="remove()">
            <v-icon>delete</v-icon>
          </v-btn>
          <span>Delete</span>
        </v-tooltip>
        <v-btn flat icon @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title>
        <v-text-field
        v-model="category.name"
        label="Category Name"
        box
        hide-details
        ></v-text-field>
        </v-card-title>
    </v-card>
    <v-card flat>
      <v-container class='ma-0 pa-2'>
        <v-layout justify-center row wrap>
            <span class="subheading font-weight-thin">Select colour</span>
            <chrome-picker v-model="colors"></chrome-picker>
        </v-layout>
      </v-container>
    </v-card>
    <v-card flat class="pl-4 pr-4 pb-2">
        <v-btn
        block
        color="secondary"
        @click="submit()"
        v-text="newObj ? 'CREATE': 'UPDATE'"
        ></v-btn>
      </v-card>
  </v-card>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  props: ["newObj", "category"],
  components: {
    "chrome-picker": Chrome
  },
  data() {
    return {
      deleteDialog: false,
      colors: {
        hex: '#0086E7'
      }
    }
  },
  watch: {
    colors(val) {
      this.category.colour = val.hex + '20'
      this.category.borderColour = val.hex
    }
  },
  methods: {
    close() {
      this.$emit("close")
    },
    create() {
      this.$emit("create")
    },
    update() {
      this.$emit("update")
    },
    remove() {
      if(this.deleteDialog) {
        this.$emit("remove", this.category)
        this.deleteDialog = false
      } else {
        this.deleteDialog = true
      }
    },
    submit() {
      if(this.category.name){
        this.newObj ? this.create() : this.update()
      }
    }
  }
}
</script>
