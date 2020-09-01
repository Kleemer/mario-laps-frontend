import { Module, MutationTree, ActionTree } from 'vuex'
import { resetMixin } from '@/store/utils'
import { RootState } from '@/store/types'
import { GameState } from './types'

const state = (): GameState => ({
  laps: 0,
  position: 0,
  submitted: false,
})

const mutations: MutationTree<GameState> = {
  ...resetMixin(state),
  setLaps: (state, payload) => {
    state.laps = payload
  },
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
  setLaps({ commit }, laps) {
    commit('setLaps', laps)
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
