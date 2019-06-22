import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    mounted () {
      // Overwriting base render method with actual data.
      this.renderChart({
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'GitHub Commits',
            backgroundColor: ['#23B5D3','#7180B9', "#D19C1D", "#DFE0E2"],
            data: [40, 20, 10, 50]
          }
        ]
      })
    }
  }