import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    player: null,
    room: null,
  },
  mutations: {
    SET_PLAYER : (state, payload) => {
      state.player = payload
    },
    SET_ROOM : (state, payload) => {
      state.room = payload
    },
  },
  actions: {
    SET_PLAYER: (context, payload) => {
      context.commit('SET_PLAYER', payload)
    },
    SET_ROOM: (context, payload) => {
      context.commit('SET_ROOM', payload)
    },
  },
  modules: {
  },
});
