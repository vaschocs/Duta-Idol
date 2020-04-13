<template>
  <form @submit.prevent="submit">
    <v-app>
      <v-card>
        <br />
        <br />
        <h4 align="center">LOGIN</h4>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  v-model="form.email"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  required
                  v-model="form.password"
                  :type="show ? 'text' : 'password'"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show = !show"
                  :rules="[rulespass.required, rulespass.min]"
                ></v-text-field>
              </v-col>

              <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on }">
                    <b-link dark v-on="on" href="#foo"
                      >Daftar Sebagai Peserta</b-link
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Pendaftaran Peserta</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Name*" required></v-text-field>
                          </v-col>

                          <v-col cols="12">
                            <v-text-field
                              label="Email*"
                              required
                              :rules="emailRules"
                            ></v-text-field>
                          </v-col>
                          <ValidationObserver>
                            <v-col cols='12'>
                            <ValidationProvider
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <input type="password" v-model="password" />
                              <span>{{ errors[0] }}</span>
                            </ValidationProvider>
                            </v-col>
                            <v-col cols='12'>
                            <ValidationProvider
                              name="confirm"
                              rules="required"
                              v-slot="{ errors }"
                            >
                              <input type="password" v-model="confirmation" />
                              <span>{{ errors[0] }}</span>
                            </ValidationProvider>
                            </v-col>
                          </ValidationObserver>

                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false"
                        >Close</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="dialog = false"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn>
            <v-btn color="primary" text type="submit">SIGN IN</v-btn>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-app>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
// import { extend } from 'vee-validate';

export default {
  name: 'signin',
  components: {},
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      show: false,
      show1: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      rulespass: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
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
