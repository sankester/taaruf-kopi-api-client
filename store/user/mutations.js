export default {
  // set token
  setUsers(state,listUser){
    state.listUser = listUser
  },
  // set last page
  setLastPagination(state, pagination){
    state.pagination = pagination
  },
  // update list user
  updateListUser(state, users){
    // loop
    users.forEach(function(element) {
      state.listUser.push(element)
    });
  },
  // set keyword user
  setKeywordUser(state, keyword){
    state.keywordUser = keyword
  }
}
