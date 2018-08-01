<template>
  <v-card class="mb-3">
    <v-card-title primary-title class="mb-0 pb-0">
      <v-layout row class="align-center">
        <h3 class="text-md-right">Profil Ta`aruf Kopi</h3>
        <v-spacer></v-spacer>
      </v-layout>
    </v-card-title>
    <v-divider color="teal" class="mx-3"></v-divider>
    <v-card-title class="mt-0 pt-1">
      <v-layout column>
        <v-flex xs12 class="mt-2">
          <v-list>
            <v-list-tile exact nuxt :to="'/profil/'+ profil.id" v-for="(profil ,index) in dataProfil" :key="index">
              <v-list-tile-title>{{profil.nama_profil}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-card-title>
  </v-card>
</template>

<script>
  export default {
    name: "SidebarProfil",
    computed : {
      // get data sidebar
      dataProfil(){
        return this.$store.getters.getListPublicProfil
      },
    },
    data(){
      return {
        isMobile : false
      }
    },
    mounted() {
      // call resize screen function
      this.onResize();
      // cek if browser process
      if (process.browser) {
        window.addEventListener("resize", this.onResize, {passive: true});
      }
    },
    beforeDestroy() {
      if (process.browser) {
        if (typeof window !== "undefined") {
          window.removeEventListener("resize", this.onResize, {passive: true});
        }
      }
    },
    methods: {
      // resize screen
      onResize() {
        if (process.browser) {
          this.isMobile = window.innerWidth < 600;
        }
      },
    }
  }
</script>

<style scoped>

</style>
