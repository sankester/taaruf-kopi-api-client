<template>
  <v-app light>
    <NavBar/>
    <v-content :class="getClassContent">
      <!--nuxt content-->
      <nuxt/>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
  // import component
  import NavBar from "../components/website/NavBar";
  import Footer from "../components/website/Footer";

  export default {
    name: "website",
    components: {Footer, NavBar},
    component: {
      NavBar, Footer
    },
    computed: {
      getClassContent() {
        if (this.$store.getters.getIsHome) {
          return 'mt-0 pt-0'
        }
        return ''
      }
    }
  }
</script>

<style scoped>

</style>
