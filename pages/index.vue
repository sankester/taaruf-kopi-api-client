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
    <div style="background-color: #d29348" id="listBerita">
      <v-container>
        <v-layout dark>
          <v-flex xs12>
            <div class="layout align-center justify-center">
              <v-avatar tile class="top--logo ">
                <img src="~assets/img/web/logo-kopi-taaruf.png" alt="">
              </v-avatar>
            </div>
            <h2 class="headline text-xs-center mb-3 text--primary" style="margin-bottom: 0px !important;padding-bottom: 0px !important;">
              <nuxt-link to="/berita" style="text-decoration: none"><span style="color: white">BERITA TERBARU</span></nuxt-link>
            </h2>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <!--LIST BERITA-->
    <v-container>
      <no-ssr>
        <home-list-berita :list="listBerita" />
      </no-ssr>
    </v-container>
    <!--TITLE ACARA-->
    <div style="background-color: #3B8070" id="listAcara">
      <v-container>
        <v-layout dark>
          <v-flex xs12>
            <div class="layout align-center justify-center">
              <v-avatar tile class="top--logo ">
                <img src="~assets/img/web/logo-kopi-taaruf.png" alt="">
              </v-avatar>
            </div>
            <h2 class="headline text-xs-center mb-3 text--primary" style="margin-bottom: 0px !important;padding-bottom: 0px !important;">
              <nuxt-link to="/acara" style="text-decoration: none"><span style="color: white">KEGIATAN TERBARU</span></nuxt-link>
            </h2>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <!--LIST ACARA -->
    <v-container>
      <no-ssr>
        <home-list-acara  :list="listAcara"/>
      </no-ssr>
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
            <h2 class="headline text-xs-center mb-3 text--primary" style="margin-bottom: 0px !important;padding-bottom: 0px !important;">
              <nuxt-link to="/produk" style="text-decoration: none"><span style="color: white">PRODUK TA`RUF KOPI</span></nuxt-link>
            </h2>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <!--LIST PRODUK-->
    <v-container>
      <no-ssr>
        <home-list-produk :list="listProduk" />
      </no-ssr>
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
  // import component
  import HomeListBerita from "@/components/website/home/HomeListBerita";
  import HomeListAcara from "@/components/website/home/HomeListAcara";
  import HomeListProduk from "@/components/website/home/HomeListProduk";

  export default {
    layout: 'website',
    components: {
      HomeListBerita, HomeListAcara, HomeListProduk
    },
    middleware : ['set-host'],
    // async load data
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
      const res = await axios.get(process.env.BASE_URL + 'public/home', {
        headers: headers
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
            src: 'http://api.taaruf-kopi.com/images/slider/slide-1.jpg'
          },
          {
            src: 'http://api.taaruf-kopi.com/images/slider/slide-2.jpg'
          },
          {
            src: 'http://api.taaruf-kopi.com/images/slider/slide-3.jpg'
          },
          {
            src: 'http://api.taaruf-kopi.com/images/slider/slide-4.jpg'
          }
        ],
        isScroll : 0,
        isMobile : false
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
    methods : {
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
            let positionBerita = this.getOffset(document.getElementById("listBerita")).top
            let positionAcara= this.getOffset(document.getElementById("listAcara")).top
            let positionProduk = this.getOffset(document.getElementById("listProduk")).top
            this.isScroll = windowsPosition > positionBerita;
            if(this.isScroll){
              this.$store.commit("setTransparent", false)
              if(windowsPosition > positionBerita && windowsPosition < positionAcara){
                this.$store.commit("setNavbarClasscColor", '#d29348')
              }else if(windowsPosition > positionAcara && windowsPosition < positionProduk){
                this.$store.commit("setNavbarClasscColor", '#3B8070')
              }else if(windowsPosition > positionProduk){
                this.$store.commit("setNavbarClasscColor", '#1e262a')
              }
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
      // call resize screen function
      this.onResize();
      // cek if browser process
      if (process.browser) {
        window.addEventListener("resize", this.onResize, {passive: true});
      }
      this.setTransparent()
      this.$store.commit("setIsHome", true)
    },
    beforeDestroy(){
      if (process.browser) {
        if (typeof window !== "undefined") {
          window.removeEventListener("resize", this.onResize, {passive: true});
        }
      }
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

</style>
