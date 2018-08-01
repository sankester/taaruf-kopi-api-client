<template>
  <div>
    <v-layout>
      <v-flex s12 md12 sm12 lg12 >
        <!--breadcumb-->
        <v-breadcrumbs divider="/">
          <h1>Acara Ta`aruf Kopi</h1>
          <v-spacer></v-spacer>
          <v-breadcrumbs-item nuxt exact v-for="breadcumb in breadcumbs" :key="breadcumb.text" :disabled="breadcumb.disabled" :to="breadcumb.link">
            {{ breadcumb.text }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>
    <v-layout :wrap="isMobile">
      <v-flex xs12 md8 sm12 lg8 class="mx-2 mb-2">
        <v-card>
          <!--layout title-->
          <v-card-title primary-title >
            <v-layout row>
              <h3 class="headline">{{ acara.nama_acara }}</h3>
            </v-layout>
          </v-card-title>
          <v-divider color="teal" class="mx-3"></v-divider>
          <v-card-title>
            <v-carousel class="ma-0 pa-0" hide-delimiters :style="(isMobile) ? 'max-height: 200px':''">
              <v-carousel-item
                v-for="(image,i) in acara.files.data"
                :key="i"
                :src="image.file_path+'/'+ image.file_name"
                :hide-controls="hideControll"
              ></v-carousel-item>
            </v-carousel>
          </v-card-title>
          <v-card-title>
            <v-layout row wrap>
              <v-flex lg12 md12 sm12 xs12>
                <v-icon small color="primary" class="mr-2">event</v-icon>Tanggal Acara : {{ acara.tanggal_acara_label}}
              </v-flex>
              <v-flex lg12 md12 sm12 xs12>
                <v-icon small color="info" class="mr-2">access_time</v-icon>Jam Acara : {{ acara.jam_acara}}
              </v-flex>
              <v-flex lg12 md12 sm12 xs12>
                <v-icon small color="red" class="mr-2">place</v-icon>Tempat Acara : {{ acara.tempat_acara}}
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-title v-html="acara.deskripsi_acara"></v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 md4 sm12 lg4 class="mx-2 mb-2">
        <no-ssr>
          <sidebar-berita />
        </no-ssr>
        <sidebar-produk />
      </v-flex>
    </v-layout>
    <!--FOLATING BUTTON-->
    <v-card-text style="position: relative" v-if="isScroll">
      <v-fab-transition>
        <v-btn @click="setUp()" color="brown" class="mb-5" large dark fab fixed bottom right>
          <v-icon>keyboard_arrow_up</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
  </div>
</template>

<script>
  // import component
  import axios from 'axios'
  // import component
  import SidebarBerita from "@/components/website/sidebar/SidebarBerita";
  import SidebarProduk from "@/components/website/sidebar/SidebarProduk";

  export default {
    name: "DetailAcara",
    layout: 'website',
    components : {
      SidebarBerita, SidebarProduk
    },
    async asyncData({params,store}) {
      // get data acara
      const res = await axios.get(process.env.BASE_URL + 'public/acara/' + params.acaraID +'?include=user,files', {
        headers: {'Authorization': "Bearer " + store.getters.getToken}
      }).then((response) => {
        return response.data
      })
      // get sidebar acara
      const resBerita = await axios.get(process.env.BASE_URL + 'public/berita/limit/3', {
        headers: {'Authorization': "Bearer " + store.getters.getToken}
      }).then((response) => {
        return response.data
      })
      // get sidebar produk
      const resProduk = await axios.get(process.env.BASE_URL + 'public/produk/limit/3', {
        headers: {'Authorization': "Bearer " + store.getters.getToken}
      }).then((response) => {
        return response.data
      })
      // set data sidebar
      store.commit('setSidebarBerita', resBerita.data)
      store.commit('setSidebarProduk', resProduk.data)
      // response data
      return {
        acara : res.data
      }
    },
    data: () => ({
      // breadcumb data
      breadcumbs: [
        {
          text: "Home",
          disabled: false,
          link: "/"
        },
        {
          text: "Acara",
          disabled: false,
          link: "/acara"
        },
        {
          text: "Detail",
          disabled: true
        }
      ],
      // mobile status
      isMobile: false,
      // loading button
      loadingButton: false,
      // keyword search
      keyword: "",
      // cek scroll
      isScroll: 0,
    }),
    computed : {
      // hide controll
      hideControll(){
        if(this.acara.files.data.length == 1){
          return true
        }
        return false
      }
    },
    created () {
      if (process.browser) {
        if (typeof window !== "undefined") {
          window.addEventListener('scroll', this.handleScroll);
        }
      }
    },
    destroyed() {
      if (process.browser) {
        if (typeof window !== "undefined") {
          window.removeEventListener('scroll', this.handleScroll);
        }
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
      handleScroll () {
        if (process.browser) {
          if (typeof window !== "undefined") {
            let windowsPosition = window.scrollY
            this.isScroll = windowsPosition > 0
          }
        }
      },
      // scroll tu up position
      setUp(){
        if (process.browser) {
          if (typeof window !== "undefined") {
            this.isScroll = false;
            window.scrollTo(0, 0)
          }
        }
      },
    },
    head(){
      return {
        titleTemplate: this.acara.nama_acara + " - %s",
        meta: [
          {charset: "utf-8"},
          {name: "viewport", content: "width=device-width, initial-scale=1"},
          {hid: "description", name: "description", content: "Meta description"}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
