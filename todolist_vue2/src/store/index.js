import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Login: parseInt(localStorage.getItem('Login')),
    token: localStorage.getItem('token'),
    Upload: parseInt(localStorage.getItem('Upload')) === 0 ? false : true,
    toChange: parseInt(localStorage.getItem('toChange')) === 0 ? false : true,
    todoCount: JSON.parse(localStorage.getItem('Count'))
  },
  getters: {},
  mutations: {
    Upload(state, Up) {
      state.Upload = Up
    }
  },
  actions: {},
  modules: {},
})
