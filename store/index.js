import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import modules from './modules'

const createStore = () => {
  return new Vuex.Store({
    // deklarasi state
    state,
    // deklarasi mutation
    mutations,
    // set action
    actions,
    // getters function
    getters,
    // modules
    modules
  })
}
export default createStore
