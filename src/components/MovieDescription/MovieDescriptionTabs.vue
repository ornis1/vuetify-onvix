<template>
  <div>
    <v-skeleton-loader v-if="loading" class="mt-5" type="image"></v-skeleton-loader>
    <v-tabs background-color="transparent" v-model="tab" color="amber darken-1">
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="tab in tabs" :key="tab.title" :href="`#${tab.value}`">{{tab.title}}</v-tab>
    </v-tabs>
    <v-divider></v-divider>

    <v-tabs-items class="transparent mt-5" v-model="tab">
      <v-card color="transparent" flat>
        <!-- TAB-1  -->
        <v-tab-item :value="'tab1'">
          <p v-show="tab===`tab1`">{{overview}}</p>
        </v-tab-item>
        <!-- END TAB-1  -->

        <!-- TAB-2  -->
        <v-tab-item :value="'tab2'">
          <v-container>
            <v-row justify="space-between">
              <v-col
                class="d-flex justify-start"
                cols="6"
                lg="4"
                v-for="actor in cast"
                :key="actor.id"
              >
                <v-list-item
                  :to="{name:'resultWithId',params:{type:'actor', id:actor.id, title:actor.name}}"
                >
                  <v-list-item-avatar :height="90/3*4" tile width="90">
                    <v-img class="full-height" max-width="90" :src="imgSrc(actor.profile_path)"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content class="align-self-end justify-start">{{actor.name}}</v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <!-- END TAB-2  -->

        <!--  TAB-3  -->
        <v-tab-item :value="'tab3'">
          <v-container>
            <v-row v-for="(movie, index) in similar" :key="movie.id" class="mb-6" align="center">
              <v-img contain max-width="60" :src="imgSrc(movie.poster_path)" :alt="movie.name"></v-img>
              <v-col>
                <router-link :to="{name:'movie', params:{ id:movie.id, title:movie.title}}">
                  <span light>{{`${++index} ${movie.title}`}}</span>
                </router-link>
              </v-col>
              <v-col cols="2" class="text-right">
                <span class="grey--text">{{getMovieYear(movie.release_date)}}</span>
              </v-col>
              <v-col cols="2" class="text-left">
                <span>IMDB {{rating(movie.vote_average)}}</span>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <!-- END TAB-3  -->
      </v-card>
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
    overview: { type: String, required: true, default: '' },
    movie: { type: Object, required: true, default: () => {} },
    cast: { type: Array, required: true, default: () => {} },
    id: { type: Number, required: true },
  },
  data() {
    return {
      loading: true,
      tab: null,
      similar: null,
      tabs: [
        { title: 'Описание', value: 'tab1' },
        { title: 'Актеры', value: 'tab2' },
        { title: 'Вам понравится', value: 'tab3' },
      ],
    };
  },
  created() {
    this.$_ApiMixin_getSimilar(this.id).then((data) => {
      this.similar = data.results;
    });
    this.loading = false;
    //
  },
  methods: {
    rating(v) {
      return v.toString().length === 1 ? `${v}.0` : v;
    },
    imgSrc(path) {
      return (this.posterImg = this.$_ApiMixin_getImg(path, 300));
    },
    getMovieYear(date) {
      return date.slice(0, 4);
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
.full-height {
  height: 100%;
}
</style>
