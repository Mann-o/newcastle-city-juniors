export const state = () => ({
  overlayActive: false,
  savedScrollPosition: 0,
  miniCartOpen: false,
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
  openMiniCart({ dispatch, commit }) {
    dispatch('showOverlay')
    commit('OPEN_MINI_CART')
  },
  closeMiniCart({ dispatch, commit }) {
    dispatch('hideOverlay')
    commit('CLOSE_MINI_CART')
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
  OPEN_MINI_CART(state) {
    state.miniCartOpen = true;
  },
  CLOSE_MINI_CART(state) {
    state.miniCartOpen = false;
  },
}
