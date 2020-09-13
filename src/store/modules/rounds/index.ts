import Vue from 'vue'
import {
  Module, MutationTree, ActionTree, GetterTree,
} from 'vuex'
import { resetMixin } from '@/store/utils'
import { RootState } from '@/store/types'
import { RoundState } from './types'
import { last } from '@/shared/array'
import { Round } from '@/types'

const state = (): RoundState => ({
  rounds: {},
  roundList: [],
})

const mutations: MutationTree<RoundState> = {
  ...resetMixin(state),
  addRound: (state, payload: Round) => {
    Vue.set(state.rounds, payload.id, payload)
    state.roundList.push(payload.id)
  },
}

const actions: ActionTree<RoundState, RootState>  = {
  reset({ commit, dispatch }) {
    commit('reset')
    dispatch('races/reset', null, { root: true })
  },
  setRounds({ dispatch }, payload: Round[]) {
    payload.forEach((round) => dispatch('addRound', round))
  },
  addRound({ commit, dispatch }, payload: Round) {
    commit('addRound', {
      id: payload.id,
      races: payload.races.map((e) => e.id),
    })
    dispatch('races/setRaces', payload.races, { root: true })
  },
}

export const getters: GetterTree<RoundState, RootState> = {
  current: (state) => {
    const lastRoundId = last(state.roundList)

    return state.rounds[lastRoundId]
  },
}

const roundModule: Module<RoundState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default roundModule
