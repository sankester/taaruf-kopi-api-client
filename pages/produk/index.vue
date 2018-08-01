<template>
  <div>
    <v-layout>
      <v-flex s12 md12 sm12 lg12 >
        <!--breadcumb-->
        <v-breadcrumbs divider="/">
          <h1>Produk Ta`aruf Kopi</h1>
          <v-spacer></v-spacer>
          <v-breadcrumbs-item nuxt exact v-for="breadcumb in breadcumbs" :key="breadcumb.text" :disabled="breadcumb.disabled" :to="breadcumb.link">
            {{ breadcumb.text }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>
    <v-layout :wrap="isMobile">
      <v-flex xs12 md8 sm12 lg12 class="mx-2 mb-2">
        <v-card>
          <!--layout title-->
          <v-card-title primary-title >
            <v-layout row>
              <h3 class="headline">List Produk</h3>
            </v-layout>
          </v-card-title>
          <v-divider color="teal" class="mx-3"></v-divider>
          <!--form search-->
          <v-card-title>
            <v-form style="width: 100%">
              <v-layout row :wrap="isMobile">
                <v-flex class="layout align-center justify-start md4 lg4 sm4 ">
                  <label>Cari Produk</label>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Nama Produk"
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
          <!--list produk-->
          <v-card-title class="pt-0 mt-0">
            <no-ssr>
              <list-produk :list="listProduk" :loading="loadingButton" :pagination="pagination" @loadMore="loadMore($event)"></list-produk>
            </no-ssr>
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
  // import library
  import axios from 'axios'
  // import component
  import ListProduk from "@/components/website/produk/ListProduk";

  export default {
    name: "website-produk",
    layout: 'website',
    components: {
      ListProduk
    },
    async asyncData({store}) {
      // get data produk
      const res = await axios.get(process.env.BASE_URL + 'public/produk?include=user,files', {
        headers: {'Authorization': "Bearer " + store.getters.getToken}
      }).then((response) => {
        return response.data
      })
      // commit data
      store.commit('setPublicProduk', res.data)
      store.commit('setPublicLastProdukPagination', res.meta.pagination)
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
      listProduk(){
        return this.$store.getters.getListPublicProduk
      },
      // get pagination
      pagination(){
        return this.$store.getters.getPublicProdukPagination
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
      handleScroll() {
        if (process.browser) {
          if (typeof window !== "undefined") {
            let windowsPosition = window.scrollY
            this.isScroll = windowsPosition > 0
          }
        }
      },
      // scroll tu up position
      setUp() {
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
        this.$store.dispatch("loadMoreProduk", link)
          .then(res => {
            // disable loading button
            this.loadingButton = false;
            // update list user
            this.$store.commit("updatePublicListProduk", res.data);
            this.$store.commit("setPublicLastProdukPagination", res.meta.pagination);
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
        this.$store.commit("setPublicKeywordProduk", this.keyword);
        // load data
        this.loadData()
      },
      // initialize data user from API server
      loadData() {
        // show waiting asyncronus loading indicator
        this.$awn.asyncBlock(
          // get data user from API server
          this.$store.dispatch("getPublicListProduk").catch(error => {
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
      titleTemplate: "List Produk - %s",
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
