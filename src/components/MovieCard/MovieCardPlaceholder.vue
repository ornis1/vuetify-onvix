<template>
  <v-img :aspect-ratio="aspectRatio" :width="width" :class="['placeholder',[isSmall?'border':'']]">
    <v-icon v-if="isSmall" class="d-flex" large>mdi-eye</v-icon>
  </v-img>
</template>
<script>
export default {
  name: 'MovieCardPlaceholder',
  props: { size: { type: String, required: true, default: 'small' } },
  computed: {
    isSmall() {
      return this.size === 'small';
    },
    aspectRatio() {
      return this.$props.size === 'small' ? 0.6 : 1.48;
    },
    width() {
      return this.$props.size === 'small' ? 220 : 500;
    },
  },
};
</script>

<style lang="postcss" scoped>
.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #131313;

  margin-left: 10px;
  margin-top: 15px;
  transform: scale(0.85);
  border-radius: 3px;
}
.border {
  border: 2px dashed #3d3d3d;
}
</style>
