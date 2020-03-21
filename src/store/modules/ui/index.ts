import { Module, ActionTree, ModuleTree } from 'vuex'
import { RootState } from '@/store/types'
import { UIState } from './types'
import GameModule from './game'

const actions: ActionTree<UIState, RootState>  = {
  reset({ commit }) {
    commit('game/reset')
  },
}


const modules: ModuleTree<RootState> = {
  game: { ...GameModule },
}

const uiModule: Module<UIState, RootState> = {
  namespaced: true,
  actions,
  modules,
}

export default uiModule
