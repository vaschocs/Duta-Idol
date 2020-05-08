<template>
  <v-row>
      <v-col cols="12">
        <BarChart></Barchart>
      </v-col>
      <Loader></Loader>
  </v-row>

</template>


<script>
import BarChart from "../../components/BarChart";
import Loader from "../../components/_loader"
export default {
  name: "dashboard",
  components: {
    BarChart,
    Loader
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
};
</script>
