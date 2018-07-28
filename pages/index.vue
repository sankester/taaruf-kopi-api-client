<template>
  <div>
    <!--SLIDER-->
    <div style="background-color: white">
      <v-carousel class="ma-0 pa-0">
        <v-carousel-item
          v-for="(slider,i) in sliders"
          :key="i"
          :src="slider.src"
        ></v-carousel-item>
      </v-carousel>
    </div>
    <!--TITLE BERITA-->
    <div style="background-color: #3B8070" id="listBerita">
      <v-container>
        <v-layout dark>
          <v-flex xs12>
            <div class="layout align-center justify-center">
              <v-avatar tile class="top--logo ">
                <img src="~assets/img/web/logo-kopi-taaruf.png" alt="">
              </v-avatar>
            </div>
            <h2 class="headline text-xs-center mb-3 text--primary" style="margin-bottom: 0px !important;padding-bottom: 0px !important;">
              <span style="color: white">BERITA TERBARU</span>
            </h2>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <!--LIST BERITA-->
    <v-container>
      <v-layout class="py-4" row wrap>
        <v-flex xs12 md4 sm4 lg4 v-for="(berita, index) in listBerita"  :key="index">
          <v-card class="ma-3">
            <v-card-media class="white--text" height="200px" :src="berita.files.data[0].file_path+'/thumbnail/'+ berita.files.data[0].file_name">
              <v-container fill-height fluid style="background-color: rgba( 0,0,0,0.5)">
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox >
                    <span class="headline" v-text="berita.nama_berita" ></span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>
            <v-card-title>
              <div>
                <span class="grey--text">
                  <v-icon class="mr-1" small>event</v-icon> {{berita.updated_at}}
                </span><br>
                <span>{{berita.isi_berita.replace(/(<([^>]+)>)/ig, '') |  truncate(100)}}</span>
              </div>
            </v-card-title>
            <v-card-actions >
              <v-spacer></v-spacer><v-btn flat color="primary">Selengkapnya</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!--TITLE ACARA-->
    <div style="background-color: #d29348" id="listAcara">
      <v-container>
        <v-layout dark>
          <v-flex xs12>
            <div class="layout align-center justify-center">
              <v-avatar tile class="top--logo ">
                <img src="~assets/img/web/logo-kopi-taaruf.png" alt="">
              </v-avatar>
            </div>
            <h2 class="headline text-xs-center mb-3 text--primary"
                style="margin-bottom: 0px !important;padding-bottom: 0px !important;">
              <span style="color: white">KEGIATAN TERBARU</span>
            </h2>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <!--LIST ACARA -->
    <v-container>
      <v-layout class="py-4" row wrap>
        <v-flex xs12 md6 sm6 lg6 v-for="(acara, index) in listAcara" :key="index">
          <v-card>
            <v-card-text class="pa-0">
              <v-container class="pa-0">
                <div class="layout row ma-0">
                  <div class="sm6 xs6 flex">
                    <div style="height: 150px">
                      <v-carousel class="ma-0 pa-0 layout  fill-height" hide-delimiters
                                  style="min-height: 130px; max-height: 350px">
                        <v-carousel-item
                          v-for="(imageAcara,index) in acara.files.data"
                          :key="index"
                          :src="imageAcara.file_path+'/thumbnail/'+ imageAcara.file_name"
                        ></v-carousel-item>
                      </v-carousel>
                    </div>
                  </div>
                  <div class="sm6 xs6 flex fill-height">
                    <v-card style="box-shadow: none !important;" class="mt-0 pa-0 fill-height">
                      <v-card-title primary-title class="mt-1 pt-1">
                        <div>
                          <div class="headline">{{ acara.nama_acara}}</div>
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
                      <v-card-actions style="border: none !important;">
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-btn flat style="color: #d29348">Selengkapnya</v-btn>
                      </v-card-actions>
                    </v-card>
                  </div>
                </div>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!--TITLE PRODUK-->
    <div style="background-color: #1e262a " id="listProduk">
      <v-container>
        <v-layout dark>
          <v-flex xs12>
            <div class="layout align-center justify-center">
              <v-avatar tile class="top--logo ">
                <img src="~assets/img/web/logo-kopi-taaruf.png" alt="">
              </v-avatar>
            </div>
            <h2 class="headline text-xs-center mb-3 text--primary"
                style="margin-bottom: 0px !important;padding-bottom: 0px !important;">
              <span style="color: white">PRODUK TA`RUF KOPI</span>
            </h2>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <!--LIST PRODUK-->
    <v-container>
      <v-layout class="py-4" row wrap>
        <v-flex xs12 md4 sm4 lg4 v-for="(produk, index) in listProduk"  :key="index">
          <v-card class="ma-3" small>
            <v-card-media class="white--text" height="200px" :src="produk.files.data[0].file_path+'/thumbnail/'+ produk.files.data[0].file_name">
            </v-card-media>
            <v-card-title>
              <div>
                <div class="headline">
                  {{ produk.nama_produk }} <small class="label-diskon" v-if="produk.diskon != '0'">Diskon &nbsp;{{ produk.diskon }}</small>
                </div>
                <div class="v-picker--full-width mb-0 pb-0">
                  Harga&nbsp;:&nbsp;
                  <div :class="getClassHarga(produk)">Rp.&nbsp;{{ produk.harga}}</div>
                  <div v-html="getDiskonHarga(produk)"> &nbsp;</div>
                </div>
                <div class="v-picker--full-width ">Stok &nbsp;:&nbsp; {{ produk.stok}}</div>
                <div class="mt-2">
                  Deskripsi : {{produk.deskripsi_produk.replace(/(<([^>]+)>)/ig, '') |  truncate(100)}}
                </div>
              </div>
            </v-card-title>
            <v-card-actions >
              <v-btn flat dark style="color: #1e262a">Detail Produk</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
  import  axios from 'axios';
  export default {
    layout: 'website',
    components: {},
    // async load data
    async asyncData({store}) {
      const res = await axios.get(process.env.BASE_URL + 'home', {
        headers: {'Authorization': "Bearer " + store.getters.getToken}
      }).then((response) => {
        return response.data.data
      })
      // return data
      return {
        listBerita: res.listBerita,
        listAcara: res.listAcara,
        listProduk: res.listProduk,
      }
    },
    data() {
      return {
        sliders: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
          }
        ],
        isScroll : 0
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
    filters: {
      truncate(string, value) {
        if(string.length > value){
          return (string || '').substring(0, value) + '…'
        }
        return (string || '')
      }
    },
    methods : {
      handleScroll () {
        if (process.browser) {
          if (typeof window !== "undefined") {
            let windowsPosition = window.scrollY
            let positionBerita = this.getOffset(document.getElementById("listBerita")).top
            let positionAcara= this.getOffset(document.getElementById("listAcara")).top
            let positionProduk = this.getOffset(document.getElementById("listProduk")).top
            this.isScroll = windowsPosition > 200;
            if(windowsPosition > positionBerita && windowsPosition < positionAcara){
              this.$store.commit("setNavbarClasscColor", '#3B8070')
            }else if(windowsPosition > positionAcara && windowsPosition < positionProduk){
              this.$store.commit("setNavbarClasscColor", '#d29348')
            }else if(windowsPosition > positionProduk){
              this.$store.commit("setNavbarClasscColor", '#1e262a')
            }
            if(this.isScroll){
              this.$store.commit("setTransparent", false)
            }else {
              this.$store.commit("setTransparent", true)
            }
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
            return '<div class="ml-1 orange--text" style="font-size: 16px; top: -10px">Rp.' + (harga - hargaDiskon) + '</div'
          }
        }
      },
      setTransparent(){
        this.$store.commit("setTransparent", true)
      },
      getOffset( el ) {
        let _x = 0;
        let _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
        }
        return { top: _y, left: _x };
      }
    },
    mounted(){
      this.setTransparent()
      this.$store.commit("setIsHome", true)
    },
    beforeDestroy(){
      this.$store.commit("setTransparent", false)
      this.$store.commit("setNavbarClasscColor", '')
      this.$store.commit("setIsHome", false)
    }
  }
</script>

<style>
  /*custom top logo */
  .top--logo {
    width: 165px !important;
    height: 50px !important;
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
