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
  }
}
