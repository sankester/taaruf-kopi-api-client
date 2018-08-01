export default {
  // get list berita
  async getListBerita({ dispatch, commit, getters, rootGetters }) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data berita from API Server
    await this.$axios.$get('/berita?include=user&keyword='+ rootGetters.getKeywordBerita, tokenHeaders).then((res) => {
      // commit data
      commit('setBerita', res.data)
      commit('setLastBeritaPagination', res.meta.pagination)
    })
  },
  // load more berita
  async loadMoreBerita({ commit, rootGetters }, url) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data berita from API Server
    return await this.$axios.$get(url, tokenHeaders)
  },
  // insert into api server
  async saveBerita({ rootGetters }, berita) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data berita from API Server
    return await this.$axios.$post('/berita', berita, tokenHeaders)
  },
  // edit berita on API server
  async editBerita({ rootGetters}, berita){
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data berita from API Server
    return await this.$axios.$put('/berita/' + berita.id, berita, tokenHeaders)
  },
  // delete berita in API server
  async deleteBerita({ rootGetters}, id){
    //set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    //delete data berita from API Server
    return await this.$axios.$delete('/berita/' + id,  tokenHeaders)
  },
  // public
  // get public list berita
  async getPublicListBerita({ dispatch, commit, getters, rootGetters }) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data berita from API Server
    await this.$axios.$get('/public/berita?include=user,files&keyword='+ rootGetters.getPublicKeywordBerita, tokenHeaders).then((res) => {
      // commit data
      commit('setPublicBerita', res.data)
      commit('setPublicLastBeritaPagination', res.meta.pagination)
    })
  },
}
