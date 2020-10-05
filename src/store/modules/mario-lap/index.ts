import {
  Module, MutationTree, ActionTree,
} from 'vuex'
import { resetMixin } from '@/store/utils'
import { RootState } from '@/store/types'
import { MarioLapState } from './types'
import { MarioLap } from '@/types'

const state = (): MarioLapState => ({
  id: null,
})

const mutations: MutationTree<MarioLapState> = {
  ...resetMixin(state),
  setId: (state, payload) => {
    state.id = payload
  },
}

const actions: ActionTree<MarioLapState, RootState>  = {
  reset({ commit, dispatch }) {
    commit('reset')
    dispatch('rounds/reset', null, { root: true })
  },
  setMarioLap({ commit }, marioLap: MarioLap) {
    commit('setId', marioLap.id)
  },
}

const marioLapModule: Module<MarioLapState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
}

export default marioLapModule
