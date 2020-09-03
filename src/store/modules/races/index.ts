import Vue from 'vue'
import {
  Module, MutationTree, ActionTree, GetterTree,
} from 'vuex'
import { resetMixin } from '@/store/utils'
import { RootState } from '@/store/types'
import { RaceState, Race } from './types'
import { last } from '@/shared/array'

const state = (): RaceState => ({
  races: {},
  raceList: [],
})

const mutations: MutationTree<RaceState> = {
  ...resetMixin(state),
  addRace: (state, payload: Race) => {
    Vue.set(state.races, payload.id, payload)
    last(state.raceList).push(payload.id)
  },
  addRaceList: (state) => {
    state.raceList.push([])
  },
  updateRace: (state, { raceId, data }) => {
    const race: Race | undefined = state.races[raceId]
    if (!race) {
      return
    }

    Vue.set(state.races, raceId, { ...race, ...data })
  },
}

const actions: ActionTree<RaceState, RootState> = {
  reset({ commit }) {
    commit('reset')
  },
  setRaces({ commit, dispatch }, payload) {
    commit('addRaceList')
    payload.forEach((race: Race) => dispatch('addRace', race))
  },
  addRace({ commit }, payload: Race) {
    commit('addRace', payload)
  },
  updateRace({ commit }, payload: Race) {
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
  current: (state) => {
    const lastRaceId = last(last(state.raceList))

    return state.races[lastRaceId]
  },
  racesArray: (state) => Object.values(state.races),
}

const raceModule: Module<RaceState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default raceModule
