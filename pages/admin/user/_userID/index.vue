<template>
  <v-layout row wrap>
    <v-flex xs12>
      <!--breadcumb-->
      <v-breadcrumbs divider="/">
        <h1>Manajemen User</h1>
        <v-spacer></v-spacer>
        <v-breadcrumbs-item nuxt exact v-for="breadcumb in breadcumbs" :key="breadcumb.text" :disabled="breadcumb.disabled" :to="breadcumb.link">
          {{ breadcumb.text }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <!--form input-->
      <v-card>
        <!--title-->
        <v-toolbar dark color="brown darken-1">
          <div class="headline">Form Edit user</div>
          <v-spacer></v-spacer>
          <v-btn dark color="teal" round class="hidden-sm-and-down" nuxt to="/admin/user">
            <v-icon>chevron_left</v-icon>kembali
          </v-btn>
          <v-btn icon class="hidden-md-and-up" @click="$router.push('/admin/user')">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>
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
        <FormUser edit :user="loadedUser" @edit="edit($event)" @reset="reset"/>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import FormUser from "@/components/backend/user/FormUser"

  export default {
    name: "edit-user",
    layout: "admin",
    middleware: ["check-auth", "auth"],
    components: {FormUser},
    asyncData(context){
      return context.$axios.$get('user/' + context.params.userID ,{
        headers: { 'Authorization': "Bearer " + context.store.getters.getToken }
      })
        .then( res  => {
          return {
            loadedUser : {...res.data}
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
            text: "User",
            disabled: false,
            link: "/admin/user"
          },
          {
            text: "Edit User",
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
      edit(user){
        // show waiting asyncronus loading indicator
        this.$awn.asyncBlock(
          // get data user from API Server
          this.$store.dispatch('editUser', user).then((res) => {
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
      titleTemplate: "Edit User - %s",
      meta: [
        {charset: "utf-8"},
        {name: "viewport", content: "width=device-width, initial-scale=1"},
        {hid: "description", name: "description", content: "Meta description"}
      ]
    }
  };
</script>
