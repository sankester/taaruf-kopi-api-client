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
              <h3 class="headline">List Acara</h3>
            </v-layout>
          </v-card-title>
          <v-divider color="teal" class="mx-3"></v-divider>
          <!--form search-->
          <v-card-title>
            <v-form style="width: 100%">
              <v-layout row :wrap="isMobile">
                <v-flex class="layout align-center justify-start md4 lg4 sm4 ">
                  <label>Cari Acara</label>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Nama Acara"
                    v-model="keyword"
                  ></v-text-field>
                </v-flex>
                <v-flex class="layout align-center justify-start xs12">
                  <v-btn dark color="success" :small="isMobile" @click="search()">
                    <v-icon dark>search</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-title>
          <!--list berita-->
          <v-card-title>
            <no-ssr>
              <list-acara :list="listAcara" :pagination="pagination" @loadMore="loadMore($event)" :loading="loadingButton" v-if="listAcara.length > 0"/>
            </no-ssr>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 md4 sm12 lg4 class="mx-2 mb-2">
        <sidebar-produk />
        <no-ssr>
          <sidebar-berita />
        </no-ssr>
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
  // import library
  import axios from 'axios'
  // import component
  import ListAcara from "@/components/website/acara/ListAcara";
  import SidebarProduk from "@/components/website/sidebar/SidebarProduk";
  import SidebarBerita from "@/components/website/sidebar/SidebarBerita";

  export default {
    name: "website-acara",
    layout: 'website',
    components : {
      ListAcara, SidebarProduk, SidebarBerita
    },
    async asyncData({store}) {
      // get data acara
      const res = await axios.get(process.env.BASE_URL + 'public/acara?include=user,files', {
        headers: {'Authorization': "Bearer " + store.getters.getToken}
      }).then((response) => {
        return response.data
      })
      // get sidebar berita
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
      // commit data
      store.commit('setPublicAcara', res.data)
      store.commit('setPublicLastAcaraPagination', res.meta.pagination)
      // set data sidebar
      store.commit('setSidebarBerita', resBerita.data)
      store.commit('setSidebarProduk', resProduk.data)
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
          disabled: true
        }
      ],
      // mobile status
      isMobile: false,
      // loading button
      loadingButton : false,
      // keyword search
      keyword: "",
      // cek scroll
      isScroll : 0,
    }),
    computed : {
      // get list berita
      listAcara(){
        return this.$store.getters.getListPublicAcara
      },
      // get pagination
      pagination(){
        return this.$store.getters.getPublicAcaraPagination
      },
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
      // handle on scroll mouse
      handleScroll () {
        // cek process in browser
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
      // load more
      loadMore(link) {
        // show loading button
        this.loadingButton = true;
        // get more  user from API server
        this.$store.dispatch("loadMoreAcara", link)
          .then(res => {
            // disable loading button
            this.loadingButton = false;
            // update list user
            this.$store.commit("updatePublicListAcara", res.data);
            this.$store.commit("setPublicLastAcaraPagination", res.meta.pagination);
          })
          .catch(error => {
            // disable loading button
            this.loadingButton = false;
            // default error message
            let errorMessage = "Gagal mengambil data";
            // cek response error
            if (error.response) {
              // set 401 error message
              if (error.response.status == 401) {
                errorMessage = "<h4>Anda tidak mempunyai akses.</h4>";
              } else if(error.response.status == 405){
                // get error data
                errorMessage = '<h4>Method tidak diperbolehkan.</h4>'
              } else{
                // set server error message
                errorMessage = "<h4>Server sedang jalan-jalan.</h4>";
              }
            }
            // show error message
            this.$awn.alert(errorMessage);
          });
      },
      // search item in API server
      search() {
        // set keyword search user
        this.$store.commit("setPublicKeywordAcara", this.keyword);
        // load data
        this.loadData()
      },
      // initialize data user from API server
      loadData() {
        // show waiting asyncronus loading indicator
        this.$awn.asyncBlock(
          // get data user from API server
          this.$store.dispatch("getPublicListAcara").catch(error => {
            // default error message
            let errorMessage = "Gagal mengambil data";
            // cek response error
            if (error.response) {
              // set 401 error message
              if (error.response.status == 401) {
                errorMessage = "<h4>Anda tidak mempunyai akses.</h4>";
              } else if(error.response.status == 405){
                // get error data
                errorMessage = '<h4>Method tidak diperbolehkan.</h4>'
              } else{
                // set server error message
                errorMessage = "<h4>Server sedang jalan-jalan.</h4>";
              }
            }
            // show error message
            this.$awn.alert(errorMessage);
          })
        );
      },
    },
    head: {
      titleTemplate: "List Acara - %s",
      meta: [
        {charset: "utf-8"},
        {name: "viewport", content: "width=device-width, initial-scale=1"},
        {hid: "description", name: "description", content: "Meta description"}
      ]
    }
  }
</script>

<style scoped>

</style>
