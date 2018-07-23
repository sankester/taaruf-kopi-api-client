<template>
  <v-layout row wrap>
    <v-flex xs12>
      <!--breadcumb-->
      <v-breadcrumbs divider="/">
        <h1>Manajemen Produk</h1>
        <v-spacer></v-spacer>
        <v-breadcrumbs-item nuxt exact v-for="breadcumb in breadcumbs" :key="breadcumb.text" :disabled="breadcumb.disabled" :to="breadcumb.link">
          {{ breadcumb.text }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <!--content-->
      <v-card style="min-height: 250px !important;">
        <!--alert-->
        <v-alert dismissible v-model="alert.status" :type="alert.type">
          {{ alert.message }}
          <ul>
            <template v-for="(items, index) in alert.errors">
              <template v-for="item in items">
                <li>
                  {{item}}
                </li>
              </template>
            </template>
          </ul>
        </v-alert>
        <!--header-->
        <v-toolbar dark color="primary">
          <v-toolbar-title class="white--text">List Produk</v-toolbar-title>
          <v-spacer></v-spacer>
          <!--button add-->
          <v-btn nuxt to="/admin/produk/new" outline round dark v-if="!isMobile">
            <v-icon>add</v-icon> Tambah Produk
          </v-btn>
        </v-toolbar>
        <!--floating add button-->
        <v-card-text style="position: relative" v-if="isMobile">
          <v-fab-transition>
            <v-btn nuxt to="/admin/produk/new" color="success" class="mb-5" dark fab fixed bottom right>
              <v-icon>add</v-icon>
              <v-icon>close</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>
        <v-container fluid>
          <i class="fa fa-times"></i>
          <v-form>
            <v-layout row>
              <v-flex xs6 sm6 md4>
                <v-text-field
                  v-model="keyword"
                  label="Nama Produk"
                ></v-text-field>
              </v-flex>
              <v-flex xs6 sm6 md4>
                <v-btn fab dark color="success" :small="isMobile" @click="search">
                  <v-icon>search</v-icon>
                </v-btn>
                <v-btn fab :small="isMobile" @click="resetSearch">
                  <v-icon>settings_backup_restore</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
          <!--show list user-->
          <ProdukList @delete="deleteProduk($event)" :headers="produkHeaders" :list="produkList" :loading="loadingButton" :pagination="pagination" @reload="initialize" @loadMore="loadMore"/>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  // impoer component
  import ProdukList from "@/components/backend/produk/ProdukList";

  export default {
    name: "produk",
    layout: "admin",
    middleware: ["check-auth", "auth"],
    components: {
      ProdukList
    },
    data() {
      return {
        // mobile status
        isMobile: false,
        // breadcumb data
        breadcumbs: [
          {
            text: "Dashboard",
            disabled: false,
            link: "/admin"
          },
          {
            text: "Produk",
            disabled: true
          }
        ],
        loadingButton: false,
        keyword: "",
        alert: {
          type: "error",
          status: false,
          message: "",
          errors: []
        }
      };
    },
    computed: {
      // get list user
      produkList() {
        return this.$store.getters.getListProduk;
      },
      // set user table headers
      produkHeaders() {
        return this.$store.getters.getProdukTableHeaders;
      },
      // get pagination data
      pagination() {
        return this.$store.getters.getProdukPagination;
      }
    },
    mounted() {
      // call resize screen function
      this.onResize();
      // cek if browser process
      if (process.browser) {
        window.addEventListener("resize", this.onResize, {passive: true});
      }
      // call initialize data function
      this.initialize();
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
      // initialize data user from API server
      initialize() {
        // show waiting asyncronus loading indicator
        this.$awn.asyncBlock(
          // get data user from API server
          this.$store.dispatch("getListProduk").catch(error => {
            // default error message
            let errorMessage = "Gagal mengambil data";
            // cek response error
            if (error.response) {
              // set 401 error message
              if (error.response.status == 401) {
                errorMessage = "<h4>Anda tidak mempunyai akses.</h4>";
              } else {
                // set server error message
                errorMessage = "<h4>Server sedang jalan-jalan.</h4>";
              }
            }
            // show error message
            this.$awn.alert(errorMessage);
          })
        );
      },
      // load moredata user from API server
      loadMore(link) {
        // show loading button
        this.loadingButton = true;
        // get more  user from API server
        this.$store.dispatch("loadMoreProduk", link)
          .then(res => {
            // disable loading button
            this.loadingButton = false;
            // update list user
            this.$store.commit("updateListProduk", res.data);
            this.$store.commit("setLastProdukPagination", res.meta.pagination);
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
              } else if(error.response.status == 422){
                // get error data
                let errorData = error.response.data.error
                // set error data in component
                this.alert.status = true;
                this.alert.errors = errorData.errors;
                this.alert.message = errorData.message;
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
      // reset search
      resetSearch() {
        // set keyword user to empty
        this.$store.commit("setKeywordProduk", " ");
        this.keyword = "";
        // load data user
        this.initialize();
      },
      // search item in API server
      search() {
        // set keyword search user
        this.$store.commit("setKeywordProduk", this.keyword);
        // get data
        this.initialize();
      },
      // delete user
      deleteProduk(produk) {
        // show confirm dialog
        this.$vuetifyConfirmDialog.open("Konfirmasi Perintah", "Apakan anda yakin menghapus produk ini ?", "Tidak", "Iya").then(confirm => {
          if (confirm) {
            //show waiting asyncronus loading indicator
            this.$awn.asyncBlock(
              // get data user from API Server
              this.$store.dispatch('deleteProduk', produk.id).then((res) => {
                // show notification
                this.$awn.success('<h4>' + res.message + '</h4>')
                // delete in store
                this.$store.commit('deleteProduk', produk)
              }).catch((error) => {
                // default error message
                let errorMessage = 'Gagal menghapus data';
                // cek response error
                if (error.response) {
                  // set 401 error message
                  if (error.response.status == 401) {
                    errorMessage = '<h4>Anda tidak mempunyai akses.</h4>'
                  } else if (error.response.status == 422) {
                    // get error data
                    let errorData = error.response.data.error
                    // set error data in component
                    this.alert.status = true;
                    this.alert.errors = errorData.errors;
                    this.alert.message = errorData.message;
                  } else {
                    // set server error message
                    errorMessage = '<h4>Server sedang jalan-jalan.</h4>'
                  }
                }
                // show error message
                this.$awn.alert(errorMessage)
              })
            )
          }
        })
      }
    },
    head: {
      titleTemplate: "Manajemen Produk - %s",
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
