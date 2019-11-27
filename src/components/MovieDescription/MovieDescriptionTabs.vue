<template>
  <div>
    <v-skeleton-loader v-if="loading" class="mt-5" type="image"></v-skeleton-loader>
    <v-tabs background-color="transparent" v-model="tab" color="amber darken-1">
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="tab in tabs" :key="tab.title" :href="`#${tab.value}`">{{tab.title}}</v-tab>
    </v-tabs>
    <v-divider></v-divider>

    <v-tabs-items class="transparent mt-5" v-model="tab">
      <v-tab-item v-for="i in 5" :key="i" :value="'tab' + i">
        <v-card color="transparent" flat>
          <!-- TAB-1  -->
          <p v-if="tab===`tab1`">{{movie.overview}}</p>
          <!-- END TAB-1  -->
          <!-- TAB-2  -->
          <p v-if="tab===`tab2`">
            <v-container>
              <v-row justify="space-between">
                <v-col
                  class="d-flex justify-start"
                  cols="6"
                  lg="4"
                  v-for="actor in cast"
                  :key="actor.id"
                >
                  <v-img :aspect-ratio="1" contain max-width="90" :src="imgSrc(actor.profile_path)"></v-img>
                  <span class="ml-5 align-self-end">{{actor.name}}</span>
                </v-col>
              </v-row>
            </v-container>
          </p>
          <!-- END TAB-2  -->
          <!--  TAB-5  -->
          <v-container v-if="tab===`tab5`">
            <v-row v-for="(movie, index) in similar" :key="movie.id" class="mb-6" align="center">
              <v-img contain max-width="60" :src="imgSrc(movie.poster_path)"></v-img>
              <v-col>
                <span light>{{`${index} ${movie.title}`}}</span>
              </v-col>
              <v-col cols="3" justify class="d-flex justify-space-between text-right">
                <span class="grey--text mr-7">{{getMovieYear(movie.release_date)}}</span>
                <span>IMDB {{movie.vote_average}}</span>
              </v-col>
            </v-row>
          </v-container>
          <!-- END TAB-5  -->
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
/*eslint-disable */
import { ApiMixin } from '@/Mixins/ApiMixin.js';
export default {
  name: 'MovieDescriptionTabs',
  mixins: [ApiMixin],
  props: {
    info: { type: Object, required: true },
    default: () => {},
  },
  data() {
    return {
      loading: true,
      id: null,
      tab: null,
      similar: null,
      movie: null,
      cast: null,
      tabs: [
        { title: 'Описание', value: 'tab1' },
        { title: 'Актеры', value: 'tab2' },
        // { title: 'Озвучки', value: 'tab3' },
        // { title: 'Серии', value: 'tab4' },
        { title: 'Вам понравится', value: 'tab5' },
      ],
    };
  },
  created() {
    this.movie = this.info.movie;
    this.cast = this.info.cast;
    this.cast.length = 10;
    this.id = this.info.id;
    this.$_ApiMixin_getSimilar(this.id).then((data) => {
      this.similar = data.results;
    });
    this.loading = false;
    //
  },
  methods: {
    imgSrc(path) {
      return (this.posterImg = this.$_ApiMixin_getImg(path, 300));
    },
    getMovieYear(date) {
      return date.slice(0, 4);
    },
  },
};
</script>
