export default {
  // set header berita table
  headers: [
    { text: 'Judul Berita', align: 'left', sortable: true, value: 'judul'},
    { text: 'Pembuat', value: 'name', sortable: false },
    { text: 'Status Publikasi', value: 'status', align: 'center', sortable: false },
    { text: 'Actions', value: 'action', align: 'center', sortable: false }
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
  keyword : ''
}
