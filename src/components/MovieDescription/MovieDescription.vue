<template>
  <v-container>
    {{tab}}
    <v-row>
      <v-col offset-lg="1" md="4" sm="3" lg="3">
        <MovieDecriptionPoster class="sticky" :posterImg="posterImg" :loading="loading" />
      </v-col>

      <v-col cols="8">
        <v-card color="transparent" flat>
          <!-- Заголовок -->
          <v-skeleton-loader v-if="loading" class="mb-5" type="image" height="40" max-width="350"></v-skeleton-loader>
          <v-card-title v-else class="pt-0">{{movie.title}}</v-card-title>

          <!-- Подзаголовок -->
          <v-skeleton-loader v-if="loading" type="text" max-width="250"></v-skeleton-loader>
          <v-card-subtitle v-else class="body-2 mt-1 mb-10">{{movie.original_title}}</v-card-subtitle>

          <!-- Информация о фильме/сериале -->
          <v-skeleton-loader v-if="loading" class="pt-10" type="text@3" max-width="150"></v-skeleton-loader>
          <v-card-text v-else>
            <!-- Информация о режисере -->
            <p>
              <span class="grey--text text--lighten-2 pr-2">Режисер:</span>
              <a class="pr-1" v-for="director in directors" :key="director.id">{{director.name}}</a>
            </p>
            <p>
              <!-- Год выпуска -->
              <span class="grey--text text--lighten-2 pr-2">{{getMovieYear(movie.release_date)}}</span>
              <!-- Жанр -->
              <span v-for="genre in movie.genres" :key="genre.id">
                <a class="px-1" href="#">{{genre.name}}</a>
                <v-btn disabled color="grey" fab height="5" width="5"></v-btn>
              </span>
              <!-- Страна производства -->
              <a
                class="px-1"
                v-for="country in movie.production_countries"
                :key="country.iso_3166_1"
                href
              >{{country.iso_3166_1}}&nbsp;</a>
            </p>
            <!-- Оценка фильма -->
            <p>
              <span>IMDb:</span>
              <span
                class="grey--text text--lighten-2 ml-2"
              >{{movie.vote_average}} ({{movie.vote_count}})</span>
            </p>
          </v-card-text>

          <!--  -->
          <v-skeleton-loader v-if="loading" class="d-flex mt-10" type="button@5" max-width="250"></v-skeleton-loader>
          <v-skeleton-loader v-if="loading" class="mt-5" type="image"></v-skeleton-loader>
          <MovieDescriptionTabs v-else :info="info" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
/*eslint-disable */
import { ApiMixin } from '@/Mixins/ApiMixin.js';
export default {
  name: 'MovieDescription',
  mixins: [ApiMixin],
  components: {
    MovieDescriptionTabs: () =>
      import('@/components/MovieDescription/MovieDescriptionTabs'),
    MovieDecriptionPoster: () =>
      import('@/components/MovieDescription/MovieDecriptionPoster'),
  },
  methods: {
    getMovieYear(date) {
      return date.slice(0, 4);
    },
    getCast() {
      this.$_ApiMixin_getCast(this.id).then((response) => {
        this.credits = response;
        // записываю всю нужную информацию для 'Tabs'
        this.getInfo();

        // получаю массив режисеров
        this.getDirectors();
      });
    },
    getImg() {
      this.posterImg = this.$_ApiMixin_getImg(this.movie.poster_path, 300);
    },
    getInfo() {
      this.info = {
        movie: this.movie,
        cast: this.credits.cast,
        id: this.id,
      };
    },
    getDirectors() {
      this.directors = this.credits.crew.filter(
        (val) => val.department === 'Directing'
      );
    },
  },
  created() {
    // получаю инфу о фильме
    this.$_ApiMixin_getMovie(this.id)
      .then((response) => {
        this.movie = response;
      })
      // потом получаю url постера
      .then(() => {
        this.getImg();
      })
      // потом получаю весь каст фильма
      .then(() => {
        this.getCast();
      })
      .then(() => {})
      // потом убираю заглушки и отображаю контент
      .then(() => {
        this.loading = false;
      });
  },
  data() {
    return {
      loading: true,
      posterImg: '',
      id: 10345,
      directors: null,
      info: null,
      movie: null,
      credits: null,
      tab: null,
      tabs: [
        { title: 'Описание', value: 'tab1' },
        { title: 'Актеры', value: 'tab2' },
        { title: 'Озвучки', value: 'tab3' },
        { title: 'Серии', value: 'tab4' },
        { title: 'Вам понравится', value: 'tab5' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.sticky {
  top: 20px;
  position: sticky;
}
.v-tabs-items {
  box-shadow: none !important;
}
</style>