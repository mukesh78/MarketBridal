<template>
  <v-card>
    <v-dialog v-if="deleteDialog" v-model="deleteDialog" max-width="300">
      <delete-form
        item="payment"
        v-on:close="closeDeleteDialog"
        v-on:remove="remove"
      ></delete-form>
    </v-dialog>
    <v-card dark color="primary">
      <v-toolbar flat color="transparent" height="45" v-if="popup">
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
        light
        class="headline titleLabel"
        primary-title
        style="margin-left:80px; padding-top: 0px; padding-bottom:5px"
        v-bind:class="{ 'pa-2': !popup}"
      >{{ new Date(payment.date).toLocaleDateString('en-gb') }}</v-card-title>
      <v-btn fab light absolute bottom left color="white" class="editButton" @click="edit(payment)">
        <v-icon dark>edit</v-icon>
      </v-btn>
    </v-card>
    <v-card class="pt-4">
      <v-container class="ma-0 pa-0">
        <div style="display: flex; align-items: center;" class="pl-4 pr-4 pt-3 pb-2">
          <div class="summaryLabel">Amount</div>
          <div class="summaryValue">£ {{ payment.amount }}</div>
        </div>
        <v-divider style="opacity:0.5"></v-divider>
        <div style="display: flex; align-items: center;" class="pl-4 pr-4 pt-2 pb-2">
         <div class="summaryLabel">Employee</div>
          <div class="summaryValue">{{ payment.employee ? payment.employee.name : '' }}</div>
        </div>
      </v-container>
    </v-card>
  </v-card>
</template>
<style media="screen">
    .deleteButton {
        position: absolute;
        top: 5px;
        right: 40px;
    }
</style>

<script>

export default {
  props: ["payment", "popup"],
  data() {
    return {
      deleteDialog: false,
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
    edit(payment) {
      this.$emit("edit", this.payment);
    },
    remove() {
      if(this.deleteDialog) {
        this.$emit("remove", this.payment)
        this.deleteDialog = false
      } else {
        this.deleteDialog = true
      }
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
    }
  }
};
</script>