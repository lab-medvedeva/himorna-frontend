import Vue from 'vue'
import VueRouter from 'vue-router'
// import axios from 'axios'
// import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('@/views/Help')
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('@/views/Result')
  },
  {
    path: '/info/histone/:id',
    name: 'histone',
    component: () => import('@/views/Histone')
  },
  {
    path: '/info/lncrna/:id',
    name: 'lncrna',
    component: () => import('@/views/LncRNA')
  },
  {
    path: '/info/gene/:id',
    name: 'gene',
    component: () => import('@/views/Gene')
  },
  {
    path: '/info/corr',
    name: 'Corr',
    component: () => import('@/views/Corr')
  },
  { 
    path: '/404', 
    name: '404', 
    component: () => import('@/views/Wrong'), 
  }, 
  { 
    path: '*', 
    redirect: '/404' 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
