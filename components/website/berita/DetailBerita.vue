<template>
  <v-card>
    <v-layout>
      <v-flex xs5>
        <v-card-media v-if="berita.files.data || berita.files.data.length > 0"  class="white--text" :height="(isMobile)? '100px' : '200px'" :src="berita.files.data[0].file_path+'/thumbnail/'+ berita.files.data[0].file_name"></v-card-media>
      </v-flex>
      <v-flex xs7>
        <v-card-title primary-title :class="(isMobile) ? ' mt-0 pt-0 mb-0 pb-0': 'mx-2 mt-0 pt-0'">
          <div>
            <div :class="(isMobile) ? '': 'headline'">{{ berita.nama_berita}}</div>
            <div>
              <small>
                <v-icon small class="mr-1" color="info">event</v-icon>
                {{ berita.updated_at}}
              </small>
              |
              <small>
                <v-icon small class="mr-1" color="red">person</v-icon>
                {{ berita.user.data.nama}}
              </small>
            </div>
            <div>
                <p :class="(isMobile) ? 'mb-0 pb-0': ''">{{ berita.isi_berita| strip_tag | truncate(100) }}</p>
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
</template>

<script>
  export default {
    name: "detailBerita",
    props: {
      berita : {
        type : Object,
        required : true
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
