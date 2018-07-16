export default  {
  // get token
  getListUser(state){
    return state.listUser
  },
  // get headers
  getUserTableHeaders(state){
    return state.headers
  },
  // get pagination
  getUserPagination(state){
    return state.pagination
  },
  // get keyword user
  getKeywordUser(state){
    return state.keywordUser
  }
}
