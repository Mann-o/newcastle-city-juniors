export const state = () => ({
  active: false,
})

export const actions = {
  toggle ({ commit }) {
    commit('TOGGLE')
  },
  open ({ commit }) {
    commit('OPEN')
  },
  close ({ commit }) {
    commit('CLOSE')
  },
}

export const mutations = {
  TOGGLE (state) {
    state.active = !state.active
  },
  OPEN (state) {
    state.active = true
  },
  CLOSE (state) {
    state.active = false
  },
}
