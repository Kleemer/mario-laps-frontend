import {
  Module, MutationTree, ActionTree,
} from 'vuex'
import { RootState } from '@/store'
import { resetMixin } from '@/store/utils'

interface User {
  id: string
  position: number
}

interface Race {
  id: string
  users: User[]
}

interface Round {
  id: string
  races: Race[]
}

export interface MarioLapState {
  id: string | null
  rounds: Round[]
}

const state = (): MarioLapState => ({
  id: null,
  rounds: [],
})

const mutations: MutationTree<MarioLapState> = {
  ...resetMixin(state),
  setId: (state, payload) => {
    state.id = payload
  },
  setRounds: (state, payload) => {
    state.rounds = payload
  },
  addRound: (state, payload) => {
    state.rounds.push(payload)
  },
  addRace: (state, { roundId, race }) => {
    state.rounds
      .find(({ id }) => id === roundId)
      ?.races.push(race)
  },
}

const actions: ActionTree<MarioLapState, RootState>  = {
  reset({ commit }) {
    commit('reset')
  },
  setMarioLap({ commit }, { id, rounds }) {
    commit('setId', id)
    commit('setRounds', rounds)
  },
  setId({ commit }, payload) {
    commit('setId', payload)
  },
  addRound({ commit }, payload) {
    commit('addRound', payload)
  },
  addRace({ commit }, payload) {
    commit('addRace', payload)
  },
}

const marioLapModule: Module<MarioLapState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
}

export default marioLapModule
