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
      <!--form input-->
      <v-card>
        <!--title-->
        <v-toolbar dark color="primary">
          <v-toolbar-title class="white--text">Form Edit Produk</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn flat ripple dark outline round class="hidden-sm-and-down" nuxt to="/admin/produk">
            <v-icon>chevron_left</v-icon>
            kembali
          </v-btn>
          <v-btn icon class="hidden-md-and-up" @click="$router.push('/admin/produk')">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container v-if="alert.status">
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
        </v-container>
        <FormProduk edit :fileAttach="loadedFiles" :produk="loadedProduk" @edit="edit($event)" @reset="reset"/>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  // import component
  import FormProduk from "@/components/backend/produk/FormProduk";

  export default {
    name: "edit-produk",
    layout: "admin",
    middleware: ["check-auth", "auth"],
    components: {FormProduk},
    asyncData(context) {
      return context.$axios.$get('produk/' + context.params.produkID + '?include=files' , {
        headers: {'Authorization': "Bearer " + context.store.getters.getToken}
      })
        .then(res => {
          // grt data respose
          let resData = res.data
          let resFile = res.data.files.data
          // reformate produk
          let produk =  {
			        id : resData.id,
              nama_produk: resData.nama_produk,
              deskripsi_produk:  resData.deskripsi_produk,
              stok :  resData.stok,
              harga :  resData.harga,
              diskon :  resData.diskon,
              publish_st :  resData.publish_st
          }
          // declare variable
          let files = []
          // reformate and get data files
          resFile.forEach(function (element) {
            files.push({
              id : element.file_id ,
              image : element.file_path +'/'+ element.file_name ,
              status : false
            })
          })
          // return data
          return {
            loadedProduk: produk,
            loadedFiles : files
          }
        })
        .catch(e => {
          context.error(e)
        })
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
            disabled: false,
            link: "/admin/produk"
          },
          {
            text: "Edit Produk",
            disabled: false
          }
        ],
        alert: {
          type: "error",
          status: false,
          message: "",
          errors: []
        }
      };
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
      // reset button
      reset() {
        this.alert.status = false;
      },
      // edit user
      edit(produk) {
        // show waiting asyncronus loading indicator
        this.$awn.asyncBlock(
          // get data user from API Server
          this.$store.dispatch('editProduk', produk).then((res) => {
            // show notification
            this.$awn.success('<h4>'+ res.message +'</h4>')
            // disable alert
            this.alert.status = false
          }).catch((error) => {
            // default error message
            let errorMessage = 'Gagal mengambil data';
            // cek response error
            if (error.response) {
              // set 401 error message
              if (error.response.status == 401) {
                errorMessage = '<h4>Anda tidak mempunyai akses.</h4>'
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
                errorMessage = '<h4>Server sedang jalan-jalan.</h4>'
              }
            }
            // show error message
            this.$awn.alert(errorMessage)
          })
        )
      }
    },
    head: {
      titleTemplate: "Edit Produk - %s",
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
