<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    label: {
      type: String
    },
    chartData:{
      type: Array
    },
    options:{
      type: Object
    }
  },
  mounted(){
    // const id_users = this.chartData.map( v => v.id_user).reverse();
    const names = this.chartData.map( v => v.name).reverse();
    const totals = this.chartData.map( v => v.total).reverse();

    this.renderChart({
      labels: names,
      datasets:[{
        label:this.label,
        data:totals,
        scaleBeginAtZero : true,
        backgroundColor: '#f02324',
        borderColor: 'transparent',
      }],
    },this.options);
  }
  //   chartdata: {
  //     labels: ['Erica', 'Ferren', 'Michael', 'Asland', 'Moses', 'Jordan', 'Jhon', 'Arlen', 'Bram', 'Kezia'],
  //     datasets: [
  //       {
  //         label: 'VOTE',
  //         backgroundColor: '#f02324',
  //         borderColor: 'transparent',
  //         data: [50, 67, 89, 39, 100, 40, 39, 80, 40, 70]
  //       }
  //     ]
  //   },
  //   options: {
  //     responsive: true,
  //     maintainAspectRatio: false
  //   }
  // }),

  // mounted () {
  //   this.renderChart(this.chartdata, this.options)
  // }
// }
}
</script>
