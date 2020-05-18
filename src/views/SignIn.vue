<template>
  <form @submit.prevent="submit">
    <v-app>
      <br>
      <br>
      <br>
      <br>
      <v-card
    class="mx-auto"
    max-width="400"
    outlined
  >
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
                    <b-link dark v-on="on"
                      >Daftar Sebagai Peserta</b-link
                    >
                  </template>

                  <v-card>
                    <form @submit.prevent="save">
                      <v-card-title>
                        <span class="headline">Registrasi Peserta</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                label="Name*"
                                required
                                v-model="form.name"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="Email*"
                                required
                                v-model="form.email"
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
                            <v-col cols="12">
                              <v-text-field
                                label="Confirmation Password*"
                                required
                                v-model="form.password_confirmation"
                                :type="show1 ? 'text' : 'password'"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show1 = !show1"
                                :rules='rulesco'

                              ></v-text-field>

                            </v-col>
                          </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog = false"
                          >Close</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          type="submit"
                          v-show="!updateSubmit"
                          text
                          @click="dialog = false"
                          >Save</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          v-show="updateSubmit"
                          v-on:click="update(form)"
                          text
                          @click="dialog = false"
                          >Update</v-btn
                        >
                      </v-card-actions>
                    </form>
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
        <Loader></Loader>
      </v-card>
    </v-app>
  </form>
</template>

<script>
import Loader from '../components/_loader'
import { mapActions } from "vuex";
import axios from 'axios'
// import { extend } from 'vee-validate';
export default {
  name: "signin",
  components: {Loader},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: false,
      show1: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      rulespass: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      },
      rulesco:{
        // required: value !== this.form.password_confirmation  || 'password doesnt match'
      },
      dialog: false
    };
  },
  created(){
   axios.interceptors.request.use((config) => {
        // Do something before request is sent
        this.$store.commit('LOADER',true);
        return config;
      }, (error) => {
        // Do something with request error
        this.$store.commit('LOADER',false);
        return Promise.reject(error);
      });
    // Add a response interceptor
    axios.interceptors.response.use((response)=> {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        this.$store.commit('LOADER',false);

        return response;
      }, (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        this.$store.commit('LOADER',false);

        return Promise.reject(error);
      });
  },
  methods: {
    ...mapActions({
      signIn: "auth/signIn"
    }),
    submit() {
      this.signIn(this.form)
        .then(() => {
          this.$router.replace({
            name: "dashboard"
          });
        })
        .catch((e) => {
          alert(e)
        });
    },
    async save() {
      try {
        await axios.post("registerPeserta", this.form);
        this.name = "";
        this.email = "";
        this.password = "";
        alert("Data Berhasil ditambahkan");
        window.location.reload();
      } catch (e) {
        console.log(e);
        console.log(e.response.data.error);
        alert(e + "\n" + e.response.data.error);
      }
    }
  }
};
</script>