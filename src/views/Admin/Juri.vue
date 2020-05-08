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
      <v-toolbar flat color="white">
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
                <v-btn icon color="primary" dark v-on="on">Add Juri
                  <v-icon>mdi-plus</v-icon>
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
                          <v-text-field label="Name*" required v-model="form.name"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="Email*" required v-model="form.email"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="Password*" required v-model="form.password"
                          :type="show ? 'text' : 'password'"
                          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="show = !show"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="Confirmation Password*" required v-model="form.password_confirmation"
                          :type="show1 ? 'text' : 'password'"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="show1 = !show1"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="['Aktif', 'Tidak Aktif']"
                            label="Status*"
                            required
                            v-model="form.status"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close" >Close</v-btn>
                      <v-btn color="blue darken-1" type="submit" v-show="!updateSubmit" text @click="dialog = false">Save</v-btn>
                      <v-btn color="blue darken-1" v-show="updateSubmit" v-on:click="update(form)" text @click="dialog = false">Update</v-btn>
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

export default {
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
      updateSubmit: false
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
      try {
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
