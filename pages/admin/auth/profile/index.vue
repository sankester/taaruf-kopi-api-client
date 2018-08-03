<template>
  <v-layout row wrap>
    <v-flex xs12>
      <!--breadcumb-->
      <v-breadcrumbs divider="/" class="px-1 pt-0">
        <h1>Profil User</h1>
        <v-spacer></v-spacer>
        <v-breadcrumbs-item nuxt exact v-for="breadcumb in breadcumbs" :key="breadcumb.text" :disabled="breadcumb.disabled" :to="breadcumb.link">
          {{ breadcumb.text }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <!--form input-->
      <v-card>
        <!--title-->
        <v-toolbar dark color="primary">
          <v-toolbar-title class="white--text">Detail Data User</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn flat ripple dark outline round class="hidden-sm-and-down" nuxt to="/admin">
            <v-icon>chevron_left</v-icon> kembali
          </v-btn>
          <v-btn icon class="hidden-md-and-up" @click="$router.push('/admin')">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container v-if="alert.status">
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
        <v-tabs left  color="transparent" class="mt-2" style="min-height: 200px">
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab href="#tab-1">
            <v-icon class="mr-1">person</v-icon>Profil User
          </v-tab>
          <v-tab href="#tab-2">
            <v-icon class="mr-1">access_time</v-icon> Riwayat Login
          </v-tab>
          <v-tab-item id="tab-1">
            <FormUser edit :user="loadedUser" @edit="edit($event)" @reset="reset"/>
          </v-tab-item>
          <v-tab-item id="tab-2">
            <v-card flat>
              <v-card-text>
                <!--list recent login-->
                <v-list two-line class="scroll-x">
                  <template v-for="(recent, index) in listRecent">
                    <v-list-tile :key="recent.login_at" style="width: 100%" >
                      <v-list-tile-action>
                        <v-icon :color="(recent.revoked || checkExperied(recent.expires_at)) ? 'error' : 'primary'" v-text="getIconStatus(recent.revoked, checkExperied(recent.expires_at))"></v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          <small>Waktu Login</small>
                        </v-list-tile-title>
                        <v-list-tile-sub-title>
                         <v-icon color="indigo" size="18px" class="mr-1">event</v-icon>{{ recent.login_date }}
                        </v-list-tile-sub-title>
                        <v-list-tile-sub-title>
                         <v-icon color="indigo" size="18px" class="mr-1">access_time</v-icon>{{ recent.login_time }}
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          <small>Waktu Experied</small>
                        </v-list-tile-title>
                        <v-list-tile-sub-title>
                          <v-icon color="indigo" size="18px" class="mr-1">event</v-icon>{{ recent.expires_at_date }}
                        </v-list-tile-sub-title>
                        <v-list-tile-sub-title>
                          <v-icon color="indigo" size="18px" class="mr-1">access_time</v-icon>{{ recent.expires_at_time }}
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-content>
                        <v-list-tile-title class="text-md-center align-center align-content-center">
                          <small>Status Token</small>
                        </v-list-tile-title >
                        <v-list-tile-sub-title class="text-md-center align-center align-content-center">
                          <v-btn small flat :class="getLabelClassStatus(recent.revoked, checkExperied(recent.expires_at))" class="pa-0 ma-0">
                            &nbsp;{{ getLabelStatus(recent.revoked, checkExperied(recent.expires_at))}}
                          </v-btn>
                        </v-list-tile-sub-title>
                        <v-list-tile-sub-title class="text-md-center align-center align-content-center">
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action style="min-width: 137.37px">
                        <v-list-tile-title class="text-md-center">

                        </v-list-tile-title >
                        <v-btn :loading="recent.loading" @click="setRevoke(recent)" flat :class="'error--text'" outline class="px-1" small v-if="!recent.revoked && !checkExperied(recent.expires_at) && (recent.current_st == false) ">
                          <v-icon v-text="'block'"></v-icon> &nbsp;Block Access
                        </v-btn>
                        <v-btn flat :class="'info--text'" class="px-1" small v-else-if="recent.current_st">
                          <v-icon v-text="'vpn_key'"></v-icon> &nbsp;Digunakan
                        </v-btn>
                      </v-list-tile-action>
                    </v-list-tile>
                    <v-divider
                      v-if="index+1 != listRecent.length"
                      :key="recent.id"
                    ></v-divider>
                  </template>
                </v-list>
                <!--load more button-->
                <v-layout align-center justify-center justify-space-around fill-height class="mt-3" v-if="listRecent.length >= listRecentPagination.per_page && listRecentPagination.current_page < listRecentPagination.total_pages">
                  <v-btn flat color="broen" outline :loading="loadingButton" @click="loadMore(listRecentPagination.links.next)">load more</v-btn>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import FormUser from "@/components/backend/user/FormUser"
  import axios from 'axios'

  export default {
    name: "auth-profile",
    layout: "admin",
    middleware: ["check-auth", "auth"],
    components: {FormUser},
    async asyncData ({store}) {
      const res = await axios.get( process.env.BASE_URL + 'oauth/data', {
        headers: {'Authorization': "Bearer " + store.getters.getToken}
      }).then((response) =>{
        return response.data
      })
      return {
        loadedUser : res.data
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
            text: "Profil User",
            disabled: false
          }
        ],
        alert: {
          type: "error",
          status: false,
          message: "",
          errors: []
        },
        dateLabelList : '',
        loadingButton : false
      }
    },
    computed : {
      listRecent(){
        return this.$store.getters.getListRecent
      },
      listRecentPagination(){
        return this.$store.getters.getListRecentPagination
      },
      dateListLabel(){
        return this.dateLabelList
      }
    },
    mounted() {
      // call resize screen function
      this.onResize();
      // cek if browser process
      if (process.browser) {
        window.addEventListener("resize", this.onResize, {passive: true});
      }
      // get list recent
      this.$store.dispatch('getRecentLogin')
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
            // commit auth user
            this.$store.commit('setUser', res.data)
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
      },
      // load more recent
      loadMore(link){
        // show loading button
        this.loadingButton = true;
        // get more  user from API server
        this.$store.dispatch("loadMoreRecentLogin", link).then(res => {
          // disable loading button
          this.loadingButton = false;
          // update list user
          this.$store.commit("updateRecentLogin", res.data);
          this.$store.commit("setLastRecentLoginPagination", res.meta.pagination);
        }).catch(error => {
          // disable loading button
          this.loadingButton = false;
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
        });
      },
      // compaire date
      compaireDate(dateLabel){
        if(dateLabel == this.dateLabelList){
          return false
        }
        this.dateLabelList = dateLabel
        return true
      },
      checkExperied(dateCheck){
        let specific_date = new Date(dateCheck);
        let current_date = new Date();
        return (current_date.getTime() > specific_date.getTime())
      },
      getIconStatus(revoked, experied){
        if(revoked){
          return 'clear'
        }
        if(experied){
          return 'alarm_off'
        }
        return 'check'
      },
      getLabelClassStatus(revoked, experied){
        if(revoked){
          return 'error--text'
        }
        if(experied){
          return 'warning--text'
        }
        return 'success--text'
      },
      getLabelStatus(revoked, experied){
        if(revoked){
          return 'Non Aktif'
        }
        if(experied){
          return 'Experied'
        }
        return 'Aktif'
      },
      setRevoke(recent){
        // show loading button
        recent.loading = true;
        // get more  user from API server
        this.$store.dispatch("revokeToken", recent.id).then(res => {
          // disable loading button
          recent.loading  = false;
          // update list user
          recent.revoked = true
        }).catch(error => {
          // disable loading button
          recent.loading  = false;
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
        });
      }
    },
    head: {
      titleTemplate: "Profil User - %s",
      meta: [
        {charset: "utf-8"},
        {name: "viewport", content: "width=device-width, initial-scale=1"},
        {hid: "description", name: "description", content: "Meta description"}
      ]
    }
  };
</script>
