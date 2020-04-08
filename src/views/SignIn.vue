<template>
  <v-app>
    <v-card @submit.prevent='submit'>
      <br />
      <br />
      <h4 align='center'>LOGIN</h4>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols='12'>
              <v-text-field
                label='Email*'
                v-model='form.email'
                required
              ></v-text-field>
            </v-col>
            <v-col cols='12'>
              <v-text-field
                label='Password*'
                type='password'
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
        <v-btn>
        <v-btn color='primary' text type='submit'>SIGN IN</v-btn>
        </v-btn>
        <v-btn>
        <v-row justify='center'>
          <v-dialog v-model='dialog' persistent max-width='600px'>
            <template v-slot:activator='{ on }'>
              <v-btn color='primary' text type='submit' dark v-on='on'>
                DAFTAR SEBAGAI PESERTA
              </v-btn>
              <div>
  <b-link href="#foo">Link</b-link>
</div>
            </template>
            <v-card>
              <v-card-title>
                <span class='headline'>Pendaftaran Peserta</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols='12' sm='6' md='4'>
                      <v-text-field label='Name*' required></v-text-field>
                    </v-col>

                    <v-col cols='12'>
                      <v-text-field label='Email*' required></v-text-field>
                    </v-col>
                    <v-col cols='12'>
                      <v-text-field
                        label='Password*'
                        type='password'
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols='12'>
                      <v-text-field
                        label='Confirmation Password*'
                        type='password'
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color='blue darken-1' text @click='dialog = false'
                  >Close</v-btn
                >
                <v-btn color='blue darken-1' text @click='dialog = false'
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>

import { mapActions } from 'vuex'
export default {
  name: 'signin',
  components: {},
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      dialog: false
    }
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),
    submit () {
      this.signIn(this.form)
        .then(() => {
          this.$router.replace({
            name: 'dashboard'
          })
        })
        .catch(() => {
          console.log('failed sign in')
        })
    }
  }
}
</script>
