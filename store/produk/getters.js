export default  {
  // get token
  getListProduk(state){
    return state.list
  },
  // get headers
  getProdukTableHeaders(state){
    return state.headers
  },
  // get pagination
  getProdukPagination(state){
    return state.pagination
  },
  // get keyword
  getKeywordProduk(state){
    return state.keyword
  },
  //public
  // get token
  getListPublicProduk(state){
    return state.listPublic
  },
  // get pagination
  getPublicProdukPagination(state){
    return state.paginationPublic
  },
  // get keyword
  getPublicKeywordProduk(state){
    return state.keywordPublic
  },
}
