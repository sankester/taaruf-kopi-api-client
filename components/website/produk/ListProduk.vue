<template>
  <v-layout class="py-2" row wrap>
    <v-flex xs12 md3 sm4 lg3 v-for="(produk, index) in list" :key="index">
      <detail-produk :produk="produk"></detail-produk>
    </v-flex>
    <!--load more button-->
    <v-flex  xs12 md12 sm12 lg12 class="layout mt-3" align-center justify-center justify-space-around fill-height v-if="list.length >= pagination.per_page && pagination.current_page < pagination.total_pages">
      <v-btn color="teal" outline dark :loading="loading" @click="loadMore(pagination.links.next)">load more</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  // import component
  import DetailProduk from "@/components/website/produk/DetailProduk";

  export default {
    name: "ListProduk",
    components: {
      DetailProduk
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
