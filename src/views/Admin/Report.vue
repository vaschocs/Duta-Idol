<template>
  <v-row>
    <v-col cols="12">
      <BarChart></BarChart>
    </v-col>

    <div>
      <div>
        <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
          <b-dropdown-item>First Action</b-dropdown-item>
          <b-dropdown-item>Second Action</b-dropdown-item>
          <b-dropdown-item>Third Action</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item active>Active action</b-dropdown-item>
          <b-dropdown-item disabled>Disabled action</b-dropdown-item>
        </b-dropdown>
        <v-btn color="blue darken-1" type="submit" >Save</v-btn>
      </div>
    </div>
  </v-row>
</template>

<script>
import BarChart from "../../components/BarChart";
import axios from "axios";
export default {
  name: "report",
  data() {
    return {
      list: [],
    };
  },

  async created() {
    const { data } = await axios.get(vote / hasilVote + form.id, this.form);
    (this.name = ""), (this.jumlah_vote = "");

    console.log(data);
  },
  components: {
    BarChart
  }
};
</script>
