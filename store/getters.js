export default  {
  // get token
  getToken(state) {
    return state.token
  },
  // cek authenticate / cek token is not null
  isAuthenticated(state){
    return state.token != null
  },
  // get authuser
  getAuthUser(state){
    return state.authUser
  },
  // get welcome message status
  getWelcomeMessageStatus(state){
    return state.welcomeMessage
  },
  // get list recent
  getListRecent(state){
    return state.recentLogin
  },
  // get recent pagination
  getListRecentPagination(state){
    return state.recentLoginPagination
  },
  // get data dashboard
  getDataDashboard(state){
    return state.dashboardData
  },
  // get transparent status
  getTransparentNavbar(state){
    return state.transparent
  },
  getNavbarClassColor(state){
    return state.navbarClassColor
  },
  getIsHome(state){
    return state.isHome
  },
  // get sidebar data
  getSidebarBerita(state){
    return state.sidebarBerita
  },
  getSidebarAcara(state){
    return state.sidebarAcara
  },
  getSidebarProduk(state){
    return state.sidebarProduk
  },
  // get cors host
  getCorsHost(state){
    return state.corsHost
  }
}
