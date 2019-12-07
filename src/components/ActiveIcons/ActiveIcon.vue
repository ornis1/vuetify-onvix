<template>
  <v-tooltip transition="fade-transition" color="white" bottom>
    <template v-slot:activator="{ on }">
      <v-hover v-slot:default="{ hover }">
        <v-btn
          outlined
          icon
          v-on="on"
          height="36"
          width="36"
          :class="[{'white':hover}, [isActive ? icon.class:''], 'mx-2']"
          @click="switchIt"
        >
          <v-icon v-if="!hover">{{icon.icon}}</v-icon>
          <v-icon v-if="hover" color="black">mdi-close</v-icon>
        </v-btn>
      </v-hover>
    </template>
    <span class="black--text">{{icon.tooltip}}</span>
  </v-tooltip>
</template>

<script>
/* eslint-disable  */
export default {
  name: 'ActiveIcon',
  props: {
    icon: { type: Object },
    movie: { type: Object, required: true },
  },
  computed: {
    isActive() {
      const tmp = [...this.$store.getters[this.icon.type]];
      return tmp.some((x) => x.id === this.movie.id);
    },
  },
  methods: {
    switchIt() {
      if (this.isActive) {
        this.$store.dispatch('remove', {
          movie: this.movie,
          type: `${this.icon.type}`,
        });
        return;
      }

      this.$store.dispatch('add', {
        movie: this.movie,
        type: `${this.icon.type}`,
      });
    },
  },
};
</script>
