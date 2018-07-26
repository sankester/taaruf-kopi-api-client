<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>List Berita Terbaru</h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="indigo">
        <v-icon class="mr-1">list</v-icon>Selengkapnya
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table :headers="headers" :items="list" hide-actions class="elevation-0">
          <!--looping data-->
          <template slot="items" slot-scope="props">
            <td>{{ props.item.nama_berita }}</td>
            <td>{{ props.item.user.data.nama }}</td>
            <td align="center">
              <v-btn flat :class="(props.item.publish_st) ? 'success--text' : 'error--text'" small >
                <v-icon v-text="(props.item.publish_st) ? 'check' : 'clear'"></v-icon> &nbsp; {{ (props.item.publish_st) ? 'Dipublist' : 'Belum Dipublist'}}
              </v-btn>
            </td>
            <td class="text-xs-center">
              <v-btn flat icon color="info" nuxt :to="'berita/' + props.item.id">
                <v-icon small dark>edit</v-icon>
              </v-btn>
            </td>
          </template>
          <!--if empty data-->
          <template slot="no-data" class="justify-center align-center layout">
            <v-layout align-center justify-center fill-height row wrap class="py-2">
              <v-flex md12 lg12 xs12 sm12>
                <v-alert
                  :value="true"
                  color="info"
                  icon="info"
                  outline
                >
                  Data belum tersedia, pergi ke halaman berita untuk menambah data</v-alert>
              </v-flex>
            </v-layout>
          </template>
        </v-data-table>
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>

  export default {
    props: {
      headers: {
        type: Array,
        required: true
      },
      list: {
        type: Array,
        required: true
      },
    },
  };
</script>
