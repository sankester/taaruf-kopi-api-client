<template>
  <v-layout row wrap>
    <v-flex xs12>
      <!--breadcumb-->
      <v-breadcrumbs divider="/" class="px-1 pt-0">
        <h1>Dashboard</h1>
        <v-spacer></v-spacer>
        <v-breadcrumbs-item nuxt exact v-for="breadcumb in breadcumbs" :key="breadcumb.text" :disabled="breadcumb.disabled" :to="breadcumb.link">
          {{ breadcumb.text }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-alert
        v-model="alert"
        dismissible
        type="success"
        v-if="welcomeStatus"
      >
        Selamat datang <b>{{ authUser.nama}}</b> di halaman admin website ta`ruf kopi
      </v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "index",
    layout: 'admin',
    middleware : ['check-auth','auth'],
    computed :{
      // get welcome message status
      welcomeStatus(){
        return this.$store.getters.getWelcomeMessageStatus
      },
      // get auth user
      authUser(){
        return this.$store.getters.getAuthUser
      },
    },
    data() {
      return {
        // mobile status
        isMobile: false,
        // breadcumb data
        breadcumbs: [
          {
            text: "Dashboard",
            disabled: true,
          }
        ],
        alert : true
      };
    },
    beforeDestroy() {
      // set login welcome status
      this.$store.commit('setWelcomeMessage', false)
    },
  }
</script>

<style scoped>

</style>
