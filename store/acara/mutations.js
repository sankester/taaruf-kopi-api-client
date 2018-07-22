export default {
  // set acara
  setAcara(state, list){
    state.list = list
  },
  // set last page
  setLastAcaraPagination(state, pagination){
    state.pagination = pagination
  },
  // update list
  updateListAcara(state, list){
    // loop
    list.forEach(function(element) {
      state.list.push(element)
    });
  },
  // set keyword
  setKeywordAcara(state, keyword){
    state.keyword = keyword
  },
  // delete
  deleteAcara(state, acara){
    state.list.forEach(function(element, index){
      if(element.id == acara.id){
        console.log('delete')
        state.list.splice(index, 1)
      }
    })
  }
}
