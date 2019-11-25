import Vue from 'vue';
import Vuex from 'vuex';
import common from './common';
import user from './user';
import drawer from './drawer';
// import movie from './movie';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { common, user, drawer },
});
