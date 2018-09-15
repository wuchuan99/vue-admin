import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import welcome from '@/components/welcome'
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
      children: [
        {
          path: 'welcome',
          component: welcome
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('user')
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
