<template>
  <v-card class="ma-2 pa-1" small>
    <v-card-media class="white--text" :height="(isMobile) ? '150px' :'200px'" :src="produk.files.data[0].file_path+'/thumbnail/'+ produk.files.data[0].file_name">
    </v-card-media>
    <v-card-title class="mb-0 pb-0" style="background-color: #F5F5F5">
      <div>
        <div class="headline" style="color: #00897B;">
          {{ produk.nama_produk }}
          <small class="label-diskon" v-if="produk.diskon != '0'">Diskon &nbsp;{{ produk.diskon }}</small>
        </div>
        <div class="v-picker--full-width mb-0 pb-0">
          Harga&nbsp;:&nbsp;
          <div :class="getClassHarga(produk)">Rp.&nbsp;{{ produk.harga}}</div>
          <div v-html="getDiskonHarga(produk)"> &nbsp;</div>
        </div>
        <div class="v-picker--full-width ">Stok &nbsp;:&nbsp; {{ produk.stok}}</div>
      </div>
    </v-card-title>
    <v-card-actions style="background-color: #F5F5F5">
      <v-spacer></v-spacer>
      <v-btn flat dark style="color: #1e262a" :small="isMobile" nuxt :to="'/produk/' + produk.id">Detail Produk</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: "detailBerita",
    props: {
      produk : {
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
            return '<div class="ml-1 orange--text" style="font-size: 16px; top: -10px">Rp.' + (harga - hargaDiskon) + '</div'
          }
        }
      },
    }
  }
</script>

<style scoped>
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
