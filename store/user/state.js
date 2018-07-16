export default {
  // set header user table
  headers: [
    { text: 'Nama', align: 'left', sortable: true, value: 'nama'},
    { text: 'Username', value: 'username', sortable: false },
    { text: 'Email', value: 'email', sortable: false },
    { text: 'Status', value: 'status',  },
    { text: 'Actions', value: 'action',align: 'center', sortable: false }
  ],
  // store list user
  listUser : [],
  // default pagination
  pagination : {
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 0,
    total_pages: 0,
    links: []
  },
  // keyword search user
  keywordUser : ''
}
