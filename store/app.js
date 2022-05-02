export const state = () => ({
  overlayActive: false,
  savedScrollPosition: 0,
})

export const actions = {
  showOverlay({ commit }) {
    commit('SET_SAVED_SCROLL_POSITION', window.scrollY)
    document.body.style.overflow = 'hidden'
    commit('SHOW_OVERLAY')
  },
  hideOverlay({ commit }) {
    document.body.style.overflow = 'unset';
    commit('SCROLL_TO_SAVED_SCROLL_POSITION')
    commit('HIDE_OVERLAY')
    commit('SET_SAVED_SCROLL_POSITION', 0)
  },
}

export const mutations = {
  SHOW_OVERLAY(state) {
    state.overlayActive = true
  },
  HIDE_OVERLAY(state) {
    state.overlayActive = false
  },
  SET_SAVED_SCROLL_POSITION(state, scrollPosition) {
    state.savedScrollPosition = scrollPosition
  },
  SCROLL_TO_SAVED_SCROLL_POSITION(state) {
    window.scrollTo(0, state.savedScrollPosition)
  },
}
