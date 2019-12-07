import firebase from '@firebase/app';

export default {
  state: {
    favorite: [],
    watched: [],
    watchLater: [],
  },
  mutations: {
    add(state, payload) {
      const { type, movie } = payload;
      state[type].push(movie);
    },
    /**
     *
     * @param {*} state
     * @param {movieect} payload
     * @param {String} name
     * @param {Object} result
     */
    set(state, payload) {
      const { type, result } = payload;
      state[type] = [...result];
    },
  },
  actions: {
    load({ commit }, type) {
      const user = this.getters.user;
      firebase
        .database()
        .ref()
        .child(`${user.id}/${type}`)
        .once('value', (snapshot) => {
          let result = snapshot.val();
          if (result) {
            result = Object.values(result);
            commit('set', { type, result });
          }
        });
    },

    add({ commit }, { movie, type }) {
      // Проверяю, есть фильм в категории или нет
      const result = [...this.getters[type]].some((x) => x.id === movie.id);
      // Если нет, то добавляем
      if (!result) {
        /* ПОлучаем ссылку.
        Запоминаем ключ фильма по которому его можно найти в базе данных
        Записываем его в свойства фильма и пушим
        */
        const rootRef = firebase.database().ref();
        const userId = this.getters.user.id;
        const updatedMovie = { ...movie };
        updatedMovie.from = type;

        rootRef
          .child(`${userId}/${type}/${updatedMovie.id}`)
          .update(updatedMovie);

        commit('add', { movie: updatedMovie, type });
      }
    },

    remove({ commit }, { movie, type }) {
      const result = [...this.getters[type]].filter((x) => x.id !== movie.id);

      if (result) {
        const userId = this.getters.user.id;
        commit('set', { result, type });
        firebase
          .database()
          .ref()
          .child(`${userId}/${type}/${movie.id}`)
          .remove();
      }
    },
  },
  getters: {
    favorite(state) {
      return state.favorite;
    },
    watched(state) {
      return state.watched;
    },
    watchLater(state) {
      return state.watchLater;
    },
  },
};
