<script>
  import { Line } from 'vue-chartjs'
  export default {
    extends: Line,
    props: {
      chartData: {
        type: Array | Object,
        required: false
      },
      chartLabels: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        options: {
          layout: {
              padding: {
                  left: 5,
                  right: 5,
                  top: 20,
                  bottom: 0
              }
          },
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: 'white',
                    padding: 10,
                    callback: function(value, index, values) {
                        return '£' + value/1000 + 'k';
                    }
                },
                gridLines: {
                    display: false,
                    color: 'rgba(255, 255, 255, 0.2)',
                    drawTicks: false,
                    zeroLineColor: 'rgba(255, 255, 255, 0.2)'
                }
            }],
            xAxes: [ {
                ticks: {
                    fontColor: 'white',
                    padding: 10,
                    callback: function(value, index, values) {
                        return value.charAt(0);
                    }
                },
                gridLines: {
                    display: false,
                    color: 'rgba(255, 255, 255, 0.2)',
                    drawTicks: false,
                    zeroLineColor: 'rgba(255, 255, 255, 0.2)'
                }
            }]
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
              callbacks: {
                  label: function(tooltipItem, data) {
                      var label = ' ' + data.datasets[tooltipItem.datasetIndex].label || '';

                      if (label) {
                          label += ': £';
                      }
                      label += Math.round(tooltipItem.yLabel * 100) / 100;
                      return label;
                  },
                  title: function([tooltipItem], data) {
                    return data.labels[tooltipItem.index]
                    return tooltipItem.xLabel
                  }
              }
          },
          animation: {
            duration: 1500,
            easing: 'linear'
            // onComplete: function (animatiom) {
            //   // render the value of the chart above the bar
            //   var ctx = this.chart.ctx;
            //   ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
            //   ctx.fillStyle = 'white';
            //   ctx.textAlign = 'center';
            //   ctx.textBaseline = 'bottom';
            //   this.data.datasets.forEach(function (dataset) {
            //       for (var i = 0; i < dataset.data.length; i++) {
            //           var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
            //           ctx.fillText(dataset.data[i], model.x, model.y - 10);
            //       }
            //   });
            // }
          }
        },
      }
    },
    mounted () {
      this.renderChart({
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Sales This Week',
            borderColor: 'white',
            pointBackgroundColor: 'white',
            borderWidth: 3,
            pointBorderColor: 'white',
            backgroundColor: 'transparent',
            data: this.chartData[0],
            lineTension: 0.3
          },
          {
            label: 'Sales Last Week',
            borderColor: 'blue',
            pointBackgroundColor: 'blue',
            borderWidth: 2,
            pointBorderColor: 'blue',
            backgroundColor: 'transparent',
            data: this.chartData[1],
            lineTension: 0.3
          }
        ]
      }, this.options)
    }
  }
</script>