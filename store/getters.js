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
  getListRecentPagination(state){
    return state.recentLoginPagination
  }
}
