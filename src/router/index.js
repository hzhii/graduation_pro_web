import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('@/components/Login'),
  },
  {
    path: '/login',
    component: () => import('@/components/Login'),
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      requireAuth: true
    },
    component: () => import('@/components/system/Index'), 
    children: []
  },
  {
    path: '*',
    component: () => import('@/components/ErrorPage/404Page')
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router

