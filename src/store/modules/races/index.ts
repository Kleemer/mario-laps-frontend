import Vue from 'vue'
import {
  Module, MutationTree, ActionTree, GetterTree,
} from 'vuex'
import { resetMixin } from '@/store/utils'
import { RootState } from '@/store/types'
import { RaceState } from './types'
import { last } from '@/shared/array'
import { Race, Round } from '@/types/models'
import { Maybe } from '@/api'

const state = (): RaceState => ({
  races: {},
  raceList: [],
})

const mutations: MutationTree<RaceState> = {
  ...resetMixin(state),
  addRace: (state, payload: Race) => {
    Vue.set(state.races, payload.id, payload)
    last(state.raceList)?.push(payload.id)
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
  removeRace: (state, raceId: Race['id']) => {
    Vue.delete(state.races, raceId)
    const raceList = last(state.raceList)

    if (raceList) {
      state.raceList[state.raceList.length - 1] = state
        .raceList[state.raceList.length - 1]
        .filter((e) => e !== raceId)
    }
  },
}

const actions: ActionTree<RaceState, RootState> = {
  reset({ commit }) {
    commit('reset')
  },
  setRaces({ commit, dispatch }, payload: Race[]) {
    commit('addRaceList')
    payload.forEach((race: Race) => dispatch('addRace', race))
  },
  addRace({ commit }, race: Race) {
    commit('addRace', race)
    commit(
      'rounds/addRoundRace',
      { roundId: race.roundId, raceId: race.id },
      { root: true },
    )
  },
  updateRace({ commit }, payload: Race) {
    commit('updateRace', payload)
  },
  removeRace({ commit }, payload: { roundId: Round['id'], raceId: Race['id'] }) {
    commit('removeRace', payload.raceId)
    commit(
      'rounds/removeRoundRace',
      { roundId: payload.roundId, raceId: payload.raceId },
      { root: true },
    )
  },
  addUserRaces(
    { commit },
    { raceId, userRaces }: { raceId: Race['id'], userRaces: Race['userRaces'] },
  ) {
    commit('updateRace', { raceId, data: { userRaces } })
  },
}

export const getters: GetterTree<RaceState, RootState> = {
  find: (state) => (id: Race['id']): Maybe<Race> => {
    return Object.values(state.races).find((e) => e.id === id) || null
  },
  current: (state): Race => {
    const lastRaceId = last(last(state.raceList)!)

    return state.races[lastRaceId!]
  },
  racesArray: (state): Race[] => Object.values(state.races),
  allRacesArray: (state, getters, rootState, rootGetters): Race[] => {
    const rounds = rootGetters['rounds/roundsArray'] as Round[]

    return rounds.reduce((acc, round) => {
      return round.raceIds.reduce((acc2, raceId) => {
        const race: Maybe<Race> = getters.find(raceId)
        return race ? [ ...acc2, race] : acc2
      }, acc)
    }, new Array())
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
