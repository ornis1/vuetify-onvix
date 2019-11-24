<template>
  <v-app>
    <TheHeader />
    <v-content>
      <v-container :fluid="fluid">
        <Profile />
        <!-- <Slider title="Популярные" :movies="popular" :cardSize="'small'" /> -->
      </v-container>
    </v-content>
    <TheFooter />
  </v-app>
</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader';
import TheFooter from '@/components/TheFooter';
import Profile from '@/components/Profile/Profile';
// import Slider from '@/components/Slider/Slider2';
import { ApiMixin } from '@/Mixins/ApiMixin.js';

export default {
  name: 'App',
  mixins: [ApiMixin],
  components: {
    TheHeader,
    TheFooter,
    Profile,
    // Slider,
  },
  created() {
    this.$_ApiMixin_getPopularMovies(1).then((data) => {
      this.popular = data;
    });
    window.$vm = this;
  },
  data() {
    return {
      popular: [],
    };
  },
  computed: {
    fluid() {
      return this.$vuetify.breakpoint.xlAndDown;
    },
    catalog() {
      return this.$store.getters.catalog;
    },
  },
};
</script>
<style>
body {
  font-family: 'Courier New', Courier, monospace !important;
}
</style>
