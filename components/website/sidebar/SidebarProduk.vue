<template>
  <v-card class="mb-3">
    <v-card-title primary-title class="mb-0 pb-0">
      <v-layout row class="align-center">
        <h3 class="text-md-right">Produk Terbaru</h3>
        <v-spacer></v-spacer>
        <v-btn small dark color="info" nuxt to="/produk">
          <v-icon small dark  class="mr-1">list</v-icon> List Produk
        </v-btn>
      </v-layout>
    </v-card-title>
    <v-divider color="teal" class="mx-3"></v-divider>
    <v-card-title class="mt-0 pt-1">
      <v-layout column>
        <v-flex xs12 v-for="(produk, index) in getSidebarProduk" :key="index" class="mt-2">
          <v-card class="fill-height">
            <v-layout>
              <v-flex xs5 class="pt-1 ml-1">
                <v-card-media
                  v-if="produk.files.data || produk.files.data.length > 0" class="white--text" height="100px"
                  :src="produk.files.data[0].file_path+'/thumbnail/'+ produk.files.data[0].file_name"
                ></v-card-media>
              </v-flex>
              <v-flex xs7>
                <v-card-title primary-title class="my-1 py-0 ">
                  <div style="width: 100% !important;">
                    <div>
                      <b>{{ produk.nama_produk }} <small class="label-diskon" v-if="produk.diskon != '0'">Diskon &nbsp;{{ produk.diskon }}</small></b>
                    </div>
                    <div>
                      <small>  Harga&nbsp;:&nbsp; </small><small :class="getClassHarga(produk)">Rp.&nbsp;{{ produk.harga}}</small>
                      <small v-html="getDiskonHarga(produk)"> &nbsp;</small>
                    </div>
                    <div><small> Stok &nbsp;:&nbsp; {{ produk.stok}}</small></div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat small nuxt :to="'/produk/' + produk.id">Selengkapnya</v-btn>
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
      getSidebarProduk(){
        return this.$store.getters.getSidebarProduk
      }
    },
    methods : {
      // resize screen
      onResize() {
        if (process.browser) {
          this.isMobile = window.innerWidth < 600;
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
            return '<small class="ml-1 orange--text" style="font-size: 12px; top: -2px; position: relative">Rp.' + (harga - hargaDiskon) + '</small>'
          }
        }
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
  }
</script>

<style scoped>
  .line-through{
    text-decoration: line-through;
  }
  .label-diskon{
    color: white;
    background-color: red;
    border-radius: 4px;
    padding: 2px;
    font-size: 8px;
  }
</style>
