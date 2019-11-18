/* eslint-disable */
import axios from 'axios';
export const ApiMixin = {
  data() {
    return {
      MixinKey: '6c789b97c269e57a2df3bcbc30f04173',
      endpoint: 'https://api.themoviedb.org/3/',
      lang: 'ru',
      tmp: '',
      payload: {},
    };
  },
  methods: {
    $_ApiMixin_getUnique(arr, comp) {
      var obj = {};
      arr.map((x) => (obj[x[comp]] = x));
      return Object.values(obj);
    },
    /**
     *
     * @param {Array[movie]} arr
     */
    $_ApiMixin_sortByDate(arr) {
      return arr
        .map((item) => {
          return { id: item.id, date: Number(item.release_date.slice(0, 4)) };
        })
        .sort((a, b) => {
          return b.date - a.date;
        })
        .map((a) => {
          return arr.filter((b) => b.id == a.id);
        })
        .map((i) => i[0]);
    },
    $_ApiMixin_getPersonMovies(id) {
      const request = this.$_ApiMixin_request(
        'person/' + id + '/movie_credits'
      );
      return axios.get(request).then((response) => {
        /* СДЕЛАТЬ ВАРИАТИВНОСТЬ ДЛЯ АКТЕРОВ И РЕЖИСЕРОВ И Т.д */
        const crew = response.data.crew;
        const cast = response.data.cast;
        const a = crew.length > cast.length;
        let result = a ? crew : cast;
        result = this.$_ApiMixin_getUnique(result, 'id');
        return result;
      });
    },

    $_ApiMixin_getPopularMovies(page) {
      // const request = `https://api.themoviedb.org/3/discover/movie?api_key=6c789b97c269e57a2df3bcbc30f04173&language=ru&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
      const request = this.$_ApiMixin_request('discover/movie', {
        sort_by: 'popularity.desc',
        page,
      });
      return axios.get(request).then((response) => response.data.results);
    },

    $_ApiMixin_getNewestMovies(page) {
      const request = `https://api.themoviedb.org/3/discover/movie?api_key=6c789b97c269e57a2df3bcbc30f04173&language=ru&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
      return axios.get(request).then((response) => response.data.results);
    },

    $_ApiMixin_getImg(path, size) {
      size = size ? `w${size}` : 'original';
      return `https://image.tmdb.org/t/p/${size}${path}`;
    },

    $_ApiMixin_getMovie(id) {
      // return this.$_ApiMixin_request('movie/' + id);
      return axios
        .get(this.$_ApiMixin_request('movie/' + id))
        .then((response) => {
          return response.data;
        });
    },

    /* Найти похожие фильмы / сериалы */
    $_ApiMixin_getSimilar(movieId) {
      const request = this.$_ApiMixin_request('movie/' + movieId + '/similar');
      return axios.get(request).then((response) => {
        return response.data;
      });
    },

    $_ApiMixin_getCast(id) {
      const path = `movie/${id}/credits`;
      const request = this.$_ApiMixin_request(path);
      return axios.get(request).then((response) => {
        return response.data;
      });
    },
    $_ApiMixin_getPerson(id) {
      const request = this.$_ApiMixin_request('person/' + id);
      return axios.get(request).then((response) => {
        return response.data;
      });
    },
    $_ApiMixin_multiSearch(query, page = 1) {
      const request = this.$_ApiMixin_request('search/multi', {
        query,
        page: page,
      });
      return axios.get(request).then((response) => {
        return response.data;
      });
    },
    $_ApiMixin_getMoviesByGenre(genreId) {
      const request = this.$_ApiMixin_request('discover/movie', {
        with_genres: genreId,
      });
      return axios.get(request).then((response) => {
        return response.data;
      });
    },
    $_ApiMixin_request(path, options = {}) {
      let request = `${this.endpoint}${path}?api_key=${this.MixinKey}&language=${this.lang}`;

      const keys = Object.keys(options);
      keys.map((key) => (request += `&${key}=${options[key]}`));
      return request;
    },
  },
};
