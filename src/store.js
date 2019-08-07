import Vue from 'vue'
import Vuex from 'vuex'
import axiosAuth from './axios-auth'
import router from './router'
import globalAxios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    error: '',
    user: null
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
    },
    STORE_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    signUp ({ commit, dispatch }, authData) {
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
          localStorage.setItem('userEmail', authData.email)

          dispatch('storeUser', authData)

          router.push({ name: 'dashboard' })
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data.error.message)

            commit('SET_ERROR',
              error.response.data.error.message)
          }
        })
    }, // closing signUp
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
          localStorage.setItem('userEmail', authData.email)

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
    }, // auto login when the user refresh the browser
    autologin ({commit}) {
      const token = localStorage.getItem('token')
      const expirationDate = localStorage.getItem('expirationDate')
      const userId = localStorage.getItem('userId')

      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      commit('AUTH_USER', {
        token: token,
        userId: userId
      })
    },
    storeUser ({state}, userData) {
      if (!state.idToken) {
        return
      }
      globalAxios.post('https://chou0120-week-12-8933b.firebaseio.com/users.json' + '?auth=' + state.idToken,
        userData)
        .then(res => console.log(res))
        .catch(error => console.log(error.message))
    }, // closing storeUser
    fetchUser ({ commit, state }, userEmail) {
      console.log('this is fetchuser')
      if (!state.idToken) {
        return
      }
      console.log('this is fetchuser1')
      globalAxios.get('https://chou0120-week-12-8933b.firebaseio.com/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log('this is fetchuser3')
          const data = res.data
          for (let key in data) {
            const user = data[key]
            if (user.email == userEmail) {
              console.log(user)
              commit('STORE_USER', user)
            }
            console.log('this is fetchuser2')
          }
        })
        .catch(error => console.log(error.response))
    }, // closing fetch User action
    updateUser ({state}) {
      globalAxios.patch('https://chou0120-week-12-8933b.firebaseio.com/users/' + state.user.id + '.json' + '?auth=' + state.idToken, {name: state.user.name})
        .then(res => {
          console.log(res)
        }).catch(error => console.log(error.response))
    }

  }, // closing actions
  getters: {
    isAuthenticated (state) {
      return state.idToken !== null
    },
    getUser (state) {
      return state.user
    }
  }
})
// AIzaSyAb28bqYgap0DBbJGCg_qlOZZ9Pk35TxOw
// https://chou0120-week-12-8933b.firebaseio.com/
