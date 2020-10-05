import { Module, MutationTree, ActionTree } from 'vuex'
import { resetMixin } from '@/store/utils'
import { RootState } from '@/store/types'
import { LapState } from './types'
import { getLap } from '@/shared/lap'
import { Race } from '@/types/models'

const state = (): LapState => ({
  laps: 0,
  streak: 0,
})

const mutations: MutationTree<LapState> = {
  ...resetMixin(state),
  setLaps: (state, payload) => {
    state.laps = payload
  },
  addLaps: (state, payload) => {
    state.laps = state.laps + payload
  },
  removeLaps: (state, payload) => {
    state.laps = state.laps - payload
  },
  setStreak: (state, payload) => {
    state.streak = payload
  },
}

const actions: ActionTree<LapState, RootState>  = {
  reset({ commit }, keep) {
    commit('reset', keep)
  },
  addLaps({ commit, rootState, rootGetters }) {
    const playerId = rootState.user.id
    const roomUsers = rootGetters['room/users']
    const allRaces = rootGetters['races/allRacesArray'] as Race[]

    const laps = getLap(
      allRaces,
      playerId,
      roomUsers.length,
    )

    commit('addLaps', laps)
  },
  removeLaps({ commit, rootState, rootGetters }) {
    const playerId = rootState.user.id
    const roomUsers = rootGetters['room/users']
    const allRaces = rootGetters['races/allRacesArray'] as Race[]

    const laps = getLap(
      allRaces,
      playerId,
      roomUsers.length,
    )

    commit('removeLaps', laps)
  },
  setLaps({ commit }, laps) {
    commit('setLaps', laps)
  },
  setStreak({ commit }, position) {
    commit('setStreak', position)
  },
}

const gameModule: Module<LapState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
}

export default gameModule
