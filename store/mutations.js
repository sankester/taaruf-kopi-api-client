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
  // set welcome message
  setWelcomeMessage(state, status){
    state.welcomeMessage = status
  },
  // set recent login
  setRecentLogin(state, recentLogin){
    state.recentLogin = recentLogin
  },
  // update list
  updateRecentLogin(state, list){
    // loop
    list.forEach(function(element) {
      state.recentLogin.push(element)
    });
  },
  // set last page
  setLastRecentLoginPagination(state, pagination){
    state.recentLoginPagination = pagination
  },
  // set dashboard data
  setDasboardData(state, data){
    state.dashboardData = data
  }
}
