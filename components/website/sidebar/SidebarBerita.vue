<template>
  <v-card class="mb-3">
    <v-card-title primary-title class="mb-0 pb-0">
      <v-layout row class="align-center">
        <h3 class="text-md-right">Berita Terbaru</h3>
        <v-spacer></v-spacer>
        <v-btn small dark color="info" nuxt to="/berita">
          <v-icon small dark  class="mr-1">list</v-icon> List Berita
        </v-btn>
      </v-layout>
    </v-card-title>
    <v-divider color="teal" class="mx-3"></v-divider>
    <v-card-title class="mt-0 pt-1">
      <v-layout column>
        <v-flex xs12 v-for="(berita, index) in getSidebarBerita" :key="index" class="mt-2">
          <v-card class="fill-height">
            <v-layout>
              <v-flex xs5 class="pt-1 ml-1">
                <v-card-media
                  v-if="berita.files.data || berita.files.data.length > 0" class="white--text" height="100px"
                  :src="berita.files.data[0].file_path+'/thumbnail/'+ berita.files.data[0].file_name"
                ></v-card-media>
              </v-flex>
              <v-flex xs7>
                <v-card-title primary-title class="my-0 py-0 ">
                  <div>
                    <div><b>{{ berita.nama_berita}}</b></div>
                    <div>
                      <small>
                        <v-icon small class="mr-1" color="info">event</v-icon>
                        {{ berita.updated_at}}
                      </small>
                    </div>
                    <div>
                      <small>
                        <v-icon small class="mr-1" color="red">person</v-icon>
                        {{ berita.user.data.nama}}
                      </small>
                    </div>
                    <div>
                      <p :class="(isMobile) ? 'mb-0 pb-0': ''">
                        {{ berita.isi_berita.replace(/(<([^>]+)>)/ig, '') | truncate(100) }}
                      </p>
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat :small="isMobile"  nuxt :to="'/berita/' + berita.id">Selengkapnya</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-title>
  </v-card>
</template>

<script>
  export default {
    name: "SidebarAcara",
    computed : {
      // get data sidebar
      getSidebarBerita(){
        return this.$store.getters.getSidebarBerita
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
