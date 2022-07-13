import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Login: parseInt(localStorage.getItem('Login')),
    token: localStorage.getItem('token'),
    todo: []
  },
  getters: {
  },
  mutations: {
    todo(state, todo) {
      state.todo = todo
    }
  },
  actions: {
  },
  modules: {
  }
})
