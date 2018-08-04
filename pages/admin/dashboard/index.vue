<template>
  <v-layout row wrap>
    <v-container grid-list-xl fluid class="pa-0 ma-0">
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
        <v-layout row wrap>
          <!-- mini statistic start -->
          <v-flex lg3 sm6 xs12>
            <mini-statistic
              icon="event"
              :title="dashboardData.count.acara.toString()"
              sub-title="Acara"
              color="indigo"
            >
            </mini-statistic>
          </v-flex>
          <v-flex lg3 sm6 xs12>
            <mini-statistic
              icon="web"
              :title="dashboardData.count.berita.toString()"
              sub-title="Berita"
              color="red"
            >
            </mini-statistic>
          </v-flex>
          <v-flex lg3 sm6 xs12>
            <mini-statistic
              icon="shopping_basket"
              :title="dashboardData.count.produk.toString()"
              sub-title="Produk"
              color="primary"
            >
            </mini-statistic>
          </v-flex>
          <v-flex lg3 sm6 xs12>
            <mini-statistic
              icon="group"
              :title="dashboardData.count.user.toString()"
              sub-title="User"
              color="purple"
            >
            </mini-statistic>
          </v-flex>
          <v-flex lg12 sm12 xs12>
            <list-berita :headers="beritaHeaders" :list="dashboardData.list.berita"></list-berita>
          </v-flex>
          <v-flex lg12 sm12 xs12>
            <list-acara :headers="acaraHeaders" :list="dashboardData.list.acara"></list-acara>
          </v-flex>
        </v-layout>
     </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
  // import library
  import axios from 'axios'
  // import component
  import MiniStatistic from "@/components/backend/general/widget/MiniStatistic";
  import ListAcara from "@/components/backend/general/list/list-acara";
  import ListBerita from "@/components/backend/general/list/list-berita";

  export default {
    name: "index",
    layout: 'admin',
    middleware : ['set-host','check-auth','auth'],
    components: {
      MiniStatistic, ListAcara, ListBerita
    },
    async asyncData (context) {
      // set headers
      let headers = {
        'Authorization': "Bearer " + context.store.getters.getToken,
      }
      // cek proses
      if (process.server){
        // get host cors
        let corsHost = context.store.getters.getCorsHost
        // add cors host to header
        headers = {...headers, "Origin": corsHost}
      }
      const res = await axios.get( process.env.BASE_URL + 'dashboard', {
        headers: headers
      })
      context.store.commit('setDasboardData', res.data)
      return true
    },
    computed :{
      // get welcome message status
      welcomeStatus(){
        return this.$store.getters.getWelcomeMessageStatus
      },
      // get auth user
      authUser(){
        return this.$store.getters.getAuthUser
      },
      // get dashboard data
      dashboardData(){
        return this.$store.getters.getDataDashboard
      },
      // header acara
      acaraHeaders() {
        return this.$store.getters.getAcaraTableHeaders;
      },
      // header berita
      beritaHeaders() {
        return this.$store.getters.getBeritaTableHeaders;
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
