// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
import './assets/css/global.css'

Vue.config.productionTip = false
// 路由守航
router.beforeEach((to, from, next) => {
  if (store.state.username) {
    initMenu(router, store)
  }
  if (store.state.username && to.path.startsWith('/login')) {
    next({
      name: 'Welcome'
    })
  }
  // 如果前端没有登录信息则直接拦截，如果有则判断后端是否正常登录（防止构造参数绕过）
  if (to.meta.requireAuth) {
    if (store.state.username) {
      axios.get('/authentication').then(resp => {
        if (resp) {
          next()
        }
      })
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
}
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  components: {App},
  template: '<App/>'
})
