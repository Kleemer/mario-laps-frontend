import { VueConstructor } from 'vue'
import Vuex, {
  Store, MutationTree, ActionTree, StoreOptions, ModuleTree,
} from 'vuex'
import room from './modules/room'
import marioLap from './modules/mario-lap'
import rounds from './modules/rounds'
import races from './modules/races'
import ui from './modules/ui'
import player from './modules/player'
import { resetMixin } from '@/store/utils'
import { RootState } from './types'

const state = (): RootState => ({
  user: {
    id: null,
    username: null,
    avatar: null,
  },
  socketId: null,
})

export const mutations: MutationTree<RootState> = {
  ...resetMixin(state),
  setPlayer(state, payload) {
    state.user = payload
  },
  setPlayerId(state, payload) {
    state.user.id = payload
  },
  setPlayerUsername(state, payload) {
    state.user.username = payload
  },
  setSocketId(state, payload) {
    state.socketId = payload
  },
}

export const actions: ActionTree<RootState, RootState> = {
  setPlayer({ commit }, payload) {
    commit('setPlayer', payload)
  },
  setPlayerId({ commit }, payload) {
    commit('setPlayerId', payload)
  },
  setPlayerUsername({ commit }, payload) {
    commit('setPlayerUsername', payload)
  },
  setSocketId({ commit }, payload) {
    commit('setSocketId', payload)
  },
  reset({ commit }) {
    commit('reset')
    commit('room/reset')
    commit('marioLap/reset')
  },
}

export const modules: ModuleTree<RootState> = {
  room,
  marioLap,
  rounds,
  races,
  ui,
  player,
}

export const store: StoreOptions<RootState> = {
  state,
  mutations,
  actions,
  modules,
}

export default (vue: VueConstructor): Store<RootState> => {
  vue.use(Vuex)

  return new Vuex.Store<RootState>(store)
}
