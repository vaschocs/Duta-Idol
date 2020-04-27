<template>
<div ref='content'>
<v-row>
      <div class="container">
        <b-dropdown id="dropdown-1" text="Sesi Votes" class="m-md-2">
          <b-dropdown-item v-for="sesi in sesis" :key="sesi.id_sesi_vote" v-on:click="choose(sesi)">{{sesi.ket_sesi}}</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="container" id='chart'>
        <BarChart
        v-if="arrJmlVote.length > 0"
        :chartData="arrJmlVote"
        :options="chartOptions"
        label="positive"></BarChart>
      </div>

      <v-col cols="12">
    </v-col>
    <v-btn @click='download'>Download PDF</v-btn>
</v-row>
</div>
</template>

<script>
import BarChart from "../../components/BarChart";
import axios from "axios";
import jspdf from 'jspdf'
export default {
  name: "report",
  data() {
    return {
      sesis:[],
      arrName: [],
      arrJmlVote: [],
      chartOptions:{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
      }
    };
  },
  async mounted () {
    try {
      const response = await axios.get('sesi/getAll')
      this.sesis = response.data.sesi
      console.log(this.sesis)
    } catch (e) {
      console.log(e)
      console.log(e.response.data.error)
      alert(e + '\n' +e.response.data.error)
    }
  },
  methods: {
    download(){
     //Default export is a4 paper, portrait, using milimeters for units
      let pdfName = 'test';
      const doc = new jspdf();
      doc.text("Header", 20, 20); //at x,y at def.units 2cm
      //chart element
      let canvasEle = document.getElementById('chart');
      let chartURL = canvasEle.toDataURL(); //transform path
      //a4 page is 209mm, adds at 4cm top, 2cm left, for 15cm in size
      doc.addImage(chartURL, 'PNG', 20, 40, 150, 150 )
      doc.save('Output.pdf');
      // const doc = new jspdf()


      // doc.fromHTML(html,15,15,{
      //   width:150
      // })
      // doc.addImage(canvasimg,'JPEG',10,10,280,150)
      // doc.save("output.pdf")
    },

    choose(sesi){
      this.created(sesi.id_sesi_vote)
    },
    async created(sesi) {
    this.arrJmlVote=[]
    const { data } = await axios.get('vote/hasilVote/'+sesi);

    data.list.forEach(v => {
      const name = v.name;

      const {
        jumlah_vote,
      } = v;
      // this.arrName.push({id_user, total :name});
      this.arrJmlVote.push({name, total :jumlah_vote});

    });
},
  },

  components: {
    BarChart
  }
};
</script>
