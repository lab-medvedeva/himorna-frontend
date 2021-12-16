
export default {
  state: {
    loader: false
  },
  mutations: {
    setLoader(state, val) {
      state.loader = val
    }
  },
  actions: {
    setLoader({commit}, val) {
        commit('setLoader', val)
    }
  },
  getters: {
    loader: s => s.loader
  }
}
