<template>
  <v-container>
    <h1 class="d-block title">{{title}}</h1>
    <v-container class="transparent mx-auto">
      <v-row class justify="space-around">
        <keep-alive v-for="(movie) in movies" :key="movie.id">
          <MovieCard :movie="movie" size="small" />
        </keep-alive>
        <v-card color="transparent" flat v-for="n in 10" :key="n" width="236"></v-card>
      </v-row>
      <v-row v-if="hidden" justify="center">
        <v-btn @click="loadContent" :disabled="disabled" :loading="loading">
          <span v-if="disabled">Больше нечего загружать</span>
          <span v-else>Загрузить ещё</span>
        </v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
/* eslint-disable  */
import MovieCard from '@/components/MovieCard/MovieCard';
import { ApiMixin } from '@/Mixins/ApiMixin';

export default {
  name: 'result',
  components: { MovieCard },
  mixins: [ApiMixin],
  metaInfo: {
    titleTemplate() {
      return this.$route.params.title;
    },
  },
  data() {
    return {
      disabled: false,
      after: 0,
      id: null,
      type: null,
      page: 1,
      movies: [],
      types: {
        search: 'loadMultiSearch',
        watched: 'loadWatchedMovies',
        watchLater: 'loadWatchLaterMovies',
        favorite: 'loadFavoriteMovies',
        popular: 'loadPopularMovies',
        newest: 'loadNewestMovies',
        actor: 'loadActorMovies',
        director: 'loadDirectorMovies',
        genre: 'loadMoviesByGenre',
      },
    };
  },

  computed: {
    title() {
      const titles = {
        popular: 'Популярные',
        newest: 'Новые фильмы',
        watched: 'Просмотренные',
        watchLater: 'Смотреть позже',
        favorite: 'Избранное',
        actor: `Актер ${this.$route.params.title}`,
        director: `Режисер ${this.$route.params.title}`,
        search: `Результат поиска «${this.$route.query.q}»`,
        genre: `Фильмы с жанром «${this.$route.params.title}»`,
      };
      const type = this.$route.params.type;
      return titles[type];
    },
    loading() {
      return this.$store.getters.loading;
    },
    hidden() {
      // Показываем кнопку загрузить еще только на этих роутах
      return ['popular', 'newest', 'search', 'genre'].some(
        (v) => v === this.type
      );
    },
    // Достаем "запрос" пользователя, для передачи в api
    query() {
      return this.$route.query.q;
    },
  },
  watch: {
    '$route.path'() {
      /* Обновляем результат выдачи при изменении роута, а также если были добавлены или удалены фильмы из $store */
      this.movies = [];
      this.page = 1;
      this.loadContent();
    },
    '$route.query.q'() {
      // Иначе загружаем контент
      this.movies = [];
      this.page = 1;
      this.loadContent();
    },
    deep: true,
  },
  methods: {
    // Убирает из массива объектов повторы
    uniqueMovies(array) {
      let unique = {};
      array.map((movie) => {
        unique[movie['id']] = movie;
      });
      return (unique = Object.values(unique));
    },

    // Фильтруем по пустым свойствам
    async filterByEmptyProperty() {
      this.movies = this.movies
        .filter((x) => x.poster_path)
        .filter((x) => x.title)
        .filter((x) => x.overview)
        .filter((x) => x.release_date)
        .sort((a, b) => {
          b = b.release_date.slice(0, 4);
          a = a.release_date.slice(0, 4);
          return b - a;
        });
    },
    loadContent(state) {
      // Достаем данные из роута
      this.type = this.$route.params.type;
      this.id = this.$route.params.id || null;

      /* eslint-disable  */
      // Получаем название метода по которому делается запрос
      // Вызываем функцию из экземпляра текущего компонента
      const methodsName = this.types[this.type];
      // console.log('TCL: loadContent -> methodsName', methodsName);

      this[methodsName]().then(() => {
        this.page++;
      });
    },

    // Поиск по результату ввода в строке поиска
    async loadMultiSearch() {
      this.$_ApiMixin_multiSearch(this.query, this.page).then((response) => {
        this.movies.push(...response.results);

        const before = this.after;
        this.filterByEmptyProperty().then(() => {
          this.after = this.movies.length;
          if (before === this.after) {
            this.disabled = true;
          }
        });
      });
    },

    /* Загрузка просмотренных фильмов */
    async loadWatchedMovies() {
      this.movies = this.$store.getters.watched;
    },

    /* Загрузка отложенных на потом фильмов */
    async loadWatchLaterMovies() {
      this.movies = this.$store.getters.watchLater;
    },

    /* Загрузка любимых фильмов */
    async loadFavoriteMovies() {
      this.movies = this.$store.getters.favorite;
    },

    /* Поплярные фильмы */
    async loadPopularMovies() {
      this.$_ApiMixin_getPopularMovies(this.page).then((response) => {
        this.movies.push(...response);
        this.filterByEmptyProperty();
      });
    },
    /* Новые фильмы */
    async loadNewestMovies() {
      this.$_ApiMixin_getNewestMovies(this.page).then((response) => {
        this.movies.push(...response);
        this.filterByEmptyProperty();
        // this.busy = false;
      });
    },

    /* Фильмы актера/ режисера??? */
    async loadDirectorMovies() {
      this.$_ApiMixin_getPersonMovies(this.id).then((response) => {
        const unique = this.uniqueMovies(response.crew);
        this.movies.push(...unique);
        this.filterByEmptyProperty();
      });
    },
    async loadActorMovies() {
      this.$_ApiMixin_getPersonMovies(this.id).then((response) => {
        this.movies.push(...response.cast);
        this.filterByEmptyProperty();
      });
    },
    async loadMoviesByGenre() {
      this.$_ApiMixin_getMoviesByGenre(this.id, this.page).then((response) => {
        this.movies.push(...response.results);
        this.filterByEmptyProperty();
      });
    },
  },
  created() {
    this.page = 1;
    this.loadContent();
  },
};
</script>
