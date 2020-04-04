<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>

      <v-toolbar-title>
        <h2>DUTA IDOL</h2>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link  to="home">
        <v-btn icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </router-link>

      <router-link  to="juri">
        <v-btn >
          Juri
        </v-btn>
      </router-link>

       <router-link  to="peserta">
        <v-btn >
          Peserta
        </v-btn>
      </router-link>
      <router-link  to="sesi">
        <v-btn >
          Sesi
        </v-btn>
      </router-link>

      <router-link  to="signin">
        <v-btn icon>
          SIGN IN
        </v-btn>
      </router-link>
    </v-app-bar>
  </div>
</template>
