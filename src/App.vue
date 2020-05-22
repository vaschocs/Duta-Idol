<template>
  <div id="app">
 <TheNavigation />

    <v-parallax
    height="100%"
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >

  <router-view />
    </v-parallax>
      <v-card height="50">
    <v-footer
    dark
      absolute
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        &copy; 2020 — <strong>Nikolaus Aryawan Ravato Wijaya - Eva Kristina</strong>
      </v-col>
    </v-footer>
  </v-card>
  </div>

</template>

<script>
import TheNavigation from "@/components/TheNavigation";

export default {
  components: {
    TheNavigation
  },
  watch: {
    $route(to) {
      document.title = `SIPOLI - ${to.meta.title}`;
      const link = document.querySelector("[rel='icon']");
      link.setAttribute("href", to.meta.icon);
    }
  }
};
</script>



