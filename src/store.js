import Vue from 'vue'
import Vuex from 'vuex'
import axiosAuth from './axios-auth'
import router from './router'

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
    },
    CLEAR_DATA (state) {
      state.idToken = null
      state.userId = null
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
          // save the auth info in the state
          commit('AUTH_USER', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          // Local Storage
          const now = new Date()
          const expires = new Date(
            now.getTime() + res.data.expiresIn * 1000)

          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expires)

          router.push({ name: 'dashboard' })
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
          const now = new Date()
          const expires = new Date(
            now.getTime() + res.data.expiresIn * 1000)

          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expires)

          router.push({ name: 'dashboard' })
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
    },
    logout ({commit}) {
      localStorage.removeItem('token')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('userId')

      // commit mutation to clear the page

      commit('CLEAR_DATA')

      // send the user to signin page
      router.push({name: 'signin'})
    }
  }, // closing actions
  getters: {
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
})
// AIzaSyAb28bqYgap0DBbJGCg_qlOZZ9Pk35TxOw
