<template>
  <v-app>
  <!-- untuk tamplin data -->
    <v-data-table
    :headers="headers"
    :items="sesis"
    sort-by="id"
    class="elevation-1"
    :search="search"
    :hide-default-footer="true"
    disable-pagination="true"
    >

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
                  <v-btn icon color="primary" dark v-on="on" v-if="!btnTutup"> Add Sesi
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>



            <form @submit.prevent="saveSesi">
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
                            v-model="form.ket_sesi"
                          ></v-text-field>
                      </v-col>
                      <v-col cols="11" sm="5">
                        <v-datetime-picker
                            label="Mulai Sesi"
                            v-model="form.tgl_mulai_vote"
                            :time-picker-props="timeProps"
                            time-format='HH:mm:ss'
                            >
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
                          v-model="form.tgl_akhir_vote"
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
    <template>
      <v-btn rounded color="warning" dark v-show="btnTutup" v-on:click="eliminasi()"> Tutup Sesi Terakhir</v-btn>
    </template>
  </v-app>
</template>

<script>
import axios from 'axios'
import DatetimePicker from 'vuetify-datetime-picker'
import moment from 'moment'
export default {
  name: 'sesi',
  data () {
    return {
      dialog: false,
      time: null,
      modal2: false,
      sesis: [],
      headers: [
        { text: 'Keterangan Sesi', value: 'ket_sesi' },
        { text: 'Tanggal Mulai Vote', value: 'tgl_mulai_vote' },
        { text: 'Tanggal Akhir Vote', value: 'tgl_akhir_vote' },
        { text: 'Status sesi', value: 'status_sesi', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      timeProps: {
        useSeconds: true,
        format: '24hr',
        ampmInTitle: true
      },
      updateSubmit: false,
      form:
        {
          id: '',
          ket_sesi: '',
          tgl_mulai_vote: '',
          tgl_akhir_vote: '',
          status_sesi: 1
        },
        statusLastSesi: '',
        btnTutup: false,
        idSesiVoteTutup: '',
        jmlTereliminasi: '',
    }
  },

  async mounted () {
    try {
      const response = await axios.get('sesi/getAll')
      const resposeStatusLastSesi = await axios.get('lastSesi')
      this.sesis = response.data.sesi
      this.statusLastSesi = resposeStatusLastSesi.data.sesi
      if(this.statusLastSesi==1){
        alert("Anda Harus Menutup Sesi Terakhir Sebelum Membuat Sesi Baru")
        this.btnTutup=true
      }
    } catch (e) {
      console.log(e)
      console.log(e.response.data.error)
      alert(e + '\n' +e.response.data.error)

    }
  },
  methods: {
    close () {
      this.dialog = false
    },
    formatDateOutputDatePicker: function(date) {
        		return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    async saveSesi () {
      try {
        var obj = {}
        obj.ket_sesi = this.form.ket_sesi
        obj.tgl_mulai_vote = this.formatDateOutputDatePicker(this.form.tgl_mulai_vote)
        obj.tgl_akhir_vote = this.formatDateOutputDatePicker(this.form.tgl_akhir_vote)
        obj.status_sesi = 1
        // alert(this.formatDateOutputDatePicker(this.form.tgl_mulai_vote))
        await axios.post('sesi/vote/create', obj)
        alert('Sesi Berhasil ditambahkan')
        window.location.reload()
      } catch (e) {
        console.log(e)
        console.log(e.response.data.error)
        alert(e + '\n' +e.response.data.error)
      }
    },
    async edit (sesi) {
      if (confirm('Do you really want to edit?')) {
          this.updateSubmit = true
          this.form.id = sesi.id_sesi_vote
          this.form.ket_sesi = sesi.ket_sesi
          this.form.tgl_mulai_vote = sesi.tgl_mulai_vote
          this.form.tgl_akhir_vote = sesi.tgl_akhir_vote
          this.dialog = true
      }
    },
    async update (form) {
      console.log(form)
      try {
        var obj = {}
        obj.ket_sesi = form.ket_sesi
        obj.tgl_mulai_vote = this.formatDateOutputDatePicker(form.tgl_mulai_vote)
        obj.tgl_akhir_vote = this.formatDateOutputDatePicker(form.tgl_akhir_vote)
        await axios.post('sesi/vote/update/' + form.id, obj)
        this.updateSubmit = false
        alert('Data Berhasil diubah')
        window.location.reload()
      } catch (e) {
        console.log(e)
        console.log(e.response.data.error)
        alert(e + '\n' +e.response.data.error)
      }
    },
    async hapus (sesi) {
      if (confirm('Do you really want to delete?')) {
        try {
          await axios.post('sesi/vote/delete/' + sesi.id_sesi_vote)
          alert('Data terhapus')
          window.location.reload()
        } catch (e) {
          console.log(e)
          console.log(e.response.data.error)
          alert(e + '\n' +e.response.data.error)
        }
      }
    },
    async eliminasi () {
      if (confirm('Do you really want to close?')) {
        try {
          const response = await axios.post('eliminasi')
          this.idSesiVoteTutup = response.data.idSesiVoteDitutup
          this.jmlTereliminasi =response.data.jumlahTerelimiasi
          alert('Sesi dengan ID ' + this.idSesiVoteTutup + ' ditutup, Jumlah Orang yang tereliminasi ' + this.jmlTereliminasi + ' orang ')
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
