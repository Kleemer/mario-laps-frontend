import Vue from 'vue'
import {
  Module, MutationTree, ActionTree, GetterTree,
} from 'vuex'
import { resetMixin } from '@/store/utils'
import { RootState } from '@/store/types'
import { RaceState, Race } from './types'

const state = (): RaceState => ({
  races: {},
})

const mutations: MutationTree<RaceState> = {
  ...resetMixin(state),
  addRace: (state, payload: Race) => {
    Vue.set(state.races, payload.id, payload)
  },
  updateRace: (state, { raceId, data }) => {
    const race: Race | undefined = state.races[raceId]
    if (!race) {
      return
    }

    Vue.set(state.races, raceId, { ...race, ...data })
  },
}

const actions: ActionTree<RaceState, RootState>  = {
  reset({ commit }) {
    commit('reset')
  },
  setRaces({ dispatch }, payload) {
    payload.forEach((race: Omit<Race, 'order'>) => dispatch('addRace', race))
  },
  addRace({ commit, state }, payload: Omit<Race, 'order'>) {
    const order: number = Object.values(state.races).length + 1
    commit('addRace', { ...payload, order })
  },
  updateRace({ commit }, payload: Omit<Race, 'order'>) {
    commit('updateRace', payload)
  },
  addRaceUsers({ commit }, { raceId, users }) {
    commit('updateRace', {
      raceId,
      data: { users },
    })
  },
}

export const getters: GetterTree<RaceState, RootState> = {
  last: (state) => {
    const races = Object.values(state.races)
    const orders = races.map(({ order }) => order)
    const maxOrder = Math.max(...orders)

    return races.find(({ order }) => order === maxOrder) || null
  },
}

const raceModule: Module<RaceState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default raceModule
