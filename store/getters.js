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
  }
}
