export default {
  // set header profil table
  headers: [
    { text: 'Nama Profil', align: 'left', sortable: true, value: 'nama'},
    { text: 'Pembuat', value: 'username', sortable: false },
    { text: 'Actions', value: 'action', align: 'center', sortable: false }
  ],
  // store list profil
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
  // keyword search profil
  keyword : '',
  // public profil
  listPublic : []
}
