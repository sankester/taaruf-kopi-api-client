export default {
  // set header berita table
  headers: [
    { text: 'Judul Berita', align: 'left', sortable: true, value: 'judul', width:"52%"},
    { text: 'Pembuat', value: 'name', sortable: false, width:"20%" },
    { text: 'Status Publikasi', value: 'status', align: 'center', sortable: false, width:"10%" },
    { text: 'Actions', value: 'action', align: 'center', sortable: false, width:"18%" }
  ],
  // store list berita
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
  // keyword search berita
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
