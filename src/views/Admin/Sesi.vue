<template>
  <v-app>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Keterangan Sesi</th>
            <th class="text-left">Tanggal Mulai</th>
            <th class="text-left">Tanggal Akhir</th>
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
                      <span class="headline">Tambah Sesi</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="Keterangan Sesi*"
                              required
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-dialog
                              ref="menu"
                              v-model="modal"
                              :return-value.sync="date"
                              persistent
                              width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="date"
                                  label="Tanggal Mulai Vote"
                                  readonly
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="date" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="modal = false"
                                  >Cancel</v-btn
                                >
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.dialog.save(date)"
                                  >OK</v-btn
                                >
                              </v-date-picker>
                            </v-dialog>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-dialog
                              ref="dialog"
                              v-model="modal"
                              :return-value.sync="date"
                              persistent
                              width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="date"
                                  label="Tanggal Akhir Vote"
                                  readonly
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="date" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="modal = false"
                                  >Cancel</v-btn
                                >
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.dialog.save(date)"
                                  >OK</v-btn
                                >
                              </v-date-picker>
                            </v-dialog>
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
          <tr>
            <td>Sesi 1</td>
            <td>13 Maret 2020</td>
            <td>14 Maret 2020</td>
            <td>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
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
  name: 'sesi',
  data () {
    return {
      hasSaved: false,
      dialog: false,
      menu: false,
      modal1: false,
      user: []
    }
  },

  async mounted () {
    const response = await axios.get('http://localhost:8000/user')
    this.users = response.data
  }
}
</script>
