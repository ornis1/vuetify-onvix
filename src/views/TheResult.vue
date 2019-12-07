<template>
  <v-container>
    <h1 class="d-block title">{{title}}</h1>
    <v-container class="transparent mx-auto" infinite-scroll-distance="1">
      <!-- v-infinite-scroll="loadMore" -->
      <v-row class justify="space-around">
        <keep-alive v-for="(movie) in movies" :key="movie.id">
          <MovieCard :movie="movie" size="small" />
        </keep-alive>
        <v-card color="transparent" flat v-for="n in 10" :key="n" width="236"></v-card>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll';
import MovieCard from '@/components/MovieCard/MovieCard';
import { ApiMixin } from '@/Mixins/ApiMixin';

export default {
  name: 'result',
  components: { MovieCard },
  mixins: [ApiMixin],
  // metaInfo() {
  //   return {
  //     meta: [{ name: 'title', content: 'his.title' }],
  //   };
  // },
  metaInfo: {
    titleTemplate() {
      return this.$route.params.title;
    },
  },
  directives: { infiniteScroll },
  data() {
    return {
      id: null,
      type: null,
      page: 1,
      movies: [],
      busy: false,
      isDisabled: false,
      timeoutID: null,
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
      return 'Доделай меня';
      // const titles = {
      // 	collections: {
      // 		popular: 'Популярные',
      // 		newest: 'Новые фильмы',
      // 		watched: 'Просмотренные',
      // 		watch_later: 'Смотреть позже',
      // 		favorite: 'Избранные',
      // 	},
      // 	actor: `Актер ${this.$route.params.title}`,
      // 	director: `Режисер ${this.$route.params.title}`,
      // 	search: `Результат поиска «${this.$route.query.q}»`,
      // };
      // const name = this.$route.name;
      // const category = this.$route.params.category;

      // return name !== 'collections' ? titles[name] : titles[name][category];
    },
    // Достаем "запрос" пользователя, для передачи в api
    query() {
      return this.$route.query.q;
    },
  },
  watch: {
    $route() {
      /* РАБОТАЕТ С КОЛЛЕКЦИЯМИ */
      this.page = 1;
      this.movies = [];
      this.loadContent();
    },
    '$route.query.q'() {
      // Иначе загружаем контент
      this.loadContent();
    },
    deep: true,
  },
  methods: {
    // Фильтруем по пустым свойствам
    filterByEmptyProperty() {
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
    loadContent() {
      // Достаем данные из роута
      this.type = this.$route.params.type;
      this.id = this.$route.params.id || null;

      /* eslint-disable  */
      // Получаем название метода по которому делается запрос
      const methodsName = this.types[this.type];
      console.log('TCL: loadContent -> methodsName', methodsName);
      // Вызываем функцию из экземпляра текущего компонента
      this[methodsName]();
    },

    // Поиск по результату ввода в строке поиска
    loadMultiSearch() {
      this.$_ApiMixin_multiSearch(this.query, this.page).then((response) => {
        this.movies = response.results;
        this.filterByEmptyProperty();
      });
    },

    /* Загрузка просмотренных фильмов */
    loadWatchedMovies() {
      this.movies = this.$store.getters.watched;
    },

    /* Загрузка отложенных на потом фильмов */
    loadWatchLaterMovies() {
      this.movies = this.$store.getters.watchLater;
    },

    /* Загрузка любимых фильмов */
    loadFavoriteMovies() {
      this.movies = this.$store.getters.favorite;
    },

    /* Поплярные фильмы */
    loadPopularMovies() {
      this.$_ApiMixin_getPopularMovies(this.page).then((response) => {
        this.movies = [...this.movies, ...response];
        this.filterByEmptyProperty();
      });
    },
    /* Новые фильмы */
    loadNewestMovies() {
      this.$_ApiMixin_getNewestMovies(this.page).then((response) => {
        this.movies = [...this.movies, ...response];
        this.filterByEmptyProperty();
        // this.busy = false;
      });
    },
    /* Фильмы актера/ режисера??? */
    loadDirectorMovies() {
      this.$_ApiMixin_getPersonMovies(this.id).then((response) => {
        this.movies = [...this.movies, ...response.crew];
        this.filterByEmptyProperty();
      });
    },
    loadActorMovies() {
      this.$_ApiMixin_getPersonMovies(this.id).then((response) => {
        this.movies = [...this.movies, ...response.cast];
        this.filterByEmptyProperty();
      });
    },
    loadMoviesByGenre() {
      this.$_ApiMixin_getMoviesByGenre(this.id).then((response) => {
        this.movies = [...this.movies, ...response.results];
        this.filterByEmptyProperty();
      });
    },
  },
  created() {
    this.loadContent();
  },
};
</script>
