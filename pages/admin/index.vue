<template>
  <v-layout>

  </v-layout>
</template>

<script>
  export default {
    name: "index",
    layout: 'admin',
    middleware : ['check-auth','auth'],
    fetch ({ params, redirect }) {
      redirect('/admin/dashboard')
    }
  }
</script>

<style scoped>

</style>
