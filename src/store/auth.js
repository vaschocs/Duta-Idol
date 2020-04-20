import axios from 'axios'
export default {
    namespaced: true,

    state: {
        token: null,
        user: null
    },

    getters: {
        authenticated(state) {
            return state.token && state.user
        },
        user(state) {
            return state.user
        }
    },

    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USER(state, data) {
            state.user = data
        }
    },
    actions: {
        async signIn({ dispatch }, credentials) {
            let response = await axios.post('login', credentials)

            return dispatch('attempt', response.data.token)
        },
        async attempt({ commit, state }, token) {
            if (token) {
                commit('SET_TOKEN', token)
            }
            if (!state.token) {
                return
            }
            try {
                const response = await axios.get('user')
                commit('SET_USER', response.data.user)

            } catch (e) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
                console.log(e)
                console.log(e.response.data.error)
                alert(e + '\n' + e.response.data.error)
            }
        },
        signOut({ commit }) {
            try {
                return axios.post('logout').then(() => {
                    commit('SET_TOKEN', null)
                    commit('SET_USER', null)
                })
            } catch (e) {
                console.log(e)
                console.log(e.response.data.error)
                alert(e + '\n' + e.response.data.error)
            }

        }
    }
}
