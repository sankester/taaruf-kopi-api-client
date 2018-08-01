export default {
  // set header produk table
  headers: [
    { text: 'Nama Produk', align: 'left', sortable: true, value: 'nama'},
    { text: 'Stok', value: 'stok', sortable: false },
    { text: 'Diskon', value: 'diskon', sortable: false },
    { text: 'Harga', value: 'harga', align: 'center', sortable: false },
    { text: 'Status Publikasi', value: 'status', align: 'center', sortable: false },
    { text: 'Action',  align: 'center', sortable: false }
  ],
  // store list produk
  list : [],
  // default pagination
  pagination : {
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 0,
    total_pages: 0,
    links: []
  },
  // keyword search produk
  keyword : '',
  // public
  // list public
  listPublic : [],
  // keyword public
  keywordPublic : '',
  // pagination public
  paginationPublic : {
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 0,
    total_pages: 0,
    links: []
  }
}
