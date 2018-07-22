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
  }
}
