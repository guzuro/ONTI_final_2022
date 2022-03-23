import AuthService from "../../Services/AuthService";

export default {
    DO_SIGN_UP({commit}, registrationData) {
        return new Promise((resolve, reject) => {
            AuthService.signUp(registrationData)
                .then(response => {
                    commit('SET_CURRENT_USER', response)
                    resolve()
                })
                .catch(reject)
        })
    },
    DO_LOGIN({commit}, loginData) {
        return new Promise((resolve, reject) => {
            AuthService.signIn(loginData)
                .then(response => {
                    commit('SET_CURRENT_USER', response)
                    resolve()
                })
                .catch(reject)
        })
    },
    DO_LOGOUT({commit}) {
        return new Promise((resolve, reject) => {
            commit('RESET_CURRENT_USER')
            AuthService.logout()
                .then(resolve)
                .catch(reject)
        })
    },
    SET_USER({commit}, user) {
        return new Promise((resolve) => {
            commit('SET_CURRENT_USER', user)
            resolve()
        })
    },
}