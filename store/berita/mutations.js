export default {
  // set berita
  setBerita(state, list){
    state.list = list
  },
  // set last page
  setLastBeritaPagination(state, pagination){
    state.pagination = pagination
  },
  // update list
  updateListBerita(state, list){
    // loop
    list.forEach(function(element) {
      state.list.push(element)
    });
  },
  // set keyword
  setKeywordBerita(state, keyword){
    state.keyword = keyword
  },
  // delete
  deleteBerita(state, berita){
    state.list.forEach(function(element, index){
      if(element.id == berita.id){
        state.list.splice(index, 1)
      }
    })
  },
  // public
  // set berita
  setPublicBerita(state, list){
    state.listPublic= list
  },
  // set last page
  setPublicLastBeritaPagination(state, pagination){
    state.paginationPublic = pagination
  },
  // update list
  updatePublicListBerita(state, list){
    // loop
    list.forEach(function(element) {
      state.listPublic.push(element)
    });
  },
  // set keyword
  setPublicKeywordBerita(state, keyword){
    state.keywordPublic = keyword
  },
}
