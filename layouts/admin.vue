<template>
  <v-app>
    <!--sidebar-->
    <SideBar :drawer.sync="drawer" :clipped="clipped" :items="items" :miniVariant="miniVariant" :authUser="authUser" @setMini="setMini"/>
    <!--end sidebar-->
    <!--navbar-->
    <NavBar  :drawer.sync="drawer" :clipped="clipped" @setDrawer="setDrawer" @logout="logout"/>
    <!--end navbar-->
    <!-- dinamic content-->
    <v-content>
      <v-container fluid>
        <!--nuxt content-->
        <nuxt/>
      </v-container>
    </v-content>
    <!--footer-->
    <v-footer color="brown darken-1" dark inset app :height="heightFooter">
      <v-card-text>
        <p :class="classFooter"> &copy; Copyright Paguyuban Ta`aruf Kopi 2018 - <i>All Rights Reserved.</i></p>
      </v-card-text>
    </v-footer>
  </v-app>
</template>

<script>
  import NavBar from "../components/backend/general/NavBar";
  import SideBar from "../components/backend/general/SideBar";

  export default {
    name: "admin",
    components: {
      NavBar,
      SideBar
    },
    data() {
      return {
        isMobile: false,
        clipped: true,
        drawer: false,
        miniVariant: false,
        items: [
          {title: 'Dashboard', icon: 'dashboard', to : '/admin/dashboard'},
          {title: 'Olah Berita', icon: 'web', to : '/admin/berita'},
          {title: 'Olah Acara', icon: 'event', to : '/admin/acara'},
          {title: 'Olah Produk', icon: 'shopping_basket', to : '/admin/produk'},
          {title: 'Olah Profil', icon: 'book', to : '/admin/profil'},
          {title: 'Olah User', icon: 'group', to : '/admin/user'},
        ]
      }
    },
    methods : {
      // set drawer
      setDrawer(){
        this.drawer = !this.drawer
      },
      // set mini variant
      setMini(){
        this.miniVariant = ! this.miniVariant
      },
      // logout from admin area
      logout(){
        // clear data login
        this.$store.dispatch('logout', true)
        // redirect
        this.$router.push('/admin/auth')
      },
      // resize
      onResize () {
        if (process.browser) {
          this.isMobile = window.innerWidth < 600
        }
      }
    },
    computed : {
      // get auth user data
      authUser(){
        return this.$store.getters.getAuthUser
      },
      // get class footer
      classFooter() {
        let footerClass = this.isMobile ? 'text-sm-center ma-1' : 'text-md-center ma-1'
        return footerClass
      },
      heightFooter() {
        let footerHeigh= this.isMobile ? '50px' : '32px'
        return footerHeigh
      }
    },
    created(){

    },
    mounted () {
      this.onResize()
      if (process.browser) {
        window.addEventListener('resize', this.onResize, {passive: true})
      }
      if(this.isMobile){
        this.drawer = false
      }else{
        this.drawer = true
      }
      // init auth user
      if(this.$store.getters.getAuthUser.nama == null){
        this.$store.dispatch('getAuthUser')
      }
    },
    beforeDestroy () {
      if (process.browser) {
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', this.onResize, { passive: true })
        }
      }
    }
  }
</script>

<style scoped>

</style>
