<template>
  <v-card @submit.prevent="submit">
    <br>
    <br>
    <h4 align='center'>LOGIN</h4>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Email*" v-model="form.email" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Password*"
              type="password"
              v-model='form.password'
              required
            ></v-text-field>
          </v-col>

        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text type='submit'>SIGN IN</v-btn>
      <v-btn color="blue darken-1" text @click="dialog = false">SIGN UP</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'signin',
  components: {
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),
    submit () {
      this.signIn(this.form).then(() => {
        this.$router.replace({
          name: 'dashboard'
        })
      }).catch(() => {
        console.log('failed sign in')
      })
    }
  }
}
</script>
