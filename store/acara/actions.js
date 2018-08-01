export default {
  // get list acara
  async getListAcara({ dispatch, commit, getters, rootGetters }) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data acara from API Server
    await this.$axios.$get('/acara?include=user&keyword='+ rootGetters.getKeywordAcara, tokenHeaders).then((res) => {
      // commit data
      commit('setAcara', res.data)
      commit('setLastAcaraPagination', res.meta.pagination)
    })
  },
  // load more acara
  async loadMoreAcara({ commit, rootGetters }, url) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data acara from API Server
    return await this.$axios.$get(url, tokenHeaders)
  },
  // insert into api server
  async saveAcara({ rootGetters }, acara) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data acara from API Server
    return await this.$axios.$post('/acara', acara, tokenHeaders)
  },
  // edit acara on API server
  async editAcara({ rootGetters}, acara){
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data acara from API Server
    return await this.$axios.$put('/acara/' + acara.id, acara, tokenHeaders)
  },
  // delete acara in API server
  async deleteAcara({ rootGetters}, id){
    //set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    //delete data acara from API Server
    return await this.$axios.$delete('/acara/' + id,  tokenHeaders)
  },
  // public
  // get public list berita
  async getPublicListAcara({ dispatch, commit, getters, rootGetters }) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data berita from API Server
    await this.$axios.$get('/public/acara?include=user,files&keyword='+ rootGetters.getPublicKeywordAcara, tokenHeaders).then((res) => {
      // commit data
      commit('setPublicAcara', res.data)
      commit('setPublicLastAcaraPagination', res.meta.pagination)
    })
  },
}
