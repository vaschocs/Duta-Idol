<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-toolbar-title>
        <h2>DUTA IDOL</h2>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-if="authenticated">

        <h2>HALOOO</h2>>

        <router-link to="dashboard">
          <v-btn icon>
            <v-icon>mdi-star</v-icon>
          </v-btn>
        </router-link>

         <router-link to="juri">
        <v-btn>
          Juri
        </v-btn>
      </router-link>

      </template>


      <router-link to="peserta">
        <v-btn>
          Peserta
        </v-btn>
      </router-link>
      <router-link to="sesi">
        <v-btn>
          Sesi
        </v-btn>
      </router-link>

      <router-link to="votejuri">
        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </router-link>

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
import axios from 'axios'
export default {
  data() {
    return {
      user: {
        role
      }
    }
  },

  async mounted () {
    try {
      const response = await axios.get('allPeserta')
      this.users = response.data.user
    } catch (e) {
      console.log(e)
    }
  },
}
</script>
