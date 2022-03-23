export default {
    SET_CURRENT_USER(state, currentUser) {
        state.user = currentUser
    },
    RESET_CURRENT_USER(state) {
        state.user = null
    }
}