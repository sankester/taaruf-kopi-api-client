<template>
  <div>
    <!--table list component-->
    <v-data-table :headers="headers" :items="users" hide-actions class="elevation-1 mt-3">
      <!--looping data-->
      <template slot="items" slot-scope="props">
        <td>{{ props.item.nama }}</td>
        <td>{{ props.item.username }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ getStatus(props.item.status) }}</td>
        <td class="justify-center align-center layout px-0">
          <v-btn depressed fab small color="info" class="mr-1" nuxt :to="'user/' + props.item.id">
            <v-icon small dark>edit</v-icon>
          </v-btn>
          <v-btn icon fab small color="error" >
            <v-icon small dark @click="deleteUser(props.item)">delete</v-icon>
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
              Data belum tersedia, klik tombol tambah user untuk menambah data atau klik tombol load data jika ingin mengambil data terbaru dari server.
            </v-alert>
          </v-flex>
          <v-flex md12 lg12 xs12 sm12  align-center justify-center class="layout">
            <v-btn color="secondary"  @click="reload"><v-icon class="mr-1">refresh</v-icon>load data</v-btn>
          </v-flex>
        </v-layout>
      </template>
    </v-data-table>
    <!--load more button-->
    <v-layout align-center justify-center justify-space-around fill-height class="mt-3" v-if="users.length >= pagination.per_page && pagination.current_page < pagination.total_pages">
      <v-btn color="brown lighten-3" dark :loading="loading" @click="loadMore(pagination.links.next)">load more</v-btn>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: "UserList",
    props: {
      headers: {
        type: Array,
        required: true
      },
      users: {
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
      // reformat status laabel
      getStatus(status){
        if(status){
          return 'Aktif'
        }
        return 'Non Aktif'
      },
      // emmit load more event
      loadMore(url){
        this.$emit('loadMore',url)
      },
      // emit delete user
      deleteUser(user){
        this.$emit('delete', user)
      }
    },
  }
</script>

<style scoped>

</style>
