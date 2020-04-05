import Vue from 'vue'
import {
  Module, MutationTree, ActionTree, GetterTree,
} from 'vuex'
import { resetMixin } from '@/store/utils'
import { RootState } from '@/store/types'
import { RoundState, Round } from './types'
import { Data as RoundData } from '@/api/types/routes/round'
import { last } from '@/shared/array'

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
  setRounds({ dispatch }, payload) {
    payload.forEach((round: RoundData) => dispatch('addRound', round))
  },
  addRound({ commit, dispatch }, payload: RoundData) {
    commit('addRound', {
      id: payload.id,
      races: payload.races.map(({ id }) => id),
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
