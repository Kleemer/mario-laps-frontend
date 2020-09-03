import { Module, MutationTree, ActionTree } from 'vuex'
import { resetMixin } from '@/store/utils'
import { RootState } from '@/store/types'
import { GameState } from './types'

const state = (): GameState => ({
  position: 0,
  submitted: false,
})

const mutations: MutationTree<GameState> = {
  ...resetMixin(state),
  setPosition: (state, payload) => {
    state.position = payload
  },
  setSubmitted: (state, payload) => {
    state.submitted = payload
  },
}

const actions: ActionTree<GameState, RootState>  = {
  reset({ commit }, keep) {
    commit('reset', keep)
  },
  setPosition({ commit }, position) {
    commit('setPosition', position)
  },
  setSubmitted({ commit }, submitted) {
    commit('setSubmitted', submitted)
  },
}

const gameModule: Module<GameState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
}

export default gameModule
