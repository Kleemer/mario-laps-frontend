import Vue from 'vue'
import {
  Module, MutationTree, ActionTree, ModuleTree, GetterTree,
} from 'vuex'
import { resetMixin } from '@/store/utils'
import { RootState } from '@/store/types'
import RaceModule from '@/store/modules/race'
import { RoundState, Round } from './types'

const state = (): RoundState => ({
  rounds: {},
})

const mutations: MutationTree<RoundState> = {
  ...resetMixin(state),
  addRound: (state, payload: Round) => {
    Vue.set(state.rounds, payload.id, payload)
  },
}

const actions: ActionTree<RoundState, RootState>  = {
  reset({ commit }) {
    commit('reset')
  },
  setRounds({ dispatch }, payload) {
    payload.forEach((round: Omit<Round, 'order'>) => dispatch('addRound', round))
  },
  addRound({ commit, dispatch, state }, payload: Omit<Round, 'order'>) {
    const order: number = Object.values(state.rounds).length + 1
    commit('addRound', { ...payload, order })
    dispatch('races/setRaces', payload.races)
  },
}

const modules: ModuleTree<RootState> = {
  races: { ...RaceModule },
}

export const getters: GetterTree<RoundState, RootState> = {
  last: (state) => {
    const rounds = Object.values(state.rounds)
    const orders = rounds.map(({ order }) => order)
    const maxOrder = Math.max(...orders)

    return rounds.find(({ order }) => order === maxOrder) || null
  },
}

const roundModule: Module<RoundState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  modules,
  getters,
}

export default roundModule
