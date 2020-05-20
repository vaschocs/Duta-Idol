<template>
  <div>
    <Loader></Loader>
    <v-app-bar color="deep-purple" dense dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-toolbar-title>
        <h5 v-if="authenticated">Welcome, {{user.name}}</h5>
        <h5 v-if="!authenticated">DUTA IDOL</h5>
      </v-toolbar-title>
    </v-app-bar>
    <!-- <v-card class="mx-auto overflow-hidden" height="400"> -->
    <v-navigation-drawer v-model="drawer" absolute temporary color="deep-purple" dense dark >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <template v-if="!authenticated">
            <router-link to="/">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="signin">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-login</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Signin</v-list-item-title>
              </v-list-item>
            </router-link>
          </template>

          <template v-if="authenticated">
            <template v-if="user.role == 0">
              <router-link to="juri">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Juri</v-list-item-title>
                </v-list-item>
              </router-link>
              <router-link to="peserta">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Peserta</v-list-item-title>
                </v-list-item>
              </router-link>
              <router-link to="report">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-read</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Report</v-list-item-title>
                </v-list-item>
              </router-link>
              <router-link to="sesi">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-view-list</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Sesi</v-list-item-title>
                </v-list-item>
              </router-link>
            </template>
            <template v-if="user.role == 1">
              <router-link to="datapeserta">
                <v-list-item>
                  <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
                  <v-list-item-title>Data Peserta</v-list-item-title>
                </v-list-item>
              </router-link>
            </template>
            <template v-if="user.role == 2">
              <router-link to="votejuri">
                <v-list-item>
                  <v-list-item-icon>

                  </v-list-item-icon>
                  <v-list-item-title>Vote Peserta</v-list-item-title>
                </v-list-item>
              </router-link>
            </template>
            <router-link to="dashboard">
              <v-list-item >
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/">
              <v-list-item @click.prevent="signOut" v-show="btnSignout">
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Sign Out</v-list-item-title>
              </v-list-item>
            </router-link>

          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>

</template>

<script>
import axios from "axios";
import Loader from "../components/_loader";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      btnSignout: true,
      drawer: false
    };
  },
  components: { Loader },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },
  created() {
    axios.interceptors.request.use(
      config => {
        // Do something before request is sent
        this.$store.commit("LOADER", true);
        return config;
      },
      error => {
        // Do something with request error
        this.$store.commit("LOADER", false);
        return Promise.reject(error);
      }
    );
    // Add a response interceptor
    axios.interceptors.response.use(
      response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        this.$store.commit("LOADER", false);

        return response;
      },
      error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        this.$store.commit("LOADER", false);

        return Promise.reject(error);
      }
    );
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

