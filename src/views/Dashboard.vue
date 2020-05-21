<template>
 <v-parallax
    height=750
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
  <div class="container" align='center' >
    <H2>Selamat Datang di SIPOLI</H2><br>
    <b-img :src="require('../assets/Untitled-1.png')" fluid alt="Responsive image"></b-img>
  </div>
 </v-parallax>





</template>
<script>

export default {
    name: 'dashboard',
    data(){
      return {
        tron:'true'
      }
    }

}
</script>

