export default {
  // set header acara table
  headers: [
    { text: 'Nama Acara', align: 'left', sortable: true, value: 'nama'},
    { text: 'Tanggal', value: 'tanggal', sortable: false },
    { text: 'Status Publikasi', value: 'status', align: 'center', sortable: false },
    { text: 'Action',  align: 'center', sortable: false }
  ],
  // store list acara
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
  // keyword search acara
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
