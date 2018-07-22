export default {
  // get list produk
  async getListProduk({ dispatch, commit, getters, rootGetters }) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data produk from API Server
    await this.$axios.$get('/produk?include=user&keyword='+ rootGetters.getKeywordProduk, tokenHeaders).then((res) => {
      // commit data
      commit('setProduk', res.data)
      commit('setLastProdukPagination', res.meta.pagination)
    })
  },
  // load more produk
  async loadMoreProduk({ commit, rootGetters }, url) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data produk from API Server
    return await this.$axios.$get(url, tokenHeaders)
  },
  // insert into api server
  async saveProduk({ rootGetters }, produk) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data produk from API Server
    return await this.$axios.$post('/produk', produk, tokenHeaders)
  },
  // edit produk on API server
  async editProduk({ rootGetters}, produk){
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data produk from API Server
    return await this.$axios.$put('/produk/' + produk.id, produk, tokenHeaders)
  },
  // delete produk in API server
  async deleteProduk({ rootGetters}, id){
    //set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    //delete data produk from API Server
    return await this.$axios.$delete('/produk/' + id,  tokenHeaders)
  }
}
