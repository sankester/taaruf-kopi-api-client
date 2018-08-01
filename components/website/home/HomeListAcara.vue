<template>
  <v-layout class="py-2" row wrap>
    <v-flex xs12 md6 sm6 lg6 v-for="(acara, index) in list" :key="index">
      <v-card class="mx-2">
        <v-card-text class="pa-0">
          <v-container class="pa-0">
            <v-layout row class="ma-0" :wrap="isMobile">
              <div class="sm6 xs12 flex">
                <div style="height: 150px">
                  <v-carousel class="ma-0 pa-0 layout  fill-height" hide-delimiters style="min-height: 130px; max-height: 350px">
                    <v-carousel-item
                      v-for="(imageAcara,index) in acara.files.data"
                      :key="index"
                      :src="imageAcara.file_path+'/thumbnail/'+ imageAcara.file_name"
                      :hide-controls="hideControll(acara.files.data.length)"
                    ></v-carousel-item>
                  </v-carousel>
                </div>
              </div>
              <div class="sm6 xs12 flex fill-height">
                <v-card style="box-shadow: none !important;" class="mt-0 pa-0 fill-height">
                  <v-card-title primary-title :class="(isMobile) ? 'mb-0 pb-0' :'mt-1 pt-1'">
                    <div>
                      <div class="headline">{{ acara.nama_acara}}</div>
                      <span class="grey--text"><v-icon small color="primary" class="mr-2">event</v-icon>{{ acara.tanggal_acara_label}}</span>
                      <br>
                      <span class="grey--text"><v-icon small color="info" class="mr-2">access_time</v-icon>{{ acara.jam_acara}}</span>
                      <br>
                      <span class="grey--text"><v-icon small color="red" class="mr-2">place</v-icon>{{ acara.tempat_acara}}</span>
                      <br>
                      <no-ssr>
                        <p>
                          <v-icon small color="red" class="mr-2">web</v-icon>
                          {{ acara.deskripsi_acara.replace(/(<([^>]+)>)/ig, '') | truncate(100)}}
                        </p>
                      </no-ssr>
                    </div>
                  </v-card-title>
                  <v-card-actions style="border: none !important;">
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-btn flat style="color: #3B8070" nuxt :to="'/acara/' + acara.id">Selengkapnya</v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "HomeListAcara",
    props: {
      list: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        isMobile: false
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
      // hide controll
      hideControll(acara){
        if(acara == 1){
          return true
        }
        return false
      }
    }
  }
</script>

<style scoped>

</style>
