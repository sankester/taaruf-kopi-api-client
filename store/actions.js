import Cookie from "js-cookie";

export default {
  // authenticate user to get access token
  async authenticateUser(vuexContext , authData){
    // set parameter
    let params  = {
      client_id : process.env.client_id,
      client_secret :  process.env.client_secret,
      grant_type :  process.env.grant_type,
      username :authData.username,
      password : authData.password,
      scope : process.env.scope
    }
    // send data to API server
    await this.$axios.$post('oauth/token', params).then((res) => {
      // commit token into vuex
      vuexContext.commit('setToken', res.access_token)
      // save data in local storage
      localStorage.setItem('taToken', res.access_token)
      localStorage.setItem('taTokenExpiration', new Date().getTime() + Number.parseInt(res.expires_in) * 1000)
      // set data cookies
      Cookie.set('taToken', res.access_token)
      Cookie.set('taTokenExpiration', new Date().getTime() + Number.parseInt(res.expires_in) * 1000)
      // set token additional header
      let tokenHeaders = {
        headers: {'Authorization': "Bearer "+ res.access_token}
      }
      // get detail user
      this.$axios.$get('/oauth/data', tokenHeaders).then((resUser) => {
        // commit set auth user
        vuexContext.commit('setUser', resUser.data)
      })
    })
  },
  // get auth data user
  async getAuthUser(vuexContext){
    if(vuexContext.state.token !=  null){
      if(vuexContext.state.authUser.nama == null || vuexContext.state.authUser.email == "" ){
        // set token additional header
        let tokenHeaders = {
          headers: {'Authorization': "Bearer "+ vuexContext.state.token}
        }
        // get detail user
        await this.$axios.$get('/oauth/data', tokenHeaders).then((resUser) => {
          // commit set auth user
          vuexContext.commit('setUser', resUser.data)
        })
      }
    }
  },
  // set logout action
  logout(vuexContext, revoke){
    if(revoke){
      this.$axios.$delete('oauth/logout',{
        headers: { 'Authorization': "Bearer "+ vuexContext.state.token }
      })
    }
    vuexContext.commit('clearToken')
    Cookie.remove('taToken')
    Cookie.remove('taTokenExpiration')
    if(process.client){
      localStorage.removeItem('taToken')
      localStorage.removeItem('taTokenExpiration')
    }
  },
  // cek authenticate data for  multiple page request
  initAuth(vuexContext, req){
    // declare variable
    let token;
    let expirationDate;
    // cek request is server or client
    if(req){
      // cek cookies header
      if(!req.headers.cookie){
        return
      }
      // get token from cookies
      const taCookie = req.headers.cookie.split(';').find( c => c.trim().startsWith('taToken='))
      // cek token
      if(! taCookie){
        return
      }
      // initial to variable
      token = taCookie.split('=')[1]
      expirationDate = req.headers.cookie.split(';').find( c => c.trim().startsWith('taTokenExpiration=')).split('=')[1]
    }else{
      // save in local storage for client process
      token = localStorage.getItem('taToken')
      expirationDate = localStorage.getItem('taTokenExpiration')
    }
    // cek expiration date token
    if(new Date().getTime() > + expirationDate || !token){
      // commit clear token
      vuexContext.dispatch('logout', false)
      return
    }
    // conmmit set token
    vuexContext.commit('setToken', token)
  },
  // get rrecent login
  async getRecentLogin(vuexContext){
    // set token additional header
    let tokenHeaders = {
      headers: {'Authorization': "Bearer "+ vuexContext.state.token}
    }
    // send data to API server
    await this.$axios.$get('oauth/recent', tokenHeaders).then((res) => {
      // commit list recent into vuex
      vuexContext.commit('setRecentLogin', res.data)
      vuexContext.commit('setLastRecentLoginPagination', res.meta.pagination)
    })
  },
  async loadMoreRecentLogin(vuexContext, url) {
    // set token additional header
    let tokenHeaders = {
      headers: { 'Authorization': "Bearer " + vuexContext.state.token}
    }
    // get data user from API Server
    return await this.$axios.$get(url, tokenHeaders)
  },
  // revoke token
  async revokeToken(vuexContext, tokenID){
    // set token additional header
    let tokenHeaders = {
      headers: {'Authorization': "Bearer "+ vuexContext.state.token}
    }
    // send data to API server
    await this.$axios.$get('oauth/revoke/' + tokenID, tokenHeaders).then((res) => {
      // commit list recent into vuex
      vuexContext.commit('setRevokeToken', tokenID)
    })
  },
  async getDashboardData(){
    // set token additional header
    let tokenHeaders = {
      headers: {'Authorization': "Bearer "+ vuexContext.state.token}
    }
    // send data to API server
    await this.$axios.$get('dashboard', tokenHeaders).then((res) => {
      // commit list recent into vuex
      vuexContext.commit('setDasboardData', res)
    })
  },
  async initHost(vuexContext, req){
    // get host
    let host = req ? req.headers.host : window.location.host
    // conmmit set token
    vuexContext.commit('setCorsHost', host)
  }
}
