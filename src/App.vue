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
export default {
  name: 'App',
  metaInfo: {
    title: 'Onvix',
  },
  beforeMount() {
    window.$vm = this;
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
