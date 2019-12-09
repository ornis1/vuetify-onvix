/* eslint-disable */
import axios from 'axios';
export const ApiMixin = {
  data() {
    return {
      MixinKey: '6c789b97c269e57a2df3bcbc30f04173',
      endpoint: 'https://api.themoviedb.org/3/',
      lang: 'ru-RU',
    };
  },
  methods: {
    get(url, params = null) {
      let request = `${this.endpoint}${url}?api_key=${this.MixinKey}&language=${this.lang}`;

      if (params) {
        /* Если были переданны параметры, то добавляем их в url запроса */
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const value = params[key];
            request += `&${key}=${value}`;
          }
        }
        // Делаем запрос
        return axios.get(request);
      }
      // Делаем запрос без доп-ых параметров
      return axios.get(request);
    },

    /* Фильмы актера/режисера */
    $_ApiMixin_getPersonMovies(id) {
      return this.get(`person/${id}/movie_credits`).then(
        (response) => response.data
      );
    },

    /* Получить каст фильма */
    $_ApiMixin_getCast(id) {
      return this.get(`movie/${id}/credits`).then((response) => response.data);
    },

    /* Получить информацию о фильме */
    $_ApiMixin_getMovie(id) {
      return this.get(`movie/${id}`).then((response) => response.data);
    },

    /* Получить информацию о актере/режисере */
    $_ApiMixin_getPerson(id) {
      return this.get(`person/${id}`).then((response) => response.data);
    },

    /* Новинки */
    $_ApiMixin_getNewestMovies(page) {
      return this.get('trending/movie/week', { page }).then(
        (response) => response.data.results
      );
    },

    /* Найти похожие фильмы / сериалы */
    $_ApiMixin_getSimilar(id) {
      return this.get(`movie/${id}/similar`).then((response) => response.data);
    },

    /* Популярные */
    async $_ApiMixin_getPopularMovies(page) {
      return await this.get('discover/movie', {
        sort_by: 'popularity.desc',
        page,
      }).then((response) => response.data.results);
    },

    /* Жанры сериалов */
    $_ApiMixin_getTVGenres() {
      return this.get('genre/tv/list').then((response) => response.data);
    },

    /* Жанры фильмов */
    $_ApiMixin_getMovieGenres() {
      return this.get('genre/movie/list').then((response) => response.data);
    },

    $_ApiMixin_getImg(path, size) {
      size = size ? `w${size}` : 'original';
      return `https://image.tmdb.org/t/p/${size}${path}`;
    },

    /* Поиск по ключевому слову */
    $_ApiMixin_multiSearch(query, page) {
      return this.get('search/multi', { page, query }).then(
        (response) => response.data
      );
    },

    /* Поиск фильмов по жанрам */
    $_ApiMixin_getMoviesByGenre(id, page) {
      return this.get('discover/movie', { with_genres: id, page }).then(
        (response) => response.data
      );
    },
  },
};
