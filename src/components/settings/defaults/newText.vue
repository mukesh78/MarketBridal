<template>

  <v-card>
    <v-card color="primary">
      <v-toolbar flat dark color="transparent" height="45">
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
    </v-card>
    <v-card flat class="mt-2">
      <v-container class='ma-0 pa-2'>
        <v-layout justify-center row wrap>
            <v-text-field
            v-model="text.value"
            :label="text.label"
            box
            hide-details
            ></v-text-field>
        </v-layout>
      </v-container>
    </v-card>
    <v-card flat class="pa-2">
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

export default {
  props: ["newObj", "text"],
  data() {
    return {
      deleteDialog: false
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
      if(this.text.value){
        this.newObj ? this.create() : this.update()
      }
    }
  }
}
</script>