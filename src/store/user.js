import firebase from '@firebase/app';
/* eslint-disable  */
class User {
  constructor(uid, name, email, photoUrl) {
    this.id = uid;
    this.name = name;
    this.email = email;
    this.photoUrl = photoUrl;
    // this.emailVerified = emailVerified;
  }
}

export default {
  state: {
    user: null,
    // online: false,
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    /*  setOnline(state, payload) {
      state.online = payload;
    }, */
  },
  actions: {
    async updateProfile({ dispatch }, { login, password, email, photo }) {
      if (login) dispatch('updatelogin', login);
      if (password) dispatch('updatePassword', password);
      if (email) dispatch('updateEmail', email);
      if (photo) dispatch('updatePhoto', photo);
    },
    /** loginUser
     *
     * @param {URL} photo
     */
    async updatePhoto({ dispatch }, file) {
      // if (!file) throw new Error();

      // Get current username
      const user = firebase.auth().currentUser;

      if (file === null) {
        // Удаляем url фото на сервере и в store
        user.updateProfile({ photoURL: null }).then(() => {
          dispatch('loggedUser');
        });
        return;
      }

      // Create a Storage Ref w/ username
      const storageRef = firebase
        .storage()
        .ref(`${user.uid}/profilePicture/${file.name}`);

      // // Upload file
      storageRef.put(file);

      storageRef.getDownloadURL().then((downloadURL) => {
        user
          .updateProfile({
            photoURL: downloadURL,
          })
          .then(() => {
            dispatch('loggedUser');
          });
      });
      // .catch((error) => {
      // An error happened.
      // });
    },
    async updateName({ dispatch }, name) {
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: name,
        })
        .then(() => {
          // Update successful.
          dispatch('loggedUser');
        })
        .catch((error) => {
          throw error;
          // An error happened.
        });
    },
    async updatePassword(pass) {
      const user = firebase.auth().currentUser;

      user
        .updatePassword(pass)
        .then(() => {
          // Update successful.
        })
        .catch((error) => {
          throw error;
          // An error happened.
        });
    },
    async updateEmail(email) {
      const user = firebase.auth().currentUser;

      user
        .updateEmail(email)
        .then(() => {
          // Update successful.
        })
        .catch((error) => {
          throw error;
          // An error happened.
        });
    },
    async deleteUser() {
      const user = firebase.auth().currentUser;

      user
        .delete()
        .then(() => {
          // User deleted.
        })
        .catch((error) => {
          throw error;
          // An error happened.
        });
    },
    async sendVerificationEmail() {
      const user = firebase.auth().currentUser;

      user
        .sendEmailVerification()
        .then(() => {
          // Email sent.
        })
        .catch((error) => {
          throw error;
          // An error happened.
        });
    },
    async registerUser({ commit }, { email, password }) {
      commit('clearError');
      commit('setLoading', true);
      try {
        // logic
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        commit('setUser', new User(user.user.uid));
        commit('setLoading', false);
        // commit('setOnline', true);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    async loginUser({ commit }, { email, password }) {
      commit('clearError');
      commit('setLoading', true);
      try {
        // logic
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        console.log('TCL: loginUser -> user', user);
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
        // commit('setOnline', true);
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
      return state.user !== null;
    },
  },
};
