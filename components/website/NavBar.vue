<template>
  <v-toolbar fixed app :style="getColor" dark height="65px" :class="getClass" clipped >
    <v-toolbar-title>
      <v-avatar tile class="top--logo">
        <img src="~assets/img/web/logo-kopi-taaruf.png" alt="">
      </v-avatar>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat exact nuxt to="/" >Home</v-btn>
      <v-btn flat exact nuxt to="/profil">Profil</v-btn>
      <v-btn flat exact nuxt to="/berita">Berita</v-btn>
      <v-btn flat exact nuxt to="/acara">Acara</v-btn>
      <v-btn flat exact nuxt to="/produk">Produk</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    name: "navbar-website",
    data () {
      return {

      }
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
