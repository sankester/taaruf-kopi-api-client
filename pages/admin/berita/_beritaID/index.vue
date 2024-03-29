<template>
  <v-layout row wrap>
    <v-flex xs12>
      <!--breadcumb-->
      <v-breadcrumbs divider="/" class="px-1 pt-0">
        <h1>Manajemen Berita</h1>
        <v-spacer></v-spacer>
        <v-breadcrumbs-item nuxt exact v-for="breadcumb in breadcumbs" :key="breadcumb.text" :disabled="breadcumb.disabled" :to="breadcumb.link">
          {{ breadcumb.text }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <!--form input-->
      <v-card>
        <!--title-->
        <v-toolbar dark color="primary">
          <v-toolbar-title class="white--text">Form Edit Berita</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn flat ripple dark outline round class="hidden-sm-and-down" nuxt to="/admin/berita">
            <v-icon>chevron_left</v-icon>
            kembali
          </v-btn>
          <v-btn icon class="hidden-md-and-up" @click="$router.push('/admin/berita')">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>
          <v-alert dismissible v-model="alert.status" :type="alert.type">
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
        <FormBerita edit :fileAttach="loadedFiles" :berita="loadedBerita" @edit="edit($event)" @reset="reset"/>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  // import component
  import FormBerita from "@/components/backend/berita/FormBerita";
  import axios from 'axios'

  export default {
    name: "edit-berita",
    layout: "admin",
    middleware: ["set-host","check-auth", "auth"],
    components: {FormBerita},
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
      const res = await axios.get( process.env.BASE_URL + 'berita/' + context.params.beritaID + '?include=files' , {
        headers: headers
      }).then(response => {
         return response.data
      })
      // get data respose
      let resData = res.data
      let resFile = res.data.files.data
      // reformate berita
      let berita =  {
        id : resData.id,
        nama_berita: resData.nama_berita,
        isi_berita:  resData.isi_berita,
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
        loadedBerita: berita,
        loadedFiles : files
      }
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
            text: "Edit Berita",
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
      edit(berita) {
        // show waiting asyncronus loading indicator
        this.$awn.asyncBlock(
          // get data user from API Server
          this.$store.dispatch('editBerita', berita).then((res) => {
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
      titleTemplate: "Edit Berita - %s",
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
