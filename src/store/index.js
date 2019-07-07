import Vue from 'vue'
import Vuex from 'vuex'
import { setCookie, removeCookie } from '@/utils/auth'
import Cookies from 'js-cookie'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info: {
      // token: window.localStorage.getItem('info') == null ? '' : window.localStorage.getItem('info' || '').token,
      // token: window.localStorage.getItem('info') == null ? '' : window.localStorage.getItem('info' || '[]').token,
      // name: window.localStorage.getItem('info') == null ? '' : window.localStorage.getItem('info' || '').name
      token: Cookies.get('USER_TOKEN'),
      name: Cookies.get('USER_NAME')
    }
  },
  mutations: {
    login (state, loginInfo) {
      state.info = loginInfo
      // console.log(state.info)
      // window.localStorage.setItem('info', loginInfo)
      setCookie('USER_TOKEN', loginInfo.token)
      setCookie('USER_NAME', loginInfo.name)
    },
    logout (state) {
      removeCookie('USER_TOKEN')
      removeCookie('USER_NAME')
      // window.localStorage.removeItem('info')
      state.info.token = null
      state.info.name = null
    }
  }
})
