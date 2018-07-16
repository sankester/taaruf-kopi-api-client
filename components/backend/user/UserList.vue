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
            <v-icon dark>edit</v-icon>
          </v-btn>
          <v-btn icon fab small color="error" >
            <v-icon dark @click="deleteItem(props.item)">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <!--if empty data-->
      <template slot="no-data" class="justify-center align-center layout px-0">
        <v-layout align-center justify-center justify-space-around fill-height>
          <v-btn color="primary"  @click="reload" class="ma-5">load user</v-btn>
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
      }
    },
  }
</script>

<style scoped>

</style>
