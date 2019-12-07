<template>
  <div>
    <!-- WATCHED OVERLAY -->
    <v-overlay z-index="0" v-if="watched" absolute color="#171717">
      <p>Просмотрено</p>
    </v-overlay>
    <!-- END WATCHED OVERLAY -->
    <v-overlay
      v-if="menu"
      class="align-start pt-10"
      z-index="1"
      absolute
      opacity=".9"
      color="#000000"
    >
      <v-row>
        <ActiveIcons :movie="movie" class="mt-10" />
      </v-row>
    </v-overlay>
    <!-- END OVERLAY -->
  </div>
</template>
<script>
import ActiveIcons from '@/components/ActiveIcons/ActiveIcons';
export default {
  name: 'MovieCardOverlays',
  components: { ActiveIcons },
  props: {
    movie: {
      type: Object,
      required: true,
      default: () => {},
    },
    menu: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    watched() {
      const movies = this.$store.getters.watched;
      if (movies.length) {
        return movies.some((movie) => movie.id === this.movie.id);
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
/* Стили для оверлея просмотренного фильма */
.v-overlay {
  p {
    transform: rotate(-30deg);
    color: RGBA(23, 255, 255, 1);
    border: 1px solid RGBA(23, 255, 255, 1);
    border-radius: 3px;
    padding: 4px 15px;
  }
}
.v-image__image {
  background-size: contain !important;
}
</style>
