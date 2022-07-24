import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Login: parseInt(localStorage.getItem('Login')),
    token: localStorage.getItem('token'),
    Upload: parseInt(localStorage.getItem('Upload')) === 0 ? false : true,
    toChange: parseInt(localStorage.getItem('toChange')) === 0 ? false : true,
    Count: {
      finishi: 0,
      upcoming: 0,
      is_delete: 0,
    },
  },
  getters: {},
  mutations: {
    Upload(state, Up) {
      state.Upload = Up
    },
    toCountData(state, data) {
      state.Count.finishi = data.finishi
      state.Count.upcoming = data.upcoming
      state.Count.is_delete = data.is_delete
    },
  },
  actions: {
    CountData(state, data) {
      this.commit('toCountData',data)
    },
  },
  modules: {},
})
