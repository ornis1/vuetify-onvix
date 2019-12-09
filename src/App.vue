<template>
  <v-app>
    <router-view name="header"></router-view>
    <v-content>
      <router-view></router-view>
    </v-content>
    <router-view name="footer"></router-view>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  metaInfo: {
    title: 'Onvix',
  },

  created() {
    window.$vm = this;
    axios.interceptors.request.use(
      (config) => {
        // trigger 'loading=true' event here
        this.$store.dispatch('setLoading', true);
        return config;
      },
      (error) => {
        // trigger 'loading=false' event here
        this.$store.dispatch('setLoading', false);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        // trigger 'loading=false' event here
        this.$store.dispatch('setLoading', false);
        return response;
      },
      (error) => {
        // trigger 'loading=false' event here
        this.$store.dispatch('setLoading', false);
        return Promise.reject(error);
      }
    );
  },
};
</script>
<style lang="scss">
body {
  font-family: 'Courier New', Courier, monospace !important;
}
div.v-application {
  // Заменяю дефолтные цвета темной темы
  .v-content {
    background-color: #171717;
  }
  .v-toolbar {
    background-color: #1e1e1e;
  }
  & a {
    color: #fff;
    text-decoration: none;
  }
}
</style>
