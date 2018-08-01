<template>
  <v-card>
    <v-layout>
      <v-flex xs5>
        <v-card-media v-if="acara.files.data || acara.files.data.length > 0"  class="white--text" :height="(isMobile)? '100px' : '200px'" :src="acara.files.data[0].file_path+'/thumbnail/'+ acara.files.data[0].file_name"></v-card-media>
      </v-flex>
      <v-flex xs7>
        <v-card-title primary-title :class="(isMobile) ? ' mt-0 pt-0 mb-0 pb-0': 'mx-2 mt-0 pt-0'">
          <div>
            <div :class="(isMobile) ? '': 'headline'">{{ acara.nama_acara}}</div>
            <span class="grey--text"><v-icon small color="primary" class="mr-2">event</v-icon>{{ acara.tanggal_acara_label}}</span>
            <br>
            <span class="grey--text"><v-icon small color="info" class="mr-2">access_time</v-icon>{{ acara.jam_acara}}</span>
            <br>
            <span class="grey--text"><v-icon small color="red" class="mr-2">place</v-icon>{{ acara.tempat_acara}}</span>
            <br>
            <p>
              <v-icon small color="red" class="mr-2">web</v-icon>
              {{ acara.deskripsi_acara.replace(/(<([^>]+)>)/ig, '') | truncate(100)}}
            </p>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat :small="isMobile"  nuxt :to="'/acara/' + acara.id">Selengkapnya</v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    name: "detailBerita",
    props: {
      acara : {
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
