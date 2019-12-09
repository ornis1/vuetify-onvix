<template>
  <v-container :class="{'px-10':fluid}" :fluid="fluid">
    <Slider
      @load-more="loadMore"
      size="small"
      title="Смотреть позже"
      category="watchLater"
      :movies="watchLater"
    />
    <Slider
      @load-more="loadMore"
      size="small"
      title="Популярные"
      category="popular"
      :movies="popular.data"
    />
    <Slider
      @load-more="loadMore"
      size="big"
      title="Новинки"
      category="newest"
      :movies="newest.data"
    />
  </v-container>
</template>

<script>
import { ApiMixin } from '@/Mixins/ApiMixin.js';
export default {
  name: 'TheHome',
  components: {
    Slider: () => import('@/components/Slider/Slider'),
  },
  metaInfo: {
    title: 'Onvix',
  },
  mixins: [ApiMixin],
  data() {
    return {
      popular: { page: 1, data: [] },
      newest: { page: 1, data: [] },
      newestPage: 1,
      popularPage: 1,
    };
  },
  computed: {
    fluid() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    user() {
      return this.$store.getters.user;
    },
    watchLater() {
      return this.$store.getters.watchLater;
    },
  },
  methods: {
    loadMore(category) {
      this[category].page++;
      switch (category) {
        case 'newest':
          this.loadNewestMovies();
          break;
        case 'popular':
          this.loadPopularMovies();
          break;
        default:
          break;
      }
    },
    loadPopularMovies() {
      this.$_ApiMixin_getPopularMovies(this.popular.page).then((data) => {
        this.popular.data = [...this.popular.data, ...data];
      });
    },
    loadNewestMovies() {
      this.$_ApiMixin_getNewestMovies(this.newest.page).then((data) => {
        this.newest.data = [...this.newest.data, ...data];
      });
    },
  },
  created() {
    this.loadPopularMovies();
    this.loadNewestMovies();
  },
};
</script>
