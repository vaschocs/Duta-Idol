<template>
<v-row>
      <div class="container">
        <b-dropdown id="dropdown-1" text="Sesi Votes" class="m-md-2">
          <b-dropdown-item v-for="sesi in sesis" :key="sesi.id_sesi_vote" v-on:click="choose(sesi)">{{sesi.ket_sesi}}</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="container">
        <BarChart
        v-if="arrJmlVote.length > 0"
        :chartData="arrJmlVote"
        :options="chartOptions"
        label="positive"></BarChart>
      </div>
      <v-col cols="12">

    </v-col>
</v-row>
</template>

<script>
import BarChart from "../../components/BarChart";
import axios from "axios";
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
