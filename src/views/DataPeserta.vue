<template>
<div>
    <br>

<br>
<br>
<br>
{{user.name}}
</div>

</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            users: []
        }
    },
    async mounted () {
    try {

      const responsPeserta = await axios.get('/user')


    } catch (e) {
        console.log(e)

    }
  }
}
</script>
