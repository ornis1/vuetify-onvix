<template>
  <v-row class="d-flex flex-column">
    <v-btn :width="isBig ? '50%':'80%'" class="caption mx-auto" color="primary" height="35">Смотреть</v-btn>
    <v-btn
      :to="{name:'movie' ,params: { id: movie.id, title: movie.title,}}"
      :width="isBig ? '50%':'80%'"
      :class="['caption', 'mx-auto', 'mt-4']"
      height="35"
      outlined
    >Описание</v-btn>
  </v-row>
</template>
<script>
export default {
  name: 'MovieCardButtons',
  props: {
    hover: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: String,
      required: true,
      default: 'small',
    },
    movie: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    isBig() {
      return this.size === 'big';
    },
  },
};
</script>
