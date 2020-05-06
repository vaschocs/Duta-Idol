<template>
  <v-card
    class="mx-auto overflow-hidden"
    height="400"
  >
    <v-app-bar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

         <v-toolbar-title>
        <h2>DUTA IDOL</h2>
      </v-toolbar-title>
    </v-app-bar>
tes
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
         <!-- <template v-if="authenticated">
        <template v-if="user.role == 0"> -->
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
          <router-link to="sesi">
          <v-list-item>
            <v-list-item-icon>
              <!-- <v-icon>mdi-account</v-icon> -->
            </v-list-item-icon>
            <v-list-item-title>Sesi</v-list-item-title>
          </v-list-item>
         </router-link>
          <router-link to="report">
          <v-list-item>
            <v-list-item-icon>
              <!-- <v-icon>mdi-account</v-icon> -->
            </v-list-item-icon>
            <v-list-item-title>Report</v-list-item-title>
          </v-list-item>
         </router-link>
        <!-- </template>
         </template> -->
          <router-link to="datapeserta">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Data Peserta</v-list-item-title>
          </v-list-item>
         </router-link>
          <router-link to="votejuri">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Vote Peserta</v-list-item-title>
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
          <router-link to="/">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Signout</v-list-item-title>
          </v-list-item>
         </router-link>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
    }),
  }
</script>