<template>
  <div>
    <!--table list component-->
    <v-data-table :headers="headers" :items="list" hide-actions class="elevation-1 mt-3">
      <!--looping data-->
      <template slot="items" slot-scope="props">
        <td>{{ props.item.nama_profil }}</td>
        <td>{{ props.item.user.data.nama }}</td>
        <td class="justify-center align-center layout px-0">
          <v-btn depressed fab small color="info" class="mr-1" nuxt :to="'profil/' + props.item.id">
            <v-icon small dark>edit</v-icon>
          </v-btn>
          <v-btn icon fab small color="error" >
            <v-icon small dark @click="delete_profil(props.item)">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <!--if empty data-->
      <template slot="no-data" class="justify-center align-center layout px-0">
        <v-layout align-center justify-center justify-space-around fill-height>
          <v-btn color="primary"  @click="reload" class="ma-5">load data</v-btn>
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
    name: "ProfilList",
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
      delete_profil(data){
        this.$emit('delete', data)
      }
    },
  }
</script>

<style scoped>

</style>
