<template>
  <div>
    <v-layout>
      <v-flex s12 md12 sm12 lg12 >
        <!--breadcumb-->
        <v-breadcrumbs divider="/">
          <h1>Berita Ta`aruf Kopi</h1>
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
              <h3 class="headline">{{ berita.nama_berita }}</h3>
            </v-layout>
          </v-card-title>
          <v-divider color="teal" class="mx-3"></v-divider>
          <v-card-title>
            <v-carousel class="ma-0 pa-0" hide-delimiters :style="(isMobile) ? 'max-height: 200px':''">
              <v-carousel-item
                v-for="(image,i) in berita.files.data"
                :key="i"
                :src="image.file_path+'/'+ image.file_name"
                :hide-controls="hideControll"
              ></v-carousel-item>
            </v-carousel>
          </v-card-title>
          <v-card-title>
            <v-icon class="mr-2" :small="isMobile">event</v-icon> {{ berita.updated_at }} |<v-icon :small="isMobile" class="mr-2 ml-1">person</v-icon>{{ berita.user.data.nama }}
          </v-card-title>
          <v-card-title v-html="berita.isi_berita"></v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 md4 sm12 lg4 class="mx-2 mb-2">
        <sidebar-acara />
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
  import SidebarAcara from "@/components/website/sidebar/SidebarAcara";
  import SidebarProduk from "@/components/website/sidebar/SidebarProduk";

  export default {
    name: "DetailBerita",
    layout: 'website',
    components : {
      SidebarAcara, SidebarProduk
    },
    middleware : ['set-host'],
    async asyncData(context) {
      // set headers
      let headers = {
        'Authorization': "Bearer " + context.store.getters.getToken,
      }
      // cek proses
      if (process.server){
        // get host cors
        let corsHost = context.store.getters.getCorsHost
        // add cors host to header
        headers = {...headers, "Origin": corsHost}
      }
      // get data berita
      const res = await axios.get(process.env.BASE_URL + 'public/berita/' + context.params.beritaID +'?include=user,files', {
        headers: headers
      }).then((response) => {
        return response.data
      })
      // get sidebar acara
      const resAcara = await axios.get(process.env.BASE_URL + 'public/acara/limit/3', {
        headers: headers
      }).then((response) => {
        return response.data
      })
      // get sidebar produk
      const resProduk = await axios.get(process.env.BASE_URL + 'public/produk/limit/3', {
        headers: headers
      }).then((response) => {
        return response.data
      })
      // set data sidebar
      context.store.commit('setSidebarAcara', resAcara.data)
      context.store.commit('setSidebarProduk', resProduk.data)
      // response data
      return {
        berita : res.data
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
          text: "Berita",
          disabled: false,
          link: "/berita"
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
      title : 'woooo'
    }),
    computed : {
      // hide controll
      hideControll(){
        if(this.berita.files.data.length == 1){
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
      return{
        titleTemplate: this.berita.nama_berita + " - %s",
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
