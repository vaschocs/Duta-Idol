<template>
    <v-parallax
    height=750
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
  <h1>Challege Pak Argo_All report</h1>
<v-row

        <v-data-table
          :headers="headers"
          :items="lists"
          sort-by="id"
          class="elevation-1"
          :search="search"
          :hide-default-footer="true"
          disable-pagination="true"
        ></v-data-table>



</v-row>
  </v-parallax>
</template>
<script>

import axios from "axios";
import jspdf from "jspdf";
export default {
  name: "challenge",
  data() {
    return {
      tron:true,
      lists: [],
      headers: [
        { text: "User", value: "id_user" },
        {text : "Sesi", value:"id_sesi_vote"},
        { text: "Jumlah Vote", value: "jumlah_vote" }
      ],


    };
  },
  async mounted() {
    try {
      const response = await axios.get("/allReport");
      this.lists = response.data.list;
      console.log(this.lists);
    } catch (e) {
      console.log(e);
      console.log(e.response.data.error);
      alert(e + "\n" + e.response.data.error);
    }
  },

};
</script>

