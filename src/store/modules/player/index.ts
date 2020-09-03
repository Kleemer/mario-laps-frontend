import { Module, ActionTree, ModuleTree } from 'vuex'
import { RootState } from '@/store/types'
import { PlayerState } from './types'
import LapModule from './laps'

const actions: ActionTree<PlayerState, RootState>  = {
  reset({ commit }) {
    commit('player/reset')
  },
}


const modules: ModuleTree<RootState> = {
  laps: { ...LapModule },
}

const playerModule: Module<PlayerState, RootState> = {
  namespaced: true,
  actions,
  modules,
}

export default playerModule
