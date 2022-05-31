import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import About from '../views/About'
import Dashboard from '../views/Dashboard'
import History from '../views/History'

Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/home/history',
      name: 'History',
      component: History
    }
  ]
})
