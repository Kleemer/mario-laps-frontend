import { VueConstructor } from 'vue'
import Vuex, {
  Store, MutationTree, ActionTree, StoreOptions, ModuleTree,
} from 'vuex'
import room from './modules/room'

export interface RootState {
  player: string | null
  roomId: string | null
}

const state: RootState = {
  player: null,
  roomId: null,
}

export const mutations: MutationTree<RootState> = {
  setPlayer(state, payload) {
    state.player = payload
  },
  setRoomId(state, payload) {
    state.roomId = payload
  },
}

export const actions: ActionTree<RootState, RootState> = {
  setPlayer({ commit }, payload) {
    commit('setPlayer', payload)
  },
  setRoomId({ commit, dispatch }, payload) {
    commit('setRoomId', payload)
    dispatch('room/setId', payload)
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
