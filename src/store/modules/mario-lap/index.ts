import {
  Module, MutationTree, ActionTree, ModuleTree,
} from 'vuex'
import { resetMixin } from '@/store/utils'
import rounds from './rounds'
import { RootState } from '@/store/types'
import { MarioLapState } from './types'

const state = (): MarioLapState => ({
  id: null,
})

const mutations: MutationTree<MarioLapState> = {
  ...resetMixin(state),
  setId: (state, payload) => {
    state.id = payload
  },
}

const actions: ActionTree<MarioLapState, RootState>  = {
  reset({ commit, dispatch }) {
    commit('reset')
    dispatch('rounds/reset')
  },
  setMarioLap({ dispatch }, { id, rounds }) {
    dispatch('setId', id)
    dispatch('rounds/setRounds', rounds)
  },
  setId({ commit }, payload) {
    commit('setId', payload)
  },
}

const modules: ModuleTree<RootState> = {
  rounds,
}

const marioLapModule: Module<MarioLapState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  modules,
}

export default marioLapModule
