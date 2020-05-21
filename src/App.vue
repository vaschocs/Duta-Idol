<template>
  <div id="app">
 <TheNavigation />

    <v-parallax
    height="100%"
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >

  <router-view />
    </v-parallax>
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



