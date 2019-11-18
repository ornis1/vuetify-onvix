<template>
  <div>
    <v-skeleton-loader
      :loading="loading"
      type="card-heading,image,list-item"
      width="200"
      height="332"
    >
      <v-hover v-slot:default="{ hover }">
        <v-card :class="{ hover: hover }" width="200" color="transparent" flat>
          <v-img
            aspect-ratio="16/9"
            height="300"
            :src="img"
            :class="[hover ? 'hover-gradient' : '']"
          >
            <v-card-title class="pa-2 justify-space-between">
              <v-chip
                label
                :class="[
                  'black--text',
                  'font-weight-regular',
                  'yellow',
                  'darken-3'
                ]"
                active
                >HD</v-chip
              >
              <v-btn fab text small>
                <v-icon :color="hover ? 'white-text' : 'rgba(0,0,0, .3)'"
                  >mdi-menu</v-icon
                >
              </v-btn>
            </v-card-title>
            <v-card-text :class="[hover ? 'visibility' : 'hidden', 'mt-12']">
              <v-btn height="32" class="body-2 my-4" block color="primary"
                >Смотерть</v-btn
              >
              <v-btn
                height="32"
                class="body-2 my-4 btn--hover"
                color="white"
                block
                outlined
                >Описание</v-btn
              >
            </v-card-text>
            <v-list-item
              :class="[
                'body-2',
                'pa-0',
                'mt-12',
                hover ? 'visbility' : 'hidden'
              ]"
            >
              <span class="mx-auto">IMDb: {{ rating }} / {{ movieYear }}</span>
            </v-list-item>
          </v-img>
          <v-card-actions>
            <span
              :class="[
                'subtitle-2',
                'grey--text',
                ,
                hover ? 'text--lighten-5' : 'text--lighten-1'
              ]"
              >{{ movie.title }}</span
            >
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-skeleton-loader>
  </div>
</template>
<script>
import { ApiMixin } from "@/Mixins/ApiMixin.js";

export default {
  props: {
    movie: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  mixins: [ApiMixin],
  data() {
    return { loading: true };
  },
  mounted() {
    this.loading = false;
  },
  computed: {
    isWatched() {
      const movies = this.$store.getters.watched;
      if (movies.length) {
        return movies.some(movie => movie.id === this.movie.id);
      }
      return false;
    },
    rating() {
      const rating = this.movie.vote_average;
      if (`${rating}`.length <= 1) {
        return `${rating},0`;
      }
      return `${rating}`.split(".").join(",");
    },
    movieYear() {
      const date = this.movie.release_date;
      return date ? Number(date.slice(0, 4)) : new Date().getFullYear();
    },
    img() {
      return this.$_ApiMixin_getImg(this.movie.poster_path, "300");
    }
  }
};
</script>
<style lang="scss" scoped>
.hover-gradient::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    rgba(23, 23, 23, 0.5) 0%,
    rgb(36, 178, 216) 100%
  );
}
.hover {
  transform: scale(1.1);
  transition: 0.3s;
}
.hidden {
  visibility: hidden;
}
.visible {
  visibility: visible;
}
.v-btn {
  &.btn--hover:hover {
    transition: 0.2s;
    border: none;
    background-color: #fff;
    color: black !important;
  }
}
</style>
