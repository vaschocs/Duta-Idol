<template>
  <div>
    <Loader></Loader>
    <v-app-bar color="deep-purple" dense dark>
      <v-toolbar-title>
        <h2>DUTA IDOL</h2>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-if="authenticated">
        <!-- <template v-if="user.role == 0">
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
          </template> -->
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
          <v-btn>
            SIGN IN
          </v-btn>
        </router-link>
      </template>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- <v-card class="mx-auto overflow-hidden" height="400"> -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
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
            <template v-if="user.role == 2">
              <router-link to="votejuri">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-edit</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Vote Peserta</v-list-item-title>
                </v-list-item>
              </router-link>
            </template>
            <template v-if="user.role == 1">
              <router-link to="datapeserta">
                <v-list-item>
                  <v-list-item-icon> mdi-account</v-list-item-icon>
                  <v-list-item-title>Data Peserta</v-list-item-title>
                </v-list-item>
              </router-link>
            </template>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- </v-card> -->
    <Loader></Loader>
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
