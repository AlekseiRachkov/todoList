import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todo: []
  },
  mutations: {
    updateTodo(state, todos) {
      state.todo = todos
    },
    createTodo(state, newTodos) {
      state.todo.unshift(newTodos)
    }
  },
  actions: {

  },
  getters: {
    allTodo(state) {
      if (localStorage.getItem('todo')) {
        try {
          state.todo = JSON.parse(localStorage.getItem('todo')); 
        } catch(e) {
          localStorage.removeItem('todo');
        }
      }
      return state.todo
    }
  },
  modules: {
  }
})