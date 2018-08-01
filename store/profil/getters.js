export default  {
  // get token
  getListProfil(state){
    return state.list
  },
  // get headers
  getProfilTableHeaders(state){
    return state.headers
  },
  // get pagination
  getProfilPagination(state){
    return state.pagination
  },
  // get keyword
  getKeywordProfil(state){
    return state.keyword
  },
  //public
  // get token
  getListPublicProfil(state){
    return state.listPublic
  },
}
