<template>
  <div>
    <v-row>
      <v-col>
        <v-hover v-slot:default="{ hover }">
          <router-link :to="{path:category, params: {type:category}}">
            <span :class="['title',hover ?['amber--text','text--lighten-1']:'']">
              {{title}}
              <v-icon
                translate="0"
                :class="hover ?['amber--text','text--lighten-1']:''"
              >mdi-arrow-right</v-icon>
            </span>
          </router-link>
        </v-hover>
      </v-col>
      <v-col class="text-right mr-4">
        <!-- If we need navigation buttons -->
        <v-btn class="mr-1" tile @click="slidePrev">
          <v-icon>mdi-arrow-left-circle</v-icon>
        </v-btn>
        <v-btn tile @click="slideNext">
          <v-icon>mdi-arrow-right-circle</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <swiper :options="options" ref="mySwiper">
      <swiper-slide v-for="movie in movies" :key="movie.id">
        <MovieCard :movie="movie" :size="size" />
      </swiper-slide>
      <swiperSlide v-for="n in 8" :key="n*Math.random()" class="mt-n5">
        <MovieCardPlaceholder :size="size" />
      </swiperSlide>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import MovieCard from '@/components/MovieCard/MovieCard';
import MovieCardPlaceholder from '@/components/MovieCard/MovieCardPlaceholder';

export default {
  name: 'Slider',
  components: {
    swiper,
    swiperSlide,
    MovieCard,
    MovieCardPlaceholder,
  },
  props: {
    size: { type: String },
    title: { type: String },
    category: { type: String },
    movies: { type: Array, default: () => [] },
  },
  data() {
    return {
      swiperOptions: {
        small: {
          simulateTouch: false,
          spaceBetween: 5,
          slidesPerView: 8,
          step: 3,
          breakpoints: {
            600: {
              slidesPerView: 3,
              simulateTouch: true,
            },
            960: {
              slidesPerView: 4,
            },
            1680: {
              slidesPerView: 6,
            },
            1904: {
              slidesPerView: 8,
            },
          },
        },
        big: {
          spaceBetween: 5,
          simulateTouch: false,
          slidesPerView: 3,
          step: 1,
          breakpoints: {
            0: {
              slidesPerView: 1,
              simulateTouch: true,
            },
            600: {
              slidesPerView: 2,
            },
            960: {
              slidesPerView: 2,
            },
            1680: {
              slidesPerView: 3,
            },
            1904: {
              slidesPerView: 4,
            },
          },
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    step() {
      return this.swiperOptions[this.size].step;
    },
    options() {
      return this.swiperOptions[this.size];
    },
  },
  methods: {
    async slideNext() {
      const index = this.swiper.activeIndex;
      const len = this.movies.length;
      const step = this.step;
      const condition = len - (index + step) <= 6;
      this.swiper.slideTo(this.swiper.activeIndex + this.step, 500, false);
      if (condition) {
        this.loadMovies();
      }
    },
    slidePrev() {
      this.swiper.slideTo(this.swiper.activeIndex - this.step, 500, false);
    },
    loadMovies() {
      this.$emit('load-more', this.category);
    },
  },
};
</script>

