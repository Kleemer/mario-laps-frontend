import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/lobby',
    name: 'lobby',
   component: () => import(/* webpackChunkName: "lobby" */ '../views/Lobby.vue'),
  },
  {
    path: '/join-room',
    name: 'join-room',
    component: () => import(/* webpackChunkName: "join-room" */ '../views/JoinRoom.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
