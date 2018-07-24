<template>
  <!--toolbar component-->
  <v-toolbar color="brown darken-1" dark :clipped-left="clipped" fixed app>
    <v-toolbar-side-icon @click="setDrawer"></v-toolbar-side-icon>
    <v-spacer class="hidden-md-and-up"></v-spacer>
    <v-toolbar-title>
      <v-avatar tile class="top--logo">
        <img src="~assets/img/web/logo-kopi-taaruf.png" alt="">
      </v-avatar>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!--right menu deskop mode-->
    <v-toolbar-items class="hidden-sm-and-down text-xs-center">
      <!--menu item notification-->
      <notification/>
      <!--menu item user-->
      <v-menu offset-y>
        <v-btn flat slot="activator">
          <v-avatar>
            <v-icon large dark>account_circle</v-icon>
          </v-avatar>
        </v-btn>
        <v-list>
          <v-list-tile exact nuxt to="/admin/auth/profile">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Profil</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
    <!--right menu mobile mode-->
    <v-menu offset-y class="hidden-md-and-up">
      <v-btn icon slot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>notifications</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Pemberitahuan</v-list-tile-title>
        </v-list-tile>
        <v-list-tile exact nuxt to="/admin/auth/profile">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Profil</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
  // import componen
  import notification from "@/components/backend/general/Notification";

  export default {
    name: "NavBar",
    // register component
    components: {
      notification
    },
    props: {
      drawer: {
        type: Boolean,
        default: false
      },
      clipped: {
        type: Boolean,
        default : false
      },
    },
    methods : {
      // emmit drawer event
      setDrawer(){
        this.$emit('setDrawer')
      },
      // emmit logout event
      logout(){
        this.$emit('logout')
      }
    }
  }
</script>

<style scoped>
  /*custom top logo */
  .top--logo {
    width: 175px !important;
    height: 50px !important;
  }
</style>
