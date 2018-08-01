export default  {
  // get token
  getListBerita(state){
    return state.list
  },
  // get headers
  getBeritaTableHeaders(state){
    return state.headers
  },
  // get pagination
  getBeritaPagination(state){
    return state.pagination
  },
  // get keyword
  getKeywordBerita(state){
    return state.keyword
  },
  //public
  // get token
  getListPublicBerita(state){
    return state.listPublic
  },
  // get pagination
  getPublicBeritaPagination(state){
    return state.paginationPublic
  },
  // get keyword
  getPublicKeywordBerita(state){
    return state.keywordPublic
  },
}
