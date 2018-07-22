export default {
  // set profil
  setProfil(state, list){
    state.list = list
  },
  // set last page
  setLastProfilPagination(state, pagination){
    state.pagination = pagination
  },
  // update list
  updateListProfil(state, list){
    // loop
    list.forEach(function(element) {
      state.list.push(element)
    });
  },
  // set keyword
  setKeywordProfil(state, keyword){
    state.keyword = keyword
  },
  // delete
  deleteProfil(state, profil){
    state.list.splice(state.list.indexOf(profil), 1)
  }
}
