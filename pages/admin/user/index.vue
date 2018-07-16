<template>
  <v-layout row wrap >
    <v-flex xs12>
      <!--breadcumb-->
      <v-breadcrumbs divider="/">
        <h1>Manajemen User</h1>
        <v-spacer></v-spacer>
        <v-breadcrumbs-item nuxt exact v-for="breadcumb in breadcumbs" :key="breadcumb.text" :disabled="breadcumb.disabled" :to="breadcumb.link">
          {{ breadcumb.text }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <!--search form-->
      <v-card>
        <v-toolbar dark color="brown darken-1">
          <v-toolbar-title class="white--text">Cari User</v-toolbar-title>
        </v-toolbar>
        <v-form >
          <v-container fluid >
            <v-layout row>
              <v-flex xs6 sm6 md4>
                <v-text-field
                  v-model="keyword"
                  label="Nama User"
                ></v-text-field>
              </v-flex>
              <v-flex xs6 sm6 md4>
                <v-btn fab dark color="primary" :small="isMobile" @click="search">
                  <v-icon>search</v-icon>
                </v-btn>
                <v-btn fab :small="isMobile" @click="resetSearch">
                  <v-icon>settings_backup_restore</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
      <!--content-->
      <v-card class="mt-5" style="min-height: 250px !important;">
        <!--header-->
        <v-toolbar dark color="brown darken-1">
          <v-toolbar-title class="white--text">List User</v-toolbar-title>
          <!--button add-->
          <v-btn nuxt to="/admin/user/new" absolute dark fab top right :large="!isMobile" :small="isMobile" color="success" class="mr-2" v-if="!isMobile">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
        <!--show list user-->
        <UserList :headers="userHeaders" :users="userList" :loading="loadingButton" :pagination="pagination" @reload="initialize" @loadMore="loadMore"/>
        <v-card-text style="position: relative" v-if="isMobile">
          <v-fab-transition >
            <v-btn  nuxt to="/admin/user/new"  color="success" class="mb-5" dark fab fixed bottom right >
              <v-icon>add</v-icon>
              <v-icon>close</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import UserList from '@/components/backend/user/UserList'

  export default {
    name: "user",
    layout: 'admin',
    middleware: ['check-auth', 'auth'],
    components: {
      UserList
    },
    data(){
      return {
        // mobile status
        isMobile: false,
        // breadcumb data
        breadcumbs: [
          {
            text: 'Dashboard',
            disabled: false,
            link : '/admin'
          },
          {
            text: 'User',
            disabled: true
          }
        ],
        loadingButton : false,
        keyword : ''
      }
    },
    computed : {
      // get list user
      userList () { return this.$store.getters.getListUser },
      // set user table headers
      userHeaders () { return this.$store.getters.getUserTableHeaders },
      // get pagination data
      pagination () { return this.$store.getters.getUserPagination }
    },
    mounted () {
      // call resize screen function
      this.onResize()
      // cek if browser process
      if (process.browser) {
        window.addEventListener('resize', this.onResize, {passive: true})
      }
      // call initialize data function
      this.initialize()
    },
    beforeDestroy () {
      if (process.browser) {
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', this.onResize, { passive: true })
        }
      }
    },
    methods: {
      // resize screen
      onResize () {
        if (process.browser) {
          this.isMobile = window.innerWidth < 600
        }
      },
      // initialize data user from API server
      initialize() {
        // show waiting asyncronus loading indicator
        this.$awn.asyncBlock(
          // get data user from API server
          this.$store.dispatch('getListUser').catch((error) => {
            // default error message
            let errorMessage ='Gagal mengambil data';
            // cek response error
            if (error.response) {
              // set 401 error message
              if(error.response.status == 401){
                errorMessage = '<h4>Anda tidak mempunyai akses.</h4>'
              }else{
                // set server error message
                errorMessage = '<h4>Server sedang jalan-jalan.</h4>'
              }
            }
            // show error message
            this.$awn.alert(errorMessage)
          })
        )
      },
      // load moredata user from API server
      loadMore(link) {
        // show loading button
        this.loadingButton = true
        // get more  user from API server
        this.$store.dispatch('loadMoreUser', link).then((res) => {
          // disable loading button
          this.loadingButton = false
          // update list user
          this.$store.commit('updateListUser',res.data)
          this.$store.commit('setLastPagination',res.meta.pagination)
        }).catch((error) => {
          // disable loading button
          this.loadingButton = false
          // default error message
          let errorMessage = 'Gagal mengambil data';
          // cek response error
          if (error.response) {
            // set 401 error message
            if (error.response.status == 401) {
              errorMessage = '<h4>Anda tidak mempunyai akses.</h4>'
            } else {
              // set server error message
              errorMessage = '<h4>Server sedang jalan-jalan.</h4>'
            }
          }
          // show error message
          this.$awn.alert(errorMessage)
        })

      },
      editItem(user) {

      },
      deleteItem (user) {

      },
      // reset search
      resetSearch(){
        // set keyword user to empty
        this.$store.commit('setKeywordUser', ' ')
        this.keyword = ''
        // load data user
        this.initialize()
      },
      // search item in API server
      search(){
        // set keyword search user
        this.$store.commit('setKeywordUser', this.keyword)
        // get data
        this.initialize()
      }
    },
    head: {
      titleTemplate: 'Manajemen User - %s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Meta description' }
      ]
    }
  }
</script>

<style scoped>
</style>
