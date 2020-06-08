<template>
  <form @submit.prevent="submit">
    <div>
      <v-app class="transparent">
        <br />
        <br />
        <br />
        <br />
        <v-card class="mx-auto" max-width="400" outlined>
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
                     required
                      :error-messages="emailErrors"
                      @input="$v.form.email.$touch()"
                      @blur="$v.form.email.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    v-model="form.password"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    required
                    :error-messages="passwordErrors"
                    @input="$v.form.password.$touch()"
                    @blur="$v.form.password.$touch()"
                  ></v-text-field>
                </v-col>

                <v-row justify="center" v-show="show2">
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on }">
                      <b-link dark v-on="on">Daftar Sebagai Peserta</b-link>
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
                                  v-model="form.name"
                                  required
                                 :error-messages="nameErrors"
                                @input="$v.form.name.$touch()"
                                @blur="$v.form.name.$touch()"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  label="Email*"
                                  v-model="form.email"
                                   required
                                :error-messages="emailErrors"
                                @input="$v.form.email.$touch()"
                                @blur="$v.form.email.$touch()"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  label="Password*"
                                  v-model="form.password"
                                  :type="show ? 'text' : 'password'"
                                  :append-icon="
                                    show ? 'mdi-eye' : 'mdi-eye-off'
                                  "
                                  @click:append="show = !show"
                                  required
                                :error-messages="passwordErrors"
                                @input="$v.form.password.$touch()"
                                @blur="$v.form.password.$touch()"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  label="Confirmation Password*"
                                  v-model="form.password_confirmation"
                                  :type="show1 ? 'text' : 'password'"
                                  :append-icon="
                                    show1 ? 'mdi-eye' : 'mdi-eye-off'
                                  "
                                  @click:append="show1 = !show1"
                                  required
                                :error-messages="password_confirmationErrors"
                                @input="$v.form.password_confirmation.$touch()"
                                @blur="$v.form.password_confirmation.$touch()"
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
                            >Save</v-btn
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
    </div>
  </form>
</template>

<script>
import Loader from "../components/_loader";
import { mapActions } from "vuex";
import axios from "axios";
import { validationMixin } from 'vuelidate'
import { required, maxLength,minLength , email, sameAs } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    form:{
      name: { required, maxLength: maxLength(30) },
      email: { required, email },
      password: { required, minLength: minLength(8)},
      password_confirmation: { required, minLength: minLength(8),sameAs: sameAs("password") },
    }
  },
  name: "signin",
  components: { Loader },
  data() {
    return {
      status: "",
      show2: false,
      form: {
        email: "",
        password: ""
      },
      show: false,
      show1: false,
      dialog: false
    };
  },
   async mounted() {
    const response = await axios.get("lastSesi");
    this.status = response.data.sesi;

    if (this.status == null) {
      this.show2 = true;
    }
  },

  computed: {
      nameErrors () {
       const errors = []
        if (!this.$v.form.name.$dirty) return errors
        !this.$v.form.name.maxLength && errors.push('Name must be at most 30 characters long')
        !this.$v.form.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.form.email.$dirty) return errors
        !this.$v.form.email.email && errors.push('Must be valid e-mail')
        !this.$v.form.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.form.password.$dirty) return errors
        !this.$v.form.password.minLength && errors.push('Password must be at least 8 characters')
        !this.$v.form.password.required && errors.push('Password is required')
        return errors
      },
      password_confirmationErrors () {
        const errors = []
        if (!this.$v.form.password_confirmation.$dirty) return errors
        !this.$v.form.password_confirmation.minLength && errors.push('password confirmation must be at least 8 characters')
        !this.$v.form.password_confirmation.sameAs && errors.push('password is not match')
        !this.$v.form.password_confirmation.required && errors.push('Password confirmation is required')
        return errors
      },
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
        .catch(e => {
          alert(e);
        });
    },
    async save() {
      this.$v.$touch()
      if(this.$v.$error) return //APABILA ERROR MAKA STOP
      try {
        this.dialog=false;
        await axios.post("registerPeserta", this.form);
        this.name = "";
        this.email = "";
        this.password = "";
        alert("Data Berhasil ditambahkan");
      } catch (e) {
        console.log(e);
        console.log(e.response.data.error);
        alert(e + "\n" + e.response.data.error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.transparent {
  background-color: transparent !important;
  opacity: 100;
  border-color: transparent !important;
}
</style>
