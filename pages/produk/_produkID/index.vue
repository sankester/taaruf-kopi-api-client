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
      <v-flex xs12 md12 sm12 lg12 class="mx-2 mb-2">
        <v-card>
          <!--layout title-->
          <v-card-title primary-title >
            <v-layout row>
              <h3 class="headline">Detail {{ produk.nama_produk }}</h3>
            </v-layout>
          </v-card-title>
          <v-divider color="teal" class="mx-3"></v-divider>
          <v-card-title>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm12 md6 lg6>
                  <v-carousel
                    lass="ma-0 pa-0"
                    hide-delimiters
                    :style="(isMobile) ? 'max-height: 350px':''"
                    :hide-controls="hideControll"
                  >
                    <v-carousel-item
                      v-for="(image,i) in produk.files.data"
                      :key="i"
                      :src="image.file_path+'/'+ image.file_name"
                      class="c-corousel"
                    ></v-carousel-item>
                  </v-carousel>
                </v-flex>
                <v-flex xs12 sm12 md6 lg6 row :class="(isMobile) ? 'mt-3':'px-3'">
                  <div class="headline" style="color: #00897B; font-size: 35px !important; font-weight: bold">
                    {{ produk.nama_produk }}
                  </div>
                  <v-divider color="teal" class="mt-3"></v-divider>
                  <div class="ml-0">
                    <v-btn flat color="error" small v-if="produk.diskon != '0'" class="ml-0 pk-0">
                      <v-icon class="mr-2 ml-0" small>local_offer</v-icon>  Diskon &nbsp;{{ produk.diskon }}
                    </v-btn> &nbsp;|&nbsp;
                    <v-btn flat color="info" small v-if="produk.diskon != '0'">
                      <v-icon class="mr-2" small>storage</v-icon>  Stok &nbsp; {{ produk.stok}}
                    </v-btn>
                  </div>
                  <div v-html="produk.deskripsi_produk" class="my-1" style="font-size: 20px !important;">
                  </div>

                  <div class="v-picker--full-width mb-0 pb-0" style="font-size: 25px; line-height: 30px">
                    <div :class="getClassHarga(produk)">Rp.&nbsp;{{ produk.harga}}</div>
                    <div v-html="getDiskonHarga(produk)"> &nbsp;</div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-title>
        </v-card>
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

  export default {
    name: "DetailProduk",
    layout: 'website',
    async asyncData({params,store}) {
      // get data produk
      const res = await axios.get(process.env.BASE_URL + 'public/produk/' + params.produkID +'?include=user,files', {
        headers: {'Authorization': "Bearer " + store.getters.getToken}
      }).then((response) => {
        return response.data
      })
      // response data
      return {
        produk : res.data
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
          text: "Produk",
          disabled: false,
          link: "/produk"
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
        if(this.produk.files.data.length == 1){
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
      getClassHarga(produk){
        if(produk.diskon != '0'){
          return 'grey--text line-through'
        }
      },
      getDiskonHarga(produk){
        if (process.browser) {
          if (produk.diskon != '0') {
            let diskon = parseInt(produk.diskon.replace(/(%)/ig, ''))
            let harga = parseInt(produk.harga)
            let hargaDiskon = harga * diskon / 100;
            return '<div class="ml-1 success--text" style="font-size: 25px; top: -10px; position: relative">Rp.' + (harga - hargaDiskon) + '</div'
          }
        }
      },
    },
    head(){
      return{
        titleTemplate: this.produk.nama_produk + " - %s",
        meta: [
          {charset: "utf-8"},
          {name: "viewport", content: "width=device-width, initial-scale=1"},
          {hid: "description", name: "description", content: "Meta description"}
        ]
      }
    }
  }
</script>

<style>
  .c-corousel .v-jumbotron__wrapper img{
    width: 100% !important;
    height: auto !important;
    top: 70% !important;
  }

  .line-through{
    text-decoration: line-through;
  }
  .label-diskon{
    color: white;
    background-color: red;
    position: relative;
    top: -10px;
    border-radius: 4px;
    padding: 2px;
    font-size: 12px;
  }
</style>
