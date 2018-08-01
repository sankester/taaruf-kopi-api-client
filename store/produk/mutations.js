export default {
  // set profuk
  setProduk(state, list) {
    state.list = list
  },
  // set last page
  setLastProdukPagination(state, pagination) {
    state.pagination = pagination
  },
  // update list
  updateListProduk(state, list) {
    // loop
    list.forEach(function (element) {
      state.list.push(element)
    });
  },
  // set keyword
  setKeywordProduk(state, keyword) {
    state.keyword = keyword
  },
  // delete
  deleteProduk(state, produk) {
    state.list.forEach(function (element, index) {
      if (element.id == produk.id) {
        state.list.splice(index, 1)
      }
    })
  },
  // public
  // set berita
  setPublicProduk(state, list){
    state.listPublic= list
  },
  // set last page
  setPublicLastProdukPagination(state, pagination){
    state.paginationPublic = pagination
  },
  // update list
  updatePublicListProduk(state, list){
    // loop
    list.forEach(function(element) {
      state.listPublic.push(element)
    });
  },
  // set keyword
  setPublicKeywordProduk(state, keyword){
    state.keywordPublic = keyword
  },
}
