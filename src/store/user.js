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
    user: {
      id: 'UsG3T1ZcFBWPkOImWjTaCjX4aBh2',
      name: null,
      email: 'asda@asd.cas',
      photoUrl: null,
    },
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    /* 

logIn
logOut

*/

    async updateProfile({ dispatch }, { login, password, email, photo }) {
      if (login) dispatch('updatelogin', login);
      if (password) dispatch('updatePassword', password);
      if (email) dispatch('updateEmail', email);
      if (photo) dispatch('updatePhoto', photo);
    },

    async registration({ commit }, { email, password }) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        commit('setUser', new User(user.user.uid, email));
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },

    // Эта функция идеальная
    async logIn({ commit }, { email, password }) {
      commit('clearError');
      commit('setLoading', true);
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
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    /* ****************** */
    /* Проверяем онлайн пользователя */

    async loggedUser({ commit }) {
      console.log('TCL: loggedUser -> loggedUser');
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          commit(
            'setUser',
            new User(user.uid, user.displayName, user.email, user.photoURL)
          );
          console.log('User ONLINE');
          return;
        }
        console.log('No user is signed in');
      });
    },
    async getUser() {
      return firebase.auth().currentUser;
    },
    /* ****************** */
    async signOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          commit('setUser', null);
          // commit('setOnline', false);
          console.log('Юзер вышел из аккаунта');

          console.log('Sign-out successful');
        })
        .catch((error) => {
          throw error;
          // An error happened.
        });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    checkUser(state) {
      // return state.user !== null;
      return true;
    },
  },
};
