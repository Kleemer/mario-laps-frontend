import Vue from 'vue'
import {
  Module, MutationTree, ActionTree, GetterTree,
} from 'vuex'
import { resetMixin } from '@/store/utils'
import { RootState } from '@/store/types'
import { RoundState } from './types'
import { last } from '@/shared/array'
import { Race, Round } from '@/types'
import { RoundAndRace } from '@/api/routes/round'

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
  addRoundRace: (state, payload: { roundId: Round['id'], raceId: Race['id'] }) => {
    state.rounds[payload.roundId].raceIds.push(payload.raceId)
  },
  removeRoundRace: (state, payload: { roundId: Round['id'], raceId: Race['id'] }) => {
    state.rounds[payload.roundId].raceIds = state
      .rounds[payload.roundId]
      .raceIds
      .filter((e) => e !== payload.raceId)
  },
}

const actions: ActionTree<RoundState, RootState>  = {
  reset({ commit, dispatch }) {
    commit('reset')
    dispatch('races/reset', null, { root: true })
  },
  addRound({ commit }, payload: RoundAndRace) {
    commit('addRound', payload.round)
    commit('races/addRaceList', null, { root: true })
    commit('races/addRace', payload.race, { root: true })
  },
}

export const getters: GetterTree<RoundState, RootState> = {
  current: (state) => {
    const lastRoundId = last(state.roundList)

    return state.rounds[lastRoundId!]
  },
  roundsArray: (state) => Object.values(state.rounds),
}

const roundModule: Module<RoundState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default roundModule
