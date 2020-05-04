<template>
  <div id="app">
    <TheNavigation/>
    <!-- <SideBar/> -->
    <router-view/>
  </div>
</template>

<script>
import TheNavigation from '@/components/TheNavigation'
import SideBar from '@/components/SideBar'
export default {
  components: {
    TheNavigation,
    SideBar
  }
}
</script>
