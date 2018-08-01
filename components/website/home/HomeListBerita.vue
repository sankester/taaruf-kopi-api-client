<template>
  <v-layout :class="(isMobile)? 'pt-0' : 'py-2'" row wrap>
    <v-flex xs12 md4 sm4 lg4 v-for="(berita, index) in list" :key="index">
      <v-card class="ma-3">
        <v-card-media v-if="berita.files.data || berita.files.data.length > 0" class="white--text" :height="(isMobile) ? '150px' :'200px'" :src="berita.files.data[0].file_path+'/thumbnail/'+ berita.files.data[0].file_name">
          <v-container fill-height fluid style="background-color: rgba( 0,0,0,0.5)">
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline" v-text="berita.nama_berita"></span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title :class="(isMobile) ? 'mb-0 pb-0' :''">
          <div>
            <span class="grey--text">
              <v-icon class="mr-1" small color="black">event</v-icon> {{berita.updated_at}}
            </span> &nbsp;|&nbsp;
            <span class="grey--text">
              <v-icon small class="mr-1" color="black">person</v-icon> {{ berita.user.data.nama}}
            </span>
            <br>
            <span>{{berita.isi_berita.replace(/(<([^>]+)>)/ig, '') |  truncate(100)}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat style="color: #d29348" :small="isMobile" nuxt :to="'/berita/' + berita.id">Selengkapnya</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "listBerita",
    props: {
      list : {
        type: Array,
        required: true
      }
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
