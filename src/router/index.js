import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import welcome from '@/components/welcome'
import user from '@/components/User'
Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: 'welcome',
          component: welcome
        },
        {
          path: 'user',
          component: user
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('mytoken')
  if(token){
    next()
  } else {
      if(to.path == '/login'){
        next()
      } else {
        next({path: '/login'})
      }
  }
})
export default router
