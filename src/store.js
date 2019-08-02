import Vue from 'vue'
import Vuex from 'vuex'
import axiosAuth from './axios-auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    error: ''
  },
  mutations: {
    AUTH_USER (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    SET_ERROR (state, errorMessage) {
      state.error = errorMessage
    },
    EMPTY_ERROR (state) {
      state.error = ''
    }
  },
  actions: {
    signUp ({ commit }, authData) {
      axiosAuth.post('accounts:signUp?key=AIzaSyAb28bqYgap0DBbJGCg_qlOZZ9Pk35TxOw', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('AUTH_USER', {
            token: res.data.idToken,
            userId: res.data.localId
          })
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data.error.message)

            commit('SET_ERROR',
              error.response.data.error.message)
          }
        })
    },
    signIn ({ commit }, authData) {
      axiosAuth.post('accounts:signInWithPassword?key=AIzaSyAb28bqYgap0DBbJGCg_qlOZZ9Pk35TxOw', {
        email: authData.email,
        password: authData.password,
        returnSecuretoken: true
      })
        .then(res => {
          console.log(res)
          commit('AUTH_USER', {
            token: res.data.idToken,
            userId: res.data.localId
          })
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data.error.message)

            commit('SET_ERROR',
              error.response.data.error.message)
          }
        })
    }, // closing signIn

    clearError ({commit}) {
      commit('EMPTY_ERROR')
    }

  }
})
// AIzaSyAb28bqYgap0DBbJGCg_qlOZZ9Pk35TxOw
