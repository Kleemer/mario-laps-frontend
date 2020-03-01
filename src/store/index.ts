import { VueConstructor } from 'vue'
import Vuex, {
  Store, MutationTree, ActionTree, StoreOptions, ModuleTree,
} from 'vuex'
import room from './modules/room'
import { resetMixin } from '@/store/utils'
import { User } from '@/types'

export interface RootState {
  player: User | Record<string, any>
}

const state = (): RootState => ({
  player: {
    id: null,
    username: null,
    avatar: null,
  },
})

export const mutations: MutationTree<RootState> = {
  ...resetMixin(state),
  setPlayer(state, payload) {
    state.player = payload
  },
  setPlayerId(state, payload) {
    state.player.id = payload
  },
  setPlayerUsername(state, payload) {
    state.player.username = payload
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
  reset({ commit }) {
    commit('reset')
    commit('room/reset')
  },
}

export const modules: ModuleTree<RootState> = { room }

export default (vue: VueConstructor): Store<RootState> => {
  vue.use(Vuex)

  return new Vuex.Store({
    state,
    mutations,
    actions,
    modules,
  })
}
