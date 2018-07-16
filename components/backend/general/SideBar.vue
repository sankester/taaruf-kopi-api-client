<template>
  <!--drawer component-->
  <v-navigation-drawer v-bind:value="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
    <!--user name and avatar-->
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar @click="setMiniVariant">
            <img :src="authUser.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="authUser.nama"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click="setMiniVariant">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <!--list menu-->
    <v-list class="pt-2" dense>
      <v-divider></v-divider>
      <!--looping menu-->
      <template v-for="item in items">
        <v-list-tile :key="item.title" :to="item.to" class="mx-1 py-1">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <div class="px-2 my-1">
          <v-divider></v-divider>
        </div>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: "SideBar",
    props: {
      drawer: {
        type: Boolean,
        default: false
      },
      clipped: {
        type: Boolean,
        default: false
      },
      miniVariant : {
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        required : false
      },
      authUser : {
        type : Object,
        required : true
      }
    },
    methods : {
      // emmit mini variant event
      setMiniVariant(){
        this.$emit('setMini')
      }
    }
  }
</script>

<style scoped>

</style>
