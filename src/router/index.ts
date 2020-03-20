import { VueConstructor } from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import auth from '@/middleware/auth'
import { Store } from 'vuex'
import { RootState } from '@/store/types'
import GameLayout from '@/components/layouts/GameLayout.vue'

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
    path: '/join-room',
    name: 'join-room',
    meta: {
      title: 'Jouer',
      anonymous: false,
    },
    component: () => import(/* webpackChunkName: "join-room" */ '../views/JoinRoom.vue'),
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
    path: '/game',
    name: 'game',
    meta: {
      title: 'Jouer',
      anonymous: true,
      layout: GameLayout,
    },
    component: () => import(/* webpackChunkName: "game" */ '../views/Game.vue'),
  },
]

export const createRouter = (): Router => {
  const router = new Router({
    mode: 'history',
  })
  router.addRoutes(routes())

  return router
}

export default (vue: VueConstructor, store: Store<RootState>): Router => {
  vue.use(Router)

  const router = createRouter()
  router.beforeEach(auth(store))

  return router
}
