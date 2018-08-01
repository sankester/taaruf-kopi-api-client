export default  {
  // get token
  getListAcara(state){
    return state.list
  },
  // get headers
  getAcaraTableHeaders(state){
    return state.headers
  },
  // get pagination
  getAcaraPagination(state){
    return state.pagination
  },
  // get keyword
  getKeywordAcara(state){
    return state.keyword
  },
  //public
  // get token
  getListPublicAcara(state){
    return state.listPublic
  },
  // get pagination
  getPublicAcaraPagination(state){
    return state.paginationPublic
  },
  // get keyword
  getPublicKeywordAcara(state){
    return state.keywordPublic
  },
}
