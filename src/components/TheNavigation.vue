<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-toolbar-title>
        <h2>DUTA IDOL</h2>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-if="authenticated" >
        {{user.role}}
        {{user.name}}
        {{user}}
        <!-- <router-link to="dashboard">
          <v-btn icon>
            <v-icon>mdi-star</v-icon>
          </v-btn>
        </router-link>
        <router-link to="juri">
          <v-btn>
            Juri
          </v-btn>
        </router-link>
        <router-link to="peserta">
          <v-btn>
            Peserta
          </v-btn>
        </router-link> -->

        <router-link to="sesi">
          <v-btn>
            Sesi
          </v-btn>
        </router-link>
      </template>

      <!-- <template v-else-if="user.role==1"> -->
         <router-link to="datapeserta">
        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </router-link>
      <!-- </template> -->
      <!-- <template v-else-if="user.role==2"> -->
        <router-link to="votejuri">
        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </router-link>

      <!-- </template> -->


      <router-link to="/">
        <v-btn icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </router-link>

      <router-link to="signin">
        <v-btn icon>
          SIGN IN
        </v-btn>
      </router-link>
    </v-app-bar>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters, mapActions} from 'vuex'


export default {
  computed: {
        ...mapGetters({
            authenticated: "auth/authenticated",
            user: "auth/user",
        })
    },


  // async mounted() {
  //   try {
  //     const response = await axios.get("/user");

  //     this.user = response.data.user
  //   } catch (e) {
  //     console.log(e);
  //     console.log(e.response.data.error);
  //   }
  // }
};
</script>
