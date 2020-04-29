<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-toolbar-title>
        <h2>DUTA IDOL</h2>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-if="authenticated">
        <template v-if="user.role == 0">
          <router-link to="juri">
            <v-btn>
              Juri
            </v-btn>
          </router-link>
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

          <router-link to="report">
            <v-btn>
              Report
            </v-btn>
          </router-link>
        </template>
        <template v-if="user.role == 1">
          <router-link to="datapeserta">
            <v-btn>
              DATA PESERTA
            </v-btn>
          </router-link>
        </template>

        <template v-if="user.role == 2">
          <router-link to="votejuri">
            <v-btn>
              VOTE PESERTA
            </v-btn>
          </router-link>
        </template>

        <router-link to="/">
          <v-btn @click.prevent="signOut" v-show="btnSignout">
            SIGN OUT
          </v-btn>
        </router-link>
      </template>

      <template v-if="!authenticated">
        <router-link to="/">
          <v-btn icon>
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </router-link>

        <router-link to="signin">
          <v-btn >
            SIGN IN
          </v-btn>
        </router-link>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      btnSignout: true
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },
  methods: {
    ...mapActions({
      signOutAction: "auth/signOut"
    }),
    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: "home"
        });
      });
    }
  }
};
</script>