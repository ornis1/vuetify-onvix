<template>
  <v-row @mouseleave="menu=false" :class="[{'hover-gradient' : hover }, 'justify-space-between' ]">
    <MovieCardOverlays :menu="menu" :movie="movie" />
    <v-row align-content="start" class="px-2 justify-space-between">
      <v-chip
        label
        :class="[hover ? ['elevation-0','darken-3','yellow','black--text']:['elevation-3', 'grey','darken-2','grey--text'],'caption','font-weight-regular']"
        :outlined="!hover"
        active
      >HDX</v-chip>

      <v-menu open-on-hover close-delay="100000" v-model="menu">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon text>
            <v-icon :color="hover ? 'white-text' : 'rgba(0,0,0, .7)'">mdi-menu</v-icon>
          </v-btn>
        </template>
      </v-menu>
    </v-row>
  </v-row>
</template>

<script>
import MovieCardOverlays from '@/components/MovieCard/MovieCardOverlays';

export default {
  name: 'MovieCardHeader',
  components: { MovieCardOverlays },
  props: {
    hover: {
      type: Boolean,
      required: true,
      default: true,
    },
    movie: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return { menu: false };
  },
};
</script>
