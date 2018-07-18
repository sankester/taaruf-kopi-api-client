export default {
  // get list user
  async getListUser({ dispatch, commit, getters, rootGetters }) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data user from API Server
    await this.$axios.$get('/user?keyword='+ rootGetters.getKeywordUser, tokenHeaders).then((res) => {
      // commit data
      commit('setUsers', res.data)
      commit('setLastPagination', res.meta.pagination)
    })
  },
  // load more user
  async loadMoreUser({ commit, rootGetters }, url) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data user from API Server
    return await this.$axios.$get(url, tokenHeaders)
  },
  // insert into api server
  async saveUser({ rootGetters }, user) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data user from API Server
    return await this.$axios.$post('/user', user, tokenHeaders)
  },
  // edit user on API server
  async editUser({ rootGetters}, user){
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    // get data user from API Server
    return await this.$axios.$put('/user/' + user.id, user, tokenHeaders)
  },
  // delete user in API server
  async deleteUser({ rootGetters}, id){
    //set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + rootGetters.getToken }
    }
    //delete data user from API Server
    return await this.$axios.$delete('/user/' + id,  tokenHeaders)
  }
}
