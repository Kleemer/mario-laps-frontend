import {
  Module, MutationTree, ActionTree, GetterTree,
} from 'vuex'
import { resetMixin } from '@/store/utils'
import { RootState } from '@/store/types'
import { RoomState } from './types'

const state = (): RoomState => ({
  id: null,
  hostId: null,
  users: [],
})

const mutations: MutationTree<RoomState> = {
  ...resetMixin(state),
  setId: (state, payload) => {
    state.id = payload
  },
  setHostId: (state, payload) => {
    state.hostId = payload
  },
  setUsers: (state, payload) => {
    state.users = payload
  },
  addUser: (state, payload) => {
    if (!state.users.length) {
      state.hostId = payload.id
    }

    state.users.push(payload)
  },
  removeUser: (state, payload) => {
    state.users = state.users.filter((user) => user.id !== payload.id)

    if (!state.users.length) {
      state.hostId = null
    }
  },
}

const actions: ActionTree<RoomState, RootState> = {
  reset({ commit }) {
    commit('reset')
  },
  setRoom({ dispatch }, payload) {
    dispatch('setId', payload.id)
    dispatch('setHostId', payload.hostId)
    dispatch('setUsers', payload.users)
  },
  setId({ commit }, payload) {
    commit('setId', payload)
  },
  setHostId({ commit }, payload) {
    commit('setHostId', payload)
  },
  setUsers({ commit }, payload) {
    commit('setUsers', payload)
  },
  addUser({ commit }, payload) {
    commit('addUser', payload)
  },
  removeUser({ commit }, payload) {
    commit('removeUser', payload)
  },
}

const getters: GetterTree<RoomState, RootState> = {
  users: (state) => state.users,
}

const roomModule: Module<RoomState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default roomModule
