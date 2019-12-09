<template>
  <v-container>
    {{tab}}
    <v-row>
      <v-col offset-lg="1" md="4" sm="3" lg="3">
        <!-- PLACEHOLDER -->
        <v-responsive v-if="loading" max-width="270" color="transparent">
          <v-skeleton-loader type="image@2" tile></v-skeleton-loader>
          <v-skeleton-loader class="mt-5" type="image" height="30"></v-skeleton-loader>
          <v-skeleton-loader class="mt-5" type="image" height="30"></v-skeleton-loader>
        </v-responsive>
        <!-- END PLACEHOLDER -->
        <MovieDecriptionPoster
          v-else
          class="sticky"
          :movie="movie"
          :posterImg="posterImg"
          :loading="loading"
        />
      </v-col>

      <v-col cols="8">
        <v-card color="transparent" flat>
          <!-- Заголовок -->
          <v-skeleton-loader
            v-if="loading"
            class="mb-5"
            type="image"
            tile
            height="40"
            max-width="350"
          ></v-skeleton-loader>
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
              <router-link
                class="pr-1"
                v-for="director in directors"
                :key="director.id"
                :to="{name:'resultWithId',params:{id:director.id, type:'director',title:director.name}}"
              >{{director.name}}</router-link>
            </p>
            <p>
              <!-- Год выпуска -->
              <span class="grey--text text--lighten-2 pr-2">{{getMovieYear(movie.release_date)}}</span>
              <!-- Жанр -->
              <span v-for="genre in movie.genres" :key="genre.id">
                <router-link
                  class="mx-1"
                  :to="{name:'resultWithId', params:{ type:'genre',id:genre.id, title:genre.name}}"
                >{{genre.name}}</router-link>
                <v-btn disabled color="grey" fab height="5" width="5"></v-btn>
              </span>
              <!-- Страна производства -->
              <span v-for="(country,index) in movie.production_countries" :key="country.iso_3166_1">
                <v-btn v-show="index!==0" disabled color="grey" fab height="5" width="5"></v-btn>
                <router-link
                  class="mx-1"
                  :to="{path:`/country/${country.iso_3166_1}`}"
                >{{country.iso_3166_1}}</router-link>
              </span>
            </p>
            <!-- Оценка фильма -->
            <p>
              <span>IMDb:</span>
              <span
                class="grey--text text--lighten-2 ml-2"
              >{{rating(movie.vote_average)}} ({{movie.vote_count}})</span>
            </p>
          </v-card-text>

          <!--  -->
          <v-skeleton-loader v-if="loading" class="d-flex mt-10" type="button@5" max-width="250"></v-skeleton-loader>
          <v-skeleton-loader v-if="loading" class="mt-5" type="image"></v-skeleton-loader>
          <MovieDescriptionTabs
            v-else
            :overview="movie.overview"
            :movie="movie"
            :cast="cast"
            :id="movie.id"
            :info="info"
          />
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
  props: {
    title: String,
  },
  metaInfo: {
    titleTemplate() {
      /* eslint-disable no-console */
      console.log(this.$route);

      return this.$route.params.title || this.$route.params.id;
    },
  },

  data() {
    return {
      loading: true,
      posterImg: '',
      directors: null,
      info: {},
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
  computed: {
    id() {
      return this.$route.params.id;
    },
    cast() {
      let cast = this.credits.cast;
      cast = cast.filter((v) => v.profile_path);
      cast.length = cast.length >= 10 ? 10 : cast.length;
      return cast;
    },
  },
  watch: {
    '$route.path'() {
      this.getMovie();
    },
  },
  created() {
    this.getMovie();
  },
  methods: {
    getMovie() {
      // получаю инфу о фильме
      this.$_ApiMixin_getMovie(this.id)
        .then((response) => {
          console.log('TCL: getMovie -> response', response.id);
          this.movie = response;
        })
        // потом получаю url постера
        .then(() => {
          this.getImg();
        })
        .then(() => {
          // потом получаю весь каст фильма
          this.$_ApiMixin_getCast(this.id)
            .then((response) => {
              this.credits = response;
            })
            .then(() => {
              // записываю всю нужную информацию для 'Tabs'
              this.getInfo();
              // получаю массив режисеров
              this.getDirectors();
            })
            .then(() => {
              // потом убираю заглушки и отображаю контент
              this.loading = false;
            });
        });
    },
    getMovieYear(date) {
      return date.slice(0, 4);
    },
    getInfo() {
      this.info = {
        movie: this.movie,
        cast: this.credits.cast,
        id: this.id,
      };
    },
    getImg() {
      this.posterImg = this.$_ApiMixin_getImg(this.movie.poster_path, 300);
    },
    rating(v) {
      return v.toString().length === 1 ? `${v}.0` : v;
    },
    getDirectors() {
      this.directors = this.credits.crew.filter(
        (val) => val.department === 'Directing'
      );
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  color: white;
  text-decoration: none;
  &:hover {
    color: #ffb300;
  }
}
.sticky {
  top: 20px;
  position: sticky;
}
.v-tabs-items {
  box-shadow: none !important;
}
</style>