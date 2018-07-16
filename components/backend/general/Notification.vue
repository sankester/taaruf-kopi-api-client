<template>
  <v-menu offset-y>
    <!--notification indicator icon-->
    <v-btn flat slot="activator" sm2>
      <v-badge overlap color="red">
        <span slot="badge">3</span>
        <v-icon dark>notifications</v-icon>
      </v-badge>
    </v-btn>
    <!--notification item-->
    <v-list two-line>
      <template>
        <v-subheader>Hari Ini</v-subheader>
        <!--notification list-->
        <v-list-tile avatar @click="">
          <v-list-tile-avatar>
            <img src="https://pbs.twimg.com/profile_images/698219286947467264/ujW41nG3_400x400.jpg">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title >Add Post</v-list-tile-title>
            <v-list-tile-sub-title>Berita baru</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>15 min</v-list-tile-action-text>
            <v-icon color="green">check_circle</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar @click="" class="list--unread">
          <v-list-tile-avatar>
            <v-icon class="icon--rounder" dark>person_add</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Add User</v-list-tile-title>
            <v-list-tile-sub-title>New user with ...</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>20 min</v-list-tile-action-text>
            <v-icon color="red">cancel</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </template>
      <v-divider></v-divider>
    </v-list>
  </v-menu>
</template>

<script>
    export default {
        name: "notification"
    }
</script>

<style scoped>
  .list--unread{
    background-color: whitesmoke;
  }

  .icon--rounder{
    border-radius: 100%;
    background-color: #6D4C41;
  }
</style>
