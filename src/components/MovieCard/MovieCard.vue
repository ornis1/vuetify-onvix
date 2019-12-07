<template>
  <v-card
    tile
    flat
    :class="{'scale': hover && !isBig}"
    color="transparent"
    :width="cardWidth"
    @mouseover="hover = true"
    @mouseleave="menu,hover =false"
  >
    <v-img class="px-5 pt-2 elevation-12" :aspect-ratio="aspectRatio" :src="img">
      <div class="d-flex flex-column full-height">
        <MovieCardHeader :hover="hover" :movie="movie" />
        <MovieCardButtons v-if="hover" :size="size" :movie="movie" />
        <MovieCardFooter :hover="hover" :size="size" :movie="movie" />
      </div>
    </v-img>
    <!-- MOVIE TITLE -->
    <v-card-actions
      v-if="!isBig"
      :class="[[hover ? 'white--text' : 'grey--text'],'body-2	']"
    >{{movie.title}}</v-card-actions>
    <!-- END MOVIE TITLE -->
  </v-card>
</template>
<script>
import { ApiMixin } from '@/Mixins/ApiMixin.js';
import MovieCardHeader from '@/components/MovieCard/MovieCardHeader';
import MovieCardButtons from '@/components/MovieCard/MovieCardButtons';
import MovieCardFooter from '@/components/MovieCard/MovieCardFooter';

export default {
  name: 'MovieCard',
  components: {
    MovieCardHeader,
    MovieCardButtons,
    MovieCardFooter,
  },
  mixins: [ApiMixin],
  props: {
    movie: {
      type: Object,
      default: () => {},
      required: true,
    },
    size: {
      type: String,
      default: () => 'small',
      required: true,
    },
  },
  data() {
    return {
      menu: false,
      loading: true,
      hover: false,
    };
  },
  computed: {
    isBig() {
      return this.size === 'big';
    },
    aspectRatio() {
      return this.$props.size === 'small' ? 0.5 : 1.48;
    },
    cardWidth() {
      return this.$props.size === 'small' ? 220 : 500;
    },

    img() {
      const paths = {
        small: this.movie.poster_path,
        big: this.movie.backdrop_path,
      };
      const path = paths[this.$props.size];
      const resolution = this.$props.size === 'small' ? 300 : 400;
      return this.$_ApiMixin_getImg(path, resolution);
    },
  },
  created() {
    this.loading = false;
  },
};
</script>
<style lang="scss" scoped>
.full-height {
  height: 100%;
}
.hover-gradient::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-image: linear-gradient(
    rgba(23, 23, 23, 0.5) 0%,
    rgb(36, 178, 216) 100%
  );
}
/* Стили для оверлея просмотренного фильма */
.v-overlay p {
  transform: rotate(-30deg);
  color: RGBA(23, 255, 255, 1);
  border: 1px solid RGBA(23, 255, 255, 1);
  border-radius: 3px;
  padding: 4px 15px;
}
.v-image__image {
  background-size: contain !important;
}
/* Стили при наведение на карточку */
.v-card {
  transform: scale(0.9);
  transition: 0.25s transform cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.scale {
  transform: scale(1);
}
</style>
