export default  {
  // store token
  token : null,
  // default auth user
  authUser : {
    avatar: null,
    email: null,
    nama : null,
    username: null
  },
  // welcome message status
  welcomeMessage : false,
  // list recent login
  recentLogin : [],
  // default recent pagination
  recentLoginPagination : {
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 0,
    total_pages: 0,
    links: []
  },
  // dashboard data
  dashboardData : [],
  // is transparent navbar website
  transparent : false,
  // nav bar class color
  navbarClassColor : '',
  // set is home
  isHome : false
}
