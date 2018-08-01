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
              <h3 class="headline">List Berita</h3>
            </v-layout>
          </v-card-title>
          <v-divider color="teal" class="mx-3"></v-divider>
          <!--form search-->
          <v-card-title>
            <v-form style="width: 100%">
              <v-layout row :wrap="isMobile">
                <v-flex class="layout align-center justify-start md4 lg4 sm4 ">
                  <label>Cari Berita</label>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Judul Berita"
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
              <ListBerita :list="listBerita" :pagination="pagination" @loadMore="loadMore($event)" :loading="loadingButton" v-if="listBerita.length > 0"/>
            </no-ssr>
          </v-card-title>
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
  // import library
  import axios from 'axios'
  // import component
  import ListBerita from "@/components/website/berita/ListBerita";
  import SidebarAcara from "@/components/website/sidebar/SidebarAcara";
  import SidebarProduk from "@/components/website/sidebar/SidebarProduk";

  export default {
    name: "website-berita",
    layout: 'website',
    components : {
      ListBerita, SidebarAcara, SidebarProduk
    },
    async asyncData({store}) {
      // get data berita
      const res = await axios.get(process.env.BASE_URL + 'public/berita?include=user,files', {
        headers: {'Authorization': "Bearer " + store.getters.getToken}
      }).then((response) => {
        return response.data
      })
      // get sidebar acara
      const resAcara = await axios.get(process.env.BASE_URL + 'public/acara/limit/3', {
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
      store.commit('setPublicBerita', res.data)
      store.commit('setPublicLastBeritaPagination', res.meta.pagination)
      // set data sidebar
      store.commit('setSidebarAcara', resAcara.data)
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
          text: "Berita",
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
      listBerita(){
        return this.$store.getters.getListPublicBerita
      },
      // get pagination
      pagination(){
        return this.$store.getters.getPublicBeritaPagination
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
      // load more
      loadMore(link) {
        // show loading button
        this.loadingButton = true;
        // get more  user from API server
        this.$store.dispatch("loadMoreBerita", link)
          .then(res => {
            // disable loading button
            this.loadingButton = false;
            // update list user
            this.$store.commit("updatePublicListBerita", res.data);
            this.$store.commit("setPublicLastBeritaPagination", res.meta.pagination);
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
        this.$store.commit("setPublicKeywordBerita", this.keyword);
        // load data
        this.loadData()
      },
      // initialize data user from API server
      loadData() {
        // show waiting asyncronus loading indicator
        this.$awn.asyncBlock(
          // get data user from API server
          this.$store.dispatch("getPublicListBerita").catch(error => {
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
      titleTemplate: "List Berita - %s",
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
