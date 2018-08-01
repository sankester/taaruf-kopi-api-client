<template>
  <div>
    <!--table list component-->
    <v-data-table :headers="headers" :items="list" hide-actions class="elevation-1 mt-3">
      <!--looping data-->
      <template slot="items" slot-scope="props">
        <td>{{ props.item.nama_berita }}</td>
        <td>{{ props.item.user.data.nama }}</td>
        <td align="center">
          <v-btn flat :class="(props.item.publish_st) ? 'success--text' : 'error--text'" small >
            <v-icon v-text="(props.item.publish_st) ? 'check' : 'clear'"></v-icon> &nbsp; {{ (props.item.publish_st) ? 'Dipublist' : 'Belum Dipublist'}}
          </v-btn>
        </td>
        <td class="text-xs-right">
          <v-btn flat icon small color="info" nuxt :to="'berita/' + props.item.id">
            <v-icon small dark>edit</v-icon>
          </v-btn>
          <v-btn flat icon small color="error" >
            <v-icon small dark @click="delete_berita(props.item)">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <!--if empty data-->
      <template slot="no-data" class="justify-center align-center layout">
        <v-layout align-center justify-center fill-height row wrap class="py-2">
          <v-flex md12 lg12 xs12 sm12>
            <v-alert :value="true" color="info" icon="info" outline>
              Data belum tersedia, klik tombol tambah berita untuk menambah data atau klik tombol load data jika ingin mengambil data terbaru dari server.
            </v-alert>
          </v-flex>
          <v-flex md12 lg12 xs12 sm12  align-center justify-center class="layout">
            <v-btn color="secondary"  @click="reload"><v-icon class="mr-1">refresh</v-icon>load data</v-btn>
          </v-flex>
        </v-layout>
      </template>
    </v-data-table>
    <!--load more button-->
    <v-layout align-center justify-center justify-space-around fill-height class="mt-3" v-if="list.length >= pagination.per_page && pagination.current_page < pagination.total_pages">
      <v-btn color="brown lighten-3" dark :loading="loading" @click="loadMore(pagination.links.next)">load more</v-btn>
    </v-layout>
  </div>
</template>

<script>
    export default {
      name: "BeritaList",
      props: {
        headers: {
          type: Array,
          required: true
        },
        list: {
          type: Array,
          required: true
        },
        loading : {
          type : Boolean,
          default : false,
          required : false
        },
        pagination : {
          type : Object,
          required : true
        }
      },
      methods : {
        // emmit reload function
        reload(){
          this.$emit('reload');
        },
        // emmit load more event
        loadMore(url){
          this.$emit('loadMore',url)
        },
        // emit delete user
        delete_berita(data){
          this.$emit('delete', data)
        },
        formatPrice(value) {
          let val = (value/1).toFixed(2).replace('.', ',')
          return 'Rp ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
      },
    }
</script>

<style scoped>

</style>
