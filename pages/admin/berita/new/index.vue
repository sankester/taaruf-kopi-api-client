<template>
  <v-layout row wrap>
    <v-flex xs12>
      <!--breadcumb-->
      <v-breadcrumbs divider="/" class="px-1 pt-0">
        <h1>Manajemen Berita</h1>
        <v-spacer></v-spacer>
        <v-breadcrumbs-item class="xs12" exact-active-class="/admin/berita" exact replace v-for="breadcumb in breadcumbs" :key="breadcumb.text" :disabled="breadcumb.disabled" :to="breadcumb.link">
          {{ breadcumb.text }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <!--form input-->
      <v-card>
        <!--title-->
        <v-toolbar dark color="primary">
          <v-toolbar-title class="white--text">Form Tambah Berita</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn flat ripple dark outline round class="hidden-sm-and-down" nuxt to="/admin/berita">
            <v-icon>chevron_left</v-icon> kembali
          </v-btn>
          <v-btn icon class="hidden-md-and-up" @click="$router.push('/admin/berita')">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container v-if="alert.status">
          <v-alert dismissible v-model="alert.status" :type="alert.type" >
            {{ alert.message }}
            <ul>
              <template v-for="items in alert.errors">
                <template v-for="(item,index) in items">
                  <li :key="index">
                    {{item}}
                  </li>
                </template>
              </template>
            </ul>
          </v-alert>
        </v-container>
        <FormBerita ref="formBerita" @insert="insert($event)" @reset="reset"/>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  // import component
  import FormBerita from "@/components/backend/berita/FormBerita";

  export default {
    name: "new-berita",
    layout: "admin",
    middleware: ["check-auth", "auth"],
    components: {
      FormBerita
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
            text: "Berita",
            disabled: false,
            link: "/admin/berita"
          },
          {
            text: "Tambah Berita",
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
      insert(berita) {
        // show waiting asyncronus loading indicator
        this.$awn.asyncBlock(
          // get data user from API Server
          this.$store.dispatch('saveBerita', berita).then((res) => {
            // show notification
            this.$awn.success('<h4>'+ res.message +'</h4>')
            // disable alert
            this.alert.status = false
            // reset form
            this.$refs.formBerita.reset();
          }).catch((error) => {
            // default error message
            let errorMessage = 'Gagal menambah data';
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
      },
      reset(){
        this.alert.status = false
      }
    },
    head: {
      titleTemplate: "Tambah Berita - %s",
      meta: [
        {charset: "utf-8"},
        {name: "viewport", content: "width=device-width, initial-scale=1"},
        {hid: "description", name: "description", content: "Meta description"}
      ]
    },
    created() {
      // set custom
      this.$validator.localize("id", this.dictionary);
    }
  }
</script>

<style scoped>

</style>
