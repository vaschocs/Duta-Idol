<template>
  <v-row>
    <v-col cols="12">
      <BarChart></Barchart>
    </v-col>
  </v-row>
</template>

<script>
import BarChart from '../../components/BarChart'
export default {
  name: 'dashboard',
  components: {
    BarChart
  }
}
</script>
