import firebase from '@firebase/app';

export default {
  state: {
    favorite: [],
    watched: [],
    watchLater: [],
  },
  mutations: {
    add(state, payload) {
      const { name, movie } = payload;
      state[name].push(movie);
    },
    /**
     *
     * @param {*} state
     * @param {movieect} payload
     * @param {String} name
     * @param {Object} result
     */
    set(state, payload) {
      const { name, result } = payload;
      state[name] = [...result];
    },
  },
  actions: {
    load({ commit }, name) {
      const user = this.getters.user;
      firebase
        .database()
        .ref()
        .child(`${user.id}/${name}`)
        .once('value', (snapshot) => {
          let result = snapshot.val();
          if (result) {
            result = Object.values(result);
            commit('set', { name, result });
          }
        });
    },

    add({ commit }, { movie, name }) {
      // Проверяю, есть фильм в категории или нет
      const result = [...this.getters[name]].some((x) => x.id === movie.id);
      // Если нет, то добавляем
      if (!result) {
        /* ПОлучаем ссылку.
        Запоминаем ключ фильма по которому его можно найти в базе данных
        Записываем его в свойства фильма и пушим
        */
        const rootRef = firebase.database().ref();
        const userId = this.getters.user.id;
        const updatedMovie = { ...movie };
        updatedMovie.from = name;

        rootRef
          .child(`${userId}/${name}/${updatedMovie.id}`)
          .update(updatedMovie);

        commit('add', { movie: updatedMovie, name });
      }
    },

    remove({ commit }, { movie, name }) {
      const result = [...this.getters[name]].filter((x) => x.id !== movie.id);

      if (result) {
        const userId = this.getters.user.id;
        commit('set', { result, name });
        firebase
          .database()
          .ref()
          .child(`${userId}/${name}/${movie.id}`)
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
