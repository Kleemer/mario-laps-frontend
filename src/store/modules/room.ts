import {
  Module, MutationTree, ActionTree,
} from 'vuex'
import { RootState } from '..'

export interface RoomState {
  id: string | null
  hostId: string | null
  users: Array<Record<string, any>>
}

const state: RoomState = {
  id: null,
  hostId: null,
  users: [],
}

const mutations: MutationTree<RoomState> = {
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

const actions: ActionTree<RoomState, RootState>  = {
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

const roomModule: Module<RoomState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
}

export default roomModule
