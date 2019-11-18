<template>
  <v-app>
    <TheHeader />
    <v-content>
      <v-container class="d-flex">
        <my-slider title="Популярные">
          <v-slide-item
            class="mx-3 my-4"
            v-for="movie in popular"
            :key="movie.id"
            v-slot:default="{ active, toggle }"
          >
            <MovieCard :movie="movie" />
          </v-slide-item>
        </my-slider>
      </v-container>
    </v-content>
    <TheFooter />
  </v-app>
</template>

<script>
import TheHeader from "@/components/TheHeader/TheHeader";
import TheFooter from "@/components/TheFooter";
import MovieCard from "@/components/MovieCard";
import Slider from "@/components/Slider";
import { ApiMixin } from "@/Mixins/ApiMixin.js";

export default {
  name: "App",
  mixins: [ApiMixin],
  components: {
    TheHeader,
    TheFooter,
    MovieCard,
    "my-slider": Slider
  },
  created() {
    //
    /* eslint-disable-next-line */
    this.$_ApiMixin_getPopularMovies(1).then(data => {
      this.popular = data;
    });
  },
  data() {
    return {
      popular: []
    };
  }
};
</script>
<style>
body {
  font-family: "Courier New", Courier, monospace !important;
}
</style>
