<template>
  <v-app>
    <v-data-table
    :headers="headers"
    :items="users"
    sort-by="id"
    class="elevation-1"
    :search="search"
    :hide-default-footer="true"
    disable-pagination="true"
    >

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

          <v-card>
            <form @submit.prevent="save">
            <v-card-title>
              <span class="headline">Registrasi Peserta</span>
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
                      @click:append="show = !show"
                      :rules="[rulespass.required, rulespass.min]"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Confirmation Password*" required v-model="form.password_confirmation"
                      :type="show1 ? 'text' : 'password'"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show1 = !show1"
                      :rules='rules'></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                  <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" type="submit" v-show="!updateSubmit" text @click="dialog = false">Save</v-btn>
              <v-btn color="blue darken-1" v-show="updateSubmit" v-on:click="update(form)" text @click="dialog = false">Update</v-btn>
            </v-card-actions>
          </form>
        </v-card>
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

export default {
  name: 'peserta',
  data () {
    return {
      hasSaved: false,
      dialog: false,
      users: [],
      show: false,
      show1: false,
      updateSubmit: false,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      search: '',
      rulespass: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      },
      form:
        {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        }
    }
  },
  async mounted () {
    try{
      const response = await axios.get('peserta/getAll')
      this.users = response.data.user
    }catch(e){
      console.log(e)
      console.log(e.response.data.error)
      alert(e + '\n' +e.response.data.error)
    }

  },
  methods: {
    async save () {
      try {
        await axios.post('registerPeserta', this.form)
        this.name = ''
        this.email = ''
        this.password = ''
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
          this.dialog = true
        }
      }
    },
    async update (form) {
      try {
        await axios.post('pesertaEdit/' + form.id, this.form)
        this.name = ''
        this.email = ''
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
    }
  }
}
</script>
