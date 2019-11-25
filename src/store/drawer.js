export default {
  state: {
    drawer: false,
    content: null,
  },
  mutations: {
    setContent(state, payload) {
      state.content = payload;
    },
    setDrawer(state, payload) {
      state.drawer = payload;
    },
  },
  actions: {
    setContent({ commit }, payload) {
      commit('setContent', payload);
    },
    setDrawer({ commit }, payload) {
      commit('setDrawer', payload);
    },
  },
  getters: {
    drawer(state) {
      return state.drawer;
    },
    content(state) {
      return state.content;
    },
  },
};
