<template>
  <table class="table">
    <tr>
      <td>ID :</td>
      <td>{{ user.id }}</td>
    </tr>
    <tr>
      <td>Nama :</td>
      <td>{{ user.name }}</td>
    </tr>
    <tr>
      <td>Email :</td>
      <td>{{ user.email }}</td>
    </tr>
    <tr>
      <td>Status :</td>
      <td>{{ user.status }}</td>
    </tr>
  </table>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: ""
    };
  },
  async mounted() {
    try {
      const response = await axios.get("/user");
      this.user = response.data.user;
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
