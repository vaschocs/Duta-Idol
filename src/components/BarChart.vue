<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['Erica', 'Ferren', 'Michael', 'Asland', 'Moses', 'Jordan', 'Jhon', 'Arlen', 'Bram', 'Kezia'],
      datasets: [
        {
          label: 'VOTE',
          backgroundColor: '#f02324',
          borderColor: 'transparent',
          data: [50, 67, 89, 39, 100, 40, 39, 80, 40, 70]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
