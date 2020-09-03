import { Module, MutationTree, ActionTree } from 'vuex'
import { resetMixin } from '@/store/utils'
import { RootState } from '@/store/types'
import { LapState } from './types'
import { getLap, getLapRace } from '@/shared/lap'
import { Race } from '../../races/types'

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
    // @todo get all races from all rounds
    const racesArray = rootGetters['races/racesArray'] as Race[]

    const laps = getLap(
      racesArray.filter((_, index) => index !== racesArray.length - 1),
      playerId,
      roomUsers.length,
    )

    commit('addLaps', laps)
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
