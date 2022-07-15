import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Login: parseInt(localStorage.getItem('Login')),
    token: localStorage.getItem('token'),
    Upload: parseInt(localStorage.getItem('Upload')) === 0 ? false : true,
    todo: [],
    todoCount: JSON.parse(localStorage.getItem('Count'))
  },
  getters: {},
  mutations: {
    todo(state, todo) {
      state.todo = todo
    },
    Upload(state, Up) {
      state.Upload = Up
    }
  },
  actions: {},
  modules: {},
})
