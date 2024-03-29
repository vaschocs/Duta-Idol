<template>
  <v-app>
    <!-- untuk tamplin data -->
    <v-data-table
    :headers="headers"
    :items="users"
    sort-by="id"
    class="elevation-1"
    :search="search"
    :hide-default-footer="true"
    disable-pagination="true"
    >
    <Loader></Loader>

    <template v-slot:top>
      <v-toolbar flat color="black">
        <!-- untuk search -->
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>

          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn icon color="primary" dark v-on="on">Add
                  <v-icon>mdi-account-plus</v-icon>
                </v-btn>
              </template>

              <form @submit.prevent="save">
                <v-card>
                  <v-card-title>
                    <span class="headline">Registrasi Juri</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Name*"
                          v-model="form.name"
                          required
                          :error-messages="nameErrors"
                          @input="$v.form.name.$touch()"
                          @blur="$v.form.name.$touch()"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="Email*"
                          v-model="form.email"
                          required
                          :error-messages="emailErrors"
                          @input="$v.form.email.$touch()"
                          @blur="$v.form.email.$touch()"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="Password*"
                          v-model="form.password"
                          :type="show ? 'text' : 'password'"
                          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="show = !show"
                          required
                          :error-messages="passwordErrors"
                          @input="$v.form.password.$touch()"
                          @blur="$v.form.password.$touch()"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="Confirmation Password*"
                          v-model="form.password_confirmation"
                          :type="show1 ? 'text' : 'password'"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="show1 = !show1"
                          required
                          :error-messages="password_confirmationErrors"
                          @input="$v.form.password_confirmation.$touch()"
                          @blur="$v.form.password_confirmation.$touch()"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="['Aktif', 'Tidak Aktif']"
                            label="Status*"
                            v-model="form.status"
                             required
                          :error-messages="statusErros"
                          @input="$v.form.status.$touch()"
                          @blur="$v.form.status.$touch()"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close" >Close</v-btn>
                      <v-btn color="blue darken-1" type="submit" v-show="!updateSubmit" text  >Save</v-btn>
                      <v-btn color="blue darken-1" v-show="updateSubmit" v-on:click="update(form)" text >Update</v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
              </v-dialog>
            </v-row>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
       <v-icon
          v-on:click="edit(item)"
          color="success"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          @click="hapus(item)"
          color="error"
        >
          mdi-delete
        </v-icon>
    </template>
    </v-data-table>
  </v-app>
</template>

<script>
import axios from 'axios'
import Loader from "../../components/_loader"
import TheNavigation from '../../components/TheNavigation'
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
      status: {required},
    }
  },

  name: 'juri',
  components:{Loader},
  data () {
    return {
      hasSaved: false,
      dialog: false,
      show: false,
      show1: false,
      users: [],
      search: '',
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      form:
        {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          status: ''
        },
      updateSubmit: false,
    }
  },
  async mounted () {
    try {
      const response = await axios.get('juri/getAll')
      this.users = response.data.user
    } catch (e) {
      console.log(e)
      console.log(e.response.data.error)
      alert(e + '\n' +e.response.data.error)
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
      statusErros(){
        const errors = []
        if (!this.$v.form.status.$dirty) return errors
        !this.$v.form.status.required && errors.push('Status is required')
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
    close () {
      this.dialog = false
    },
    async save () {
      this.$v.$touch()
      if(this.$v.$error) return //APABILA ERROR MAKA STOP
      try {
        this.dialog = false
        await axios.post('registerJuri', this.form)
        this.name = ''
        this.email = ''
        this.status = ''
        alert('Data Berhasil ditambahkan')
        window.location.reload()
      } catch (e) {
        console.log(e)
        console.log(e.response.data.error)
        alert(e + '\n' +e.response.data.error)
      }
    },
    async edit (user) {
      if (confirm('Do you really want to edit?')) {
        if (confirm('Password must be update, are you sure to edit this data?')) {
          this.updateSubmit = true
          this.form.id = user.id
          this.form.name = user.name
          this.form.email = user.email
          this.form.status = user.status
          this.dialog = true
        }
      }
    },
    async update (form) {
      this.$v.$touch()
      if(this.$v.$error) return //APABILA ERROR MAKA STOP
      try {
        await axios.post('juriEdit/' + form.id, this.form)
        this.name = ''
        this.email = ''
        this.status = ''
        this.updateSubmit = false
        alert('Data Berhasil diubah')
        window.location.reload()
      } catch (e) {
        console.log(e)
        console.log(e.response.data.error)
        alert(e + '\n' +e.response.data.error)
      }
    },
    async hapus (user) {
      if (confirm('Do you really want to delete?')) {
        try {
          await axios.post('user/delete/' + user.id)
          alert('Data terhapus')
          window.location.reload()
        } catch (e) {
        console.log(e)
        console.log(e.response.data.error)
        alert(e + '\n' +e.response.data.error)
        }
      }
    },
    created(){
      this.$emit(`update:layout`, TheNavigation);
    }
  }


}
</script>
