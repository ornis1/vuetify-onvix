import firebase from '@firebase/app';
/* eslint-disable  */
class User {
  constructor(uid, name, email, photoUrl) {
    this.id = uid;
    this.name = name;
    this.email = email;
    this.photoUrl = photoUrl;
  }
}

export default {
  state: {
    user: null,
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async deletePhoto({ dispatch }) {
      // Удаляем url фото на сервере и в store
      // dispatch('updateProfile', { photo: null });
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          photoURL: '',
        })
        .then(() => {
          dispatch('loggedUser', user);
          dispatch('setLoading', false);
        })
        .catch((error) => {
          dispatch('setError', error.message);
          dispatch('setLoading', false);
          throw error;
        });
    },

    async updatePhoto({ dispatch }, file) {
      dispatch('setLoading', true);
      const user = firebase.auth().currentUser;

      // Create a Storage Ref w/ username
      const storageRef = firebase
        .storage()
        .ref(`${user.uid}/profilePicture/${file.name}`);

      // Upload file
      storageRef.put(file);

      storageRef
        .getDownloadURL()
        .then((downloadURL) => {
          const user = firebase.auth().currentUser;
          user
            .updateProfile({
              photoURL: downloadURL,
            })
            .then(() => {
              dispatch('loggedUser', user);
              dispatch('setLoading', false);
            })
            .catch((error) => {
              dispatch('setError', error.message);
              dispatch('setLoading', false);
              throw error;
            });
        })
        .catch((error) => {
          dispatch('setLoading', false);
          throw error;
        });
    },

    /* Обновить логин */
    async updateName({ dispatch }, { name }) {
      dispatch('setLoading', true);

      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: name,
        })
        .then(() => {
          dispatch('loggedUser', user);
          dispatch('setLoading', false);
        })
        .catch((error) => {
          dispatch('setError', error.message);
          dispatch('setLoading', false);
          throw error;
        });
    },

    async updateEmail({ dispatch }, { email }) {
      dispatch('setLoading', true);
      const user = firebase.auth().currentUser;

      user
        .updateEmail(email)
        .then(() => {
          // Update successful.
          dispatch('loggedUser', user);
          dispatch('setLoading', false);
          console.log('Update successful');
        })
        .catch((error) => {
          dispatch('setError', error.message);
          dispatch('setLoading', false);
          console.log('An error happened.');
          throw error;
        });
    },

    async updatePassword({ dispatch }, { password }) {
      dispatch('setLoading', true);
      var user = firebase.auth().currentUser;

      user
        .updatePassword(password)
        .then(() => {
          // Update successful.
          dispatch('loggedUser', user);
          dispatch('setLoading', false);
          console.log('Update successful');
        })
        .catch((error) => {
          dispatch('setError', error.message);
          dispatch('setLoading', false);
          console.log('An error happened.');
          throw error;
        });
    },

    async registration({ commit, dispatch }, { email, password }) {
      dispatch('clearError');
      dispatch('setLoading', true);
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        commit('setUser', new User(user.user.uid, email));
        dispatch('setLoading', false);
      } catch (error) {
        dispatch('setLoading', false);
        dispatch('setError', error.message);
        throw error;
      }
    },

    // Эта функция идеальная
    async logIn({ commit, dispatch }, { email, password }) {
      dispatch('clearError');
      dispatch('setLoading', true);
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        commit(
          'setUser',
          new User(
            user.user.uid,
            user.user.displayName,
            user.user.email,
            user.user.photoURL
          )
        );
        dispatch('setLoading', false);
      } catch (error) {
        dispatch('setLoading', false);
        dispatch('setError', error.message);
        throw error;
      }
    },
    async loggedUser({ commit }, user) {
      console.log('loggedUser');
      localStorage.setItem('id', user.uid);
      commit(
        'setUser',
        new User(user.uid, user.displayName, user.email, user.photoURL)
      );
    },

    async signOut({ commit, dispatch }) {
      dispatch('setLoading', true);
      await firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          commit('setUser', null);
          localStorage.removeItem('id');
          dispatch('setLoading', false);
        })
        .catch((error) => {
          dispatch('setLoading', false);
          dispatch('setError', error.message);
          throw error;
        });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    checkUser(state) {
      return state.user !== null;
    },
  },
};
