<template>
  <v-row class="justify-space-around">
    <ActiveIcon :movie="movie" :icon="icon" v-for="icon in icons" :key="icon.type" />
  </v-row>
</template>
<script>
export default {
  props: { movie: Object },
  components: {
    ActiveIcon: () => import('@/components/ActiveIcons/ActiveIcon.vue'),
  },
  data() {
    return {
      icons: {
        favorite: {
          type: 'favorite',
          icon: 'mdi-heart',
          tooltip: 'Избранное',
          class: 'amber darken-1',
        },
        watchLater: {
          type: 'watchLater',
          icon: 'mdi-clock-outline',
          tooltip: 'Смотреть позже',
          class: 'green acent-3',
        },
        watched: {
          type: 'watched',
          icon: 'mdi-eye',
          tooltip: 'Просмотренно',
          class: 'cyan acent-3',
        },
      },
    };
  },
};
</script>