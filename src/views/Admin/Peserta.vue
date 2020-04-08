<template>
  <v-app>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Status</th>
            <th class="text-left"></th>
            <th>
              <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on }">
                    <v-btn icon color="primary" dark v-on="on">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Registrasi Peserta</span>
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
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Password*"
                              type="password"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Confirmation Password*"
                              type="password"
                              required
                            ></v-text-field>
                          </v-col>

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
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.password }}</td>
                  <td>{{ user.status }}</td> -->
          <tr>
            <td>009</td>
            <td>James Alexander</td>
            <td>jamesal@gmail.com</td>
            <td>AUDISI</td>
            <td>
              <b-link href="#foo">Edit </b-link>
              |
              <b-link href="#foo">Delete</b-link>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
      user: []
    }
  },

  async mounted () {
    const response = await axios.get('http://localhost:8000/user')
    this.users = response.data
  }
}
</script>
