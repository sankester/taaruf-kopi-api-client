<template>
  <v-layout column>
    <v-flex xs12 v-for="(acara, index) in list" :key="index" class="mt-2">
      <detail-acara :acara="acara"></detail-acara>
    </v-flex>
    <!--load more button-->
    <v-flex class="layout mt-3" align-center justify-center justify-space-around fill-height v-if="list.length >= pagination.per_page && pagination.current_page < pagination.total_pages">
      <v-btn color="teal" outline dark :loading="loading" @click="loadMore(pagination.links.next)">load more</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  // import component
  import DetailAcara from "@/components/website/acara/DetailAcara";

  export default {
    name: "ListAcara",
    components: {
      DetailAcara
    },
    props: {
      list: {
        type: Array,
        required: true
      },
      loading: {
        type: Boolean,
        default: false,
        required: false
      },
      pagination: {
        type: Object,
        required: true
      }
    },
    methods: {
      // emmit load more event
      loadMore(url) {
        url += '&include=user,files'
        console.log(url)
        this.$emit('loadMore', url)
      },
    }
  }
</script>

<style scoped>

</style>
