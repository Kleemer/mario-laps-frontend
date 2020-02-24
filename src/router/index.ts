import { VueConstructor } from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import auth from '@/middleware/auth'

export const routes = (): RouteConfig[] => [
  {
    path: '/',
    name: 'login',
    meta: {
      title: 'Utilisateur',
      anonymous: true,
    },
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: 'Jouer',
      anonymous: false,
    },
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/lobby',
    name: 'lobby',
    meta: {
      title: 'Jouer',
      anonymous: false,
    },
    component: () => import(/* webpackChunkName: "lobby" */ '../views/Lobby.vue'),
  },
  {
    path: '/join-room',
    name: 'join-room',
    meta: {
      title: 'Jouer',
      anonymous: false,
    },
    component: () => import(/* webpackChunkName: "join-room" */ '../views/JoinRoom.vue'),
  },
]

export const createRouter = (): Router => {
  const router = new Router({
    mode: 'history',
  })
  router.addRoutes(routes())

  return router
}

export default (vue: VueConstructor): Router => {
  vue.use(Router)

  const router = createRouter()
  router.beforeEach(auth())

  return router
}
