<template>
    <v-row>
      <div class="container">
        <b-dropdown id="dropdown-1" text="Sesi Votes" class="m-md-2">
          <b-dropdown-item
            v-for="sesi in sesis"
            :key="sesi.id_sesi_vote"
            v-on:click="choose(sesi)"
          >{{sesi.ket_sesi}}</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="container">
        <BarChart
          v-if="arrJmlVote.length > 0"
          :chartData="arrJmlVote"
          :options="chartOptions"
          :chart-id="'chartAryCoba'"
          label="positive"
        ></BarChart>
      </div>

      <div  ref="content" class="container" v-if="arrJmlVote.length > 0">
        <v-data-table
          :headers="headers"
          :items="tableListHasil"
          sort-by="id"
          class="elevation-1"
          :search="search"
          :hide-default-footer="true"
          disable-pagination="true"
        ></v-data-table>

      </div>
    <div class="container" v-if="arrJmlVote.length > 0">
        <v-btn @click="download">Download PDF</v-btn>
      </div>
  </v-row>
</template>

<script>
import BarChart from "../../components/BarChart";
import axios from "axios";
import jspdf from "jspdf";
export default {
  name: "report",
  data() {
    return {
      sesis: [],
      arrName: [],
      arrJmlVote: [],
      tableListHasil: [],
      sesiUtkReport:'',
      headers: [
        { text: "Name", value: "name" },
        { text: "Jumlah Vote", value: "jumlah_vote" }
      ],

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
  },
  async mounted() {
    try {
      const response = await axios.get("sesi/getAll");
      this.sesis = response.data.sesi;
      console.log(this.sesis);
    } catch (e) {
      console.log(e);
      console.log(e.response.data.error);
      alert(e + "\n" + e.response.data.error);
    }
  },
  methods: {
    download() {
      //Default export is a4 paper, portrait, using milimeters for units
      const doc = new jspdf('l', 'mm', "a4"); //for landscape
      doc.setFontSize(9);
      doc.text("© 2020 SIPOLI - By: Eva & Ary - Peterpan", 10, 10);
      doc.setFontSize(30);
      doc.setFont("helvetica","bold");
      doc.text("Report Sipoli " +this.sesiUtkReport, 20, 30); //at x,y at def.units 2cm
      //chart element
      let canvasEle = document.getElementById("chartAryCoba");
      let chartURL = canvasEle.toDataURL(); //transform path
      //a4 page is 209mm, adds at 4cm top, 2cm left, for 15cm in size
      const html = this.$refs.content.innerHTML;
      doc.addImage(chartURL, "PNG", 20, 40, 150, 150);
      doc.addPage();
      doc.setFontSize(10)
      doc.text("© 2020 SIPOLI - By: Eva & Ary - Peterpan", 10, 10);
      doc.fromHTML(html, 20, 20, {
        width: 150
      });

      doc.save("ReportSipoli"+this.sesiUtkReport+".pdf");
    },

    choose(sesi) {
      this.sesiUtkReport='';
      this.created(sesi.id_sesi_vote);
      this.sesiUtkReport=sesi.ket_sesi;
    },
    async created(sesi) {
      this.arrJmlVote = [];
      const { data } = await axios.get("vote/hasilVote/" + sesi);
      this.tableListHasil = data.list;

      data.list.forEach(v => {
        const name = v.name;

        const { jumlah_vote } = v;
        // this.arrName.push({id_user, total :name});
        this.arrJmlVote.push({ name, total: jumlah_vote });
      });
    }
  },

  components: {
    BarChart
  }
};
</script>
