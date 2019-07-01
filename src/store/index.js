import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info: {
      token: window.localStorage.getItem('info ' || '[]') == null ? '' : window.localStorage.getItem('info' || '[]').token,
      name: window.localStorage.getItem('info ' || '[]') == null ? '' : window.localStorage.getItem('info' || '[]').name
    }
  },
  mutations: {
    login (state, loginInfo) {
      state.info = loginInfo
      // console.log(state.info)
      window.localStorage.setItem('info', loginInfo)
    },
    logout (state) {
      window.localStorage.removeItem('info')
      state.info = null
    }
  }
})
