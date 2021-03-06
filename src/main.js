import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';
import store from './store/store';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import router from '@/router/router.js';
import VueMeta from 'vue-meta';

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
});

Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.config.performance = true;

new Vue({
  router,
  vuetify,
  store,
  created() {
    const config = {
      apiKey: 'AIzaSyBi9QWYQa5MC2GxhDdbuVhVAYEhhmKY9Qg',
      authDomain: 'onvix-clone.firebaseapp.com',
      databaseURL: 'https://onvix-clone.firebaseio.com',
      projectId: 'onvix-clone',
      storageBucket: 'onvix-clone.appspot.com',
      messagingSenderId: '833323653452',
    };
    /* eslint-disable  */
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Check Logged
        this.$store.dispatch('loggedUser', user).then(() => {
          // Loading All Tasks
          this.$store.dispatch('load', 'watched');
          this.$store.dispatch('load', 'favorite');
          this.$store.dispatch('load', 'watchLater');
        });
      }
    });
  },
  render: (h) => h(App),
}).$mount('#app');
