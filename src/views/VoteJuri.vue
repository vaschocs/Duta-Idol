<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="2" v-for="user in users" :key="user.id">
          <v-card color="#285F72" dark>
            <v-card-title class="headline">{{user.name}}</v-card-title>
            <v-card-actions>
              <v-btn text v-on:click="vote(user)">VOTE</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row flat v-if="!statusVote">
          <v-col>
            <div class="container" align='center'>
              <H1>Anda tidak sedang berada dalam sesi Vote</H1><br>
              <img src="@/assets/Untitled-1.png" />
            </div>
          </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import axios from 'axios'

export default {
  name: 'juri',
  data () {
    return {
      users: [],
      juri: '',
      statusVote: true,
    }
  },

  async mounted () {
    try {
      const response = await axios.get('/vote/list')
      this.users = response.data.user
      this.statusVote=true
    } catch (e) {
        console.log(e)
        console.log(e.response.data.error)
        // alert(e + '\n' +e.response.data.error)
        this.statusVote=false
    }
    try{
      const responseJuri = await axios.get('/user')
      this.juri = responseJuri.data.user
    }catch(e){
        console.log(e)
        console.log(e.response.data.error)
        // alert(e + '\n' +e.response.data.error)
    }
  },

  methods: {
    async vote (user) {
      try {
        var obj = {}
        obj.id_juri = this.juri.id
        console.log(obj)
        await axios.post('/vote/juri/' + user.id, obj)
        alert('Anda berhasil melakukan vote ' + user.name)
        window.location.reload()
      } catch (e) {
        console.log(e)
        console.log(e.response.data.error)
        alert(e + '\n' +e.response.data.error)
      }
    }
  }
}
</script>
