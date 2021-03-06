// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI, { zIndex: 202 })
Vue.prototype.$axios = axios

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    next()
    return
  }
  var name = store.state.info.name
  if (name === undefined || name === '' || name === null) {
    next({path: '/', query: {redirect: to.path}})
    // if (to.meta.requireAuth || to.name == null) {
    // if (to.meta.requireAuth || to.name in pages) {
    //   next({path: '/', query: {redirect: to.path}})
    //   // next()
    // } else {
    //   next({path: '/', query: {redirect: to.path}})
    // }
  } else {
    next()
  }
}
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
