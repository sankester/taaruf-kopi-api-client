<template>
  <v-footer height="auto" dark>
    <v-container dark>
      <v-layout align-center row wrap fill-height>
        <v-flex text-xs-center xs12 sm12 md12 lg12>
          <div class="layout column align-center justify-center">
            <img src="~assets/img/web/logo-kopi-taaruf.png" height="50px" width="165px" class="mb-2">
          </div>
          <div class="layout row justify-center align-center">
            <span>
               <v-icon class="mr-2" small>place</v-icon> Kawedanan block C no.8 Salaman - Magelang, Jawa Tengah  &nbsp;|&nbsp;  <v-icon class="mx-2" small>phone</v-icon>  0857-2990-5023
            </span>
          </div>
          <no-ssr>
            <div class="layout row wrap justify-center align-center">
              <v-btn icon flat>
                <facebook class="v-icon" />
              </v-btn>
              <v-btn icon flat>
                <instagram class="v-icon" />
              </v-btn>
              <v-btn icon flat>
                <youtube class="v-icon" />
              </v-btn>
            </div>
          </no-ssr>
          <div class="layout column align-center justify-center">
            <span class="copy-text">
              Copyright © 2018
              <a href="#">Ta`aruf Kopi</a> &nbsp; | &nbsp;  All Rights Reserved &nbsp; | &nbsp;  Designed By <a
              href="#">Ach. Vani Ardiansyah</a>
            </span>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
  // import icon
  export default {
    name: "Footer",
  }
</script>

<style scoped>
  .copy-text a {
    text-decoration: none;
    color: teal;
  }
</style>
