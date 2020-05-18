<template>
 <v-parallax
    height=1000
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-center" cols="12">
       <v-card-text>
            <v-row flat v-if="statusVote">
              <v-col cols="12" sm="2" v-for="user in users" :key="user.id">
                <v-card color="deep-white" dark>
                  <v-card-title class="headline">{{ user.name }}</v-card-title>
                  <v-divider class="mx-12"></v-divider>

                  <v-card-actions>
                    <v-btn text v-on:click="vote(user)">
                      <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      VOTE</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-row flat v-if="!statusVote">
              <v-col>
                <div class="container" align="center">
                  <H1>Anda tidak sedang berada dalam sesi Vote</H1><br />
                  <b-img
                    :src="require('../assets/Untitled-1.png')"
                    fluid
                    alt="Responsive image"
                  ></b-img>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
      </v-col>
    </v-row>
  </v-parallax>
</template>
<script>
import axios from "axios";

export default {
  name: "juri",
  data() {
    return {
      users: [],
      statusVote: true,
      user: {
        id: "",
        name: "",
        email: ""
      }
    };
  },

  async mounted() {
    try {
      const response = await axios.get("/vote/list");
      this.users = response.data.user;
      this.statusVote = true;
    } catch (e) {
      console.log(e);
      console.log(e.response.data.error);
      // alert(e + '\n' +e.response.data.error)
      this.statusVote = false;
    }
  },

  methods: {
    async vote(user) {
      try {
        await axios.post("/vote/" + user.id);
        alert("Anda berhasil melakukan vote " + user.name);
        window.location.reload();
      } catch (e) {
        console.log(e);
        console.log(e.response.data.error);
        alert(e + "\n" + e.response.data.error);
      }
    }
  }
};
</script>
