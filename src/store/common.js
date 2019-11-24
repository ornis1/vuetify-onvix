export default {
  state: {
    loading: false,
    error: null,
    catalog: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setCatalog(state, payload) {
      state.catalog = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    // Show loading
    setLoading({ commit }, payload) {
      commit('setLoading', payload);
    },
    // Show error
    setError({ commit }, payload) {
      commit('setError', payload);
    },
    // Set catalog
    setCatalog({ commit }, payload) {
      commit('setCatalog', payload);
    },
    // Clear error
    clearError({ commit }) {
      commit('clearError');
    },
  },
  getters: {
    // Get load status
    loading(state) {
      return state.loading;
    },
    // Get error message
    error(state) {
      return state.error;
    },
    // Get catalog
    catalog(state) {
      return state.catalog;
    },
  },
};
