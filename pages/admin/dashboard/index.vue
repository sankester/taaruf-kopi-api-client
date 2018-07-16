<template>
  <v-layout>

  </v-layout>
</template>

<script>
  export default {
    name: "index",
    layout: 'admin',
    middleware : ['check-auth','auth']
  }
</script>

<style scoped>

</style>
