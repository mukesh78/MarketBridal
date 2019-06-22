<template>
    <v-card>
        <v-card dark color="primary">
          <v-toolbar flat color="transparent" height="45">
             <v-spacer></v-spacer>
             <v-tooltip top>
                 <v-btn slot="activator" flat icon @click="downloadPdf()">
                     <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="#FFFFFF" d="M10,4H14V13L17.5,9.5L19.92,11.92L12,19.84L4.08,11.92L6.5,9.5L10,13V4Z" />
                        </svg>
                 </v-btn>
                 <span>Download</span>
             </v-tooltip>
            <v-btn flat icon @click="zoomin()">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="#FFFFFF" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
              </svg>
            </v-btn>
            <v-btn flat icon @click="zoomout()">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                   <path fill="#FFFFFF" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" />
               </svg>
            </v-btn>
            <v-btn flat icon @click="close()">
              <v-icon>close</v-icon>
            </v-btn>

          </v-toolbar>
          <v-card-title
            class="display-1 justify-center"
            primary-title
            style="padding-top: 0px; padding-bottom:10px; opacity:0.6"
            v-text="'Invoice'"
          ></v-card-title>

        </v-card>
        <v-card style="overflow-x: scroll;">

        <invoice-pdf
        id="pdf-view"
        :payment="payment"
        :customer="customer"></invoice-pdf>
        </v-card>
    </v-card>
</template>
<script>
import { mapState, mapActions } from "vuex";
import invoicePdf from '@/components/customers/invoicePdf';

export default {
  props: ['payment', 'customer'],
  components: {
      invoicePdf
  },
  methods: {
      zoomin() {
          var pdfContent = document.getElementById("pdf-view");
          var currWidth = pdfContent.clientWidth;
          if(currWidth == 1000000){
              alert("Maximum zoom-in level of 1 Million reached.");
          } else{
              pdfContent.style.width = (currWidth + 50) + "px";
          }
      },
      zoomout(){
          var pdfContent = document.getElementById("pdf-view");
          var currWidth = pdfContent.clientWidth;
          if(currWidth == 500000){
              alert("Maximum zoom-out level reached.");
          } else{
              if (currWidth > 600) {
                  pdfContent.style.width = (currWidth - 50) + "px";
              }
          }
      },
      close () {
          this.$emit("close");
      },
      downloadPdf() {
          let doc = new jsPDF('p', 'mm', [500, 250])
          let source = document.getElementById('pdf-view')
          let options = {
          }
          source.style.display = 'block'
          doc.addHTML(source, options, function () {
            doc.save('payment-invoice.pdf')
          })
      },
  }
};
</script>
