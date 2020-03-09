import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import OwnerSettings from '../views/OwnerSettings.vue'
import GlobalSettings from '../views/GlobalSettings.vue'
import AppFeedback from '../views/AppFeedback.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import OTPVerify from '../views/OTPVerify.vue'
import store from '../store/index';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/OTPVerify',
    name: 'OTPVerify',
    component: OTPVerify
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'ownerSettings',
        name: 'Owner Settings',
        component: OwnerSettings
      },
      {
        path: 'globalSettings',
        name: 'globalSettings',
        component: GlobalSettings
      },
      {
        path: 'appFeedback',
        name: 'App Feedback',
        component: AppFeedback
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})
// Routes Guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) { 
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else {
    next() 
  }
})
export default router
