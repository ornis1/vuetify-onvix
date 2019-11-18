<template>
  <v-app>
    <TheHeader />
    <v-content>
      <v-container class="d-flex">
        <my-slider title="title">
          <MovieCard />
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

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
    MovieCard,
    "my-slider": Slider
  },
  data: () => ({
    model: null,
    multiple: false,
    mandatory: false,
    showArrows: true,
    prevIcon: false,
    nextIcon: false,
    centerActive: false
  })
};
</script>
<style>
body {
  font-family: "Courier New", Courier, monospace !important;
}
</style>
