export default {
  // set acara
  setProduk(state, list){
    state.list = list
  },
  // set last page
  setLastProdukPagination(state, pagination){
    state.pagination = pagination
  },
  // update list
  updateListProduk(state, list){
    // loop
    list.forEach(function(element) {
      state.list.push(element)
    });
  },
  // set keyword
  setKeywordProduk(state, keyword){
    state.keyword = keyword
  },
  // delete
  deleteProduk(state, produk){
	state.list.forEach(function(element, index){
		if(element.id == produk.id){
			console.log('delete')
			state.list.splice(index, 1)
		}
	})
    //state.list.splice(state.list.indexOf(produk), 1)
  }
}