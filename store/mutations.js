export default {
  // set token
  setToken(state, token){
    state.token = token
  },
  // clear token
  clearToken(state){
    state.token = null
  },
  // set user login
  setUser(state, authUser){
    state.authUser = authUser
  },
}
