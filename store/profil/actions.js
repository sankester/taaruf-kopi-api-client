export default {
  // get list profil
  async getListProfil({ dispatch, commit, getters, rootGetters }) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data profil from API Server
    await this.$axios.$get('/profil?include=user&keyword='+ rootGetters.getKeywordProfil, tokenHeaders).then((res) => {
      // commit data
      commit('setProfil', res.data)
      commit('setLastProfilPagination', res.meta.pagination)
    })
  },
  // load more profil
  async loadMoreProfil({ commit, rootGetters }, url) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data profil from API Server
    return await this.$axios.$get(url, tokenHeaders)
  },
  // insert into api server
  async saveProfil({ rootGetters }, profil) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data profil from API Server
    return await this.$axios.$post('/profil', profil, tokenHeaders)
  },
  // edit profil on API server
  async editProfil({ rootGetters}, profil){
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data profil from API Server
    return await this.$axios.$put('/profil/' + profil.id, profil, tokenHeaders)
  },
  // delete profil in API server
  async deleteProfil({ rootGetters}, id){
    //set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    //delete data profil from API Server
    return await this.$axios.$delete('/profil/' + id,  tokenHeaders)
  },
  // public
  // get public list berita
  async getPublicListProfil({ dispatch, commit, getters, rootGetters }) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data berita from API Server
    await this.$axios.$get('/public/profil', tokenHeaders).then((res) => {
      // commit data
      commit('setPublicProfil', res.data)
    })
  },
}
