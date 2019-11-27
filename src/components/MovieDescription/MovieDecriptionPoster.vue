<template>
  <div>
    <!-- PLACEHOLDER -->
    <v-responsive v-if="loading" max-width="270" color="transparent">
      <v-skeleton-loader type="image@2"></v-skeleton-loader>
      <v-skeleton-loader class="mt-5" type="image" height="30"></v-skeleton-loader>
      <v-skeleton-loader class="mt-5" type="image" height="30"></v-skeleton-loader>
    </v-responsive>
    <!-- END PLACEHOLDER -->
    <v-responsive max-width="300">
      <v-img class="align-end justify-between mb-10" :src="posterImg">
        <v-list-item class="px-10 d-flex justify-space-around mb-4">
          <v-tooltip
            transition="fade-transition"
            v-for="icon in activeIcons"
            :key="icon.icon"
            color="white"
            bottom
          >
            <template v-slot:activator="{ on }">
              <v-hover v-slot:default="{ hover }">
                <v-btn
                  outlined
                  fab
                  small
                  v-on="on"
                  :class="[{'white':hover}, [icon.active ? icon.class:'']]"
                >
                  <v-icon v-if="!hover">{{icon.icon}}</v-icon>
                  <v-icon color="black" v-if="hover">mdi-close</v-icon>
                </v-btn>
              </v-hover>
            </template>
            <span class="black--text">{{icon.tooltip}}</span>
          </v-tooltip>
        </v-list-item>
      </v-img>
      <v-btn height="47" class="mb-5" color="primary" block>Смотреть</v-btn>
      <v-btn height="47" class="mb-5" light block>Смотреть</v-btn>
    </v-responsive>
  </div>
</template>
<script>
export default {
  name: 'MovieDecriptionPoster',
  props: {
    posterImg: { type: String },
    loading: { type: Boolean },
  },
  data() {
    return {
      activeIcons: {
        favorite: {
          active: false,
          icon: 'mdi-heart',
          tooltip: 'Избранное',
          class: 'amber darken-1',
        },
        watchLater: {
          active: true,
          icon: 'mdi-clock-outline',
          tooltip: 'Смотреть позже',
          class: 'green acent-3',
        },
        watched: {
          active: false,
          icon: 'mdi-eye',
          tooltip: 'Просмотренно',
          class: 'cyan acent-3',
        },
      },
    };
  },
};
</script>

<style lang='scss' scoped>
.v-image {
  position: relative;
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.4) 90%
    );
  }
}
</style>