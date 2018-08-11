<template>
  <v-toolbar fixed app :style="getColor" dark height="65px" :class="getClass" clipped >
    <v-toolbar-title>
      <nuxt-link to="/" style="text-decoration: none">
        <v-avatar tile class="top--logo">
          <img src="~assets/img/web/logo-kopi-taaruf.png" alt="">
        </v-avatar>
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat exact nuxt to="/" >Home</v-btn>
      <v-menu
        bottom
        origin="center center"
        transition="scale-transition"
        offset-y
        open-on-hover
      >
        <v-btn flat slot="activator">Profil</v-btn>
        <v-list :style="getStyleMenuItem">
          <v-list-tile exact nuxt :to="'/profil/'+ profil.id" v-for="(profil ,index) in dataProfil" :key="index">
            <v-list-tile-title class="white--text">{{profil.nama_profil}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn flat exact nuxt to="/berita">Berita</v-btn>
      <v-btn flat exact nuxt to="/acara">Acara</v-btn>
      <v-btn flat exact nuxt to="/produk">Produk</v-btn>
    </v-toolbar-items>
    <!--mobile navbar-->
    <v-menu offset-y class="hidden-md-and-up">
      <v-btn icon slot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile exact nuxt to="/berita">
          <v-list-tile-title>Berita</v-list-tile-title>
        </v-list-tile>
        <v-list-tile exact nuxt to="/acara">
          <v-list-tile-title>Acara</v-list-tile-title>
        </v-list-tile>
        <v-list-tile exact nuxt to="/produk">
          <v-list-tile-title>Produk</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
  export default {
    name: "navbar-website",
    data () {
      return {

      }
    },
    mounted(){
      // get data user from API server
      this.$store.dispatch("getPublicListProfil").catch(error => {
        // default error message
        let errorMessage = "Gagal mengambil data";
        // cek response error
        if (error.response) {
          // set 401 error message
          if (error.response.status == 401) {
            errorMessage = "<h4>Anda tidak mempunyai akses.</h4>";
          } else if(error.response.status == 405){
            // get error data
            errorMessage = '<h4>Method tidak diperbolehkan.</h4>'
          } else{
            // set server error message
            errorMessage = "<h4>Server sedang jalan-jalan.</h4>";
          }
        }
        // show error message
        this.$awn.alert(errorMessage);
      })
    },
    computed : {
      getClass(){
        // cek navbar transparent
        if(this.$store.getters.getTransparentNavbar){
          return 'elevation-0 transparent'
        }else{
          return 'elevation-0'
        }
      },
      getColor(){
        return 'background-color: ' + this.$store.getters.getNavbarClassColor
      },
      dataProfil(){
        return this.$store.getters.getListPublicProfil
      },
      getStyleMenuItem(){
        if(this.$store.getters.isHome == true){
          return 'background-color: rgba(128, 128, 128, 0.5) !important;'
        }else{
          return 'background-color: black !important;'
        }
      }
    }
  }
</script>

<style scoped>
  /*custom top logo */
  .top--logo {
    width: 165px !important;
    height: 50px !important;
  }
  .v-btn--active{
    color: white;
    border-bottom: 3px solid  rgba( 0,0,0,0.5);
    background-color: rgba( 0,0,0,0.5);
  }
  .v-toolbar__content{
    background-color:  rgba(128, 128, 128, 0.5) !important;
  }
</style>
