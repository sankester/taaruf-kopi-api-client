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
  }
}
