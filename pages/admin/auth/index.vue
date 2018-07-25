<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height class="pa-0 ma-0">
        <v-layout row wrap fill-height class="text-xs-center">
          <v-flex fill-height d-flex sm6 md8 class="hidden-xs-only">
            <v-card color="brown darken-1" class="background--login"></v-card>
          </v-flex>
          <v-flex fill-height xs12 sm6 md4>
            <v-card height="100%">
              <v-card-title primary-title>
                <div style="width: 100%; text-align: center" class="mt-5 pt-5">
                  <h4 class="headline text-md-center">Login</h4>
                  <div class="text-md-center">Login untuk mengakses halaman admin</div>
                  <v-avatar tile class="login--logo mt-3">
                    <img src="~assets/img/web/coffe-12.png" alt="">
                  </v-avatar>
                </div>
              </v-card-title>
              <v-form class="mx-5" style="height: 320px">
                <v-text-field
                  v-model="username"
                  v-validate="'required|alpha_dash'"
                  :error-messages="errors.collect('username')"
                  label="Username "
                  data-vv-name="username"
                  name="username"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  v-validate="'required'"
                  :error-messages="errors.collect('password')"
                  label="Password "
                  :append-icon="isPassword ? 'visibility' : 'visibility_off'"
                  @click:append="() => (isPassword = !isPassword)"
                  :type="isPassword ? 'password' : 'text'"
                  name = 'password'
                  required
                ></v-text-field>
                <v-btn dark color="primary" @click="submit">
                  <v-icon dark>send</v-icon> &nbsp; Login
                </v-btn>
              </v-form>
              <div style="position: fixed; height: 100%;margin: auto 3%;">
                <p class="text-sm-center mt-5">&copy; Copyright Paguyuban Ta`aruf Kopi 2018 - <i>All Rights Reserved.</i></p>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

  export default {
    name: "auth",
    middleware : ['check-auth','auth'],
    data: () => ({
      username: '',
      isPassword : true,
      password : '',
      dictionary: {
        attributes: {
          username: 'Username'
        }
      }
    }),
    methods: {
      submit () {
        // validate input
        this.$validator.validateAll().then( (res) => {
          // cek response
          if(res){
            // start asyncronus get data
            this.$awn.asyncBlock(
              // process login
              this.$store.dispatch('authenticateUser', {
                username : this.username,
                password : this.password
              }).then(() => {
                // set login welcome status
                this.$store.commit('setWelcomeMessage', true)
                // redirect
                this.$router.push('/admin')
              }).catch((error) => {
                // default message
                let errorMessage ='Gagal mengeksekusi data';
                // cek response
                if (error.response) {
                  // set custom error message
                  if(error.response.status == 401){
                    // set 401 error message
                    errorMessage = '<h4>Username / password salah.</h4>'
                  }else{
                    // set error server message
                    errorMessage = '<h4>Server sedang jalan-jalan.</h4>'
                  }
                }
                // show error messasge
                this.$awn.alert(errorMessage)
              })
            )
          }
        })
      },
    },
    created(){
      // set custom
      this.$validator.localize('id', this.dictionary)
    }
  }
</script>

<style scoped>
  /*css login */
  .background--login {
    background-image: url("http://2.bp.blogspot.com/-11LOnwum65c/VhnRAo15XuI/AAAAAAAACwQ/URn5BJfhXJY/s1600/kopi.jpg");
    background-size: cover;
    background-position: center;
  }
  .login--logo {
    width: 150px !important;
    height: 60px !important;
  }
</style>
