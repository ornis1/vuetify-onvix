<template>
  <div>
    <v-tabs color="#24b2d8" fixed-tabs vertical v-model="model">
      <v-tabs-slider></v-tabs-slider>

      <v-tab
        class="px-10 body-2"
        v-for="(link,index) of links"
        :key="index"
        :href="`#tab-${index}` "
      >{{ link.name }}</v-tab>
      <v-divider></v-divider>
      <v-btn block tile disabled>Подборки</v-btn>
      <v-btn block disabled>Фильтры</v-btn>
      <!-- КОНТЕНТ -->
      <v-tab-item
        class="white"
        v-for="(link,index) in links"
        :key="link.name"
        :value="'tab-' + index"
      >
        <v-list tile class="white my_list">
          <v-divider vertical></v-divider>
          <li v-for="genre in link.genres" :key="genre.id">
            <router-link
              :to="{name:'resultWithId' ,params: { id: genre.id,type: 'genre',  title: genre.name,}}"
            >
              <v-btn small class="black--text" text block height="36">{{genre.name}}</v-btn>
            </router-link>
          </li>
        </v-list>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import { ApiMixin } from '@/Mixins/ApiMixin';
export default {
  mixins: [ApiMixin],
  data() {
    return {
      model: 'tab-0',
      loading: true,
      links: [{ name: 'Фильмы', genres: [] }, { name: 'Сериалы', genres: [] }],
    };
  },
  created() {
    this.$_ApiMixin_getMovieGenres().then((response) => {
      this.links[0].genres = response.genres;
    });
    this.$_ApiMixin_getTVGenres().then((response) => {
      this.links[1].genres = response.genres;
    });
  },
};
</script>
<style lang="scss"  scoped>
.v-tab {
  background-color: #e8e8e8;
}
.active {
  border-left: 4px solid #24b2d8;
  background-color: #fff !important;
}
.active::before {
  visibility: hidden;
}
.my_list {
  padding: 8px 0;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  height: 305px;
  width: 150px;
}
.my_list li {
  width: 216px;
}

.my_list li .v-btn {
  background-color: transparent;
  &:hover {
    color: #24b2d8 !important;
    transition: none;
  }
}
</style>
