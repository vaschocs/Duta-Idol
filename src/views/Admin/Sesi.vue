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
                          <v-col cols="11" sm="5">
                              <v-datetime-picker
                              label="Mulai Sesi"
                              v-model="datetime2"
                              :time-picker-props="timeProps"
                              time-format='HH:mm:ss'>
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="modal2 = false"
                                  >Cancel</v-btn
                                >
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.dialog.save(time)"
                                  >OK</v-btn
                                >
                              </v-datetime-picker>
                          </v-col>
                          <v-col cols="11" sm="5">
                              <v-datetime-picker
                              label="Akhir Sesi"
                              v-model="datetime2"
                              :time-picker-props="timeProps"
                              time-format='HH:mm:ss'>
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="modal2 = false"
                                  >Cancel</v-btn
                                >
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.dialog.save(time)"
                                  >OK</v-btn
                                >
                              </v-datetime-picker>
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
import DatetimePicker from 'vuetify-datetime-picker'

export default {
  name: 'sesi',
  data () {
    return {
      hasSaved: false,
      dialog: false,
      menu: false,
      time: null,
      menu2: false,
      modal2: false,
      modal1: false,
      user: [],

      timeProps: {
        useSeconds: true,
        format: '24hr',
        ampmInTitle: true
      }
    }
  },

  async mounted () {
    const response = await axios.get('http://localhost:8000/user')
    this.users = response.data
  }
}
</script>
