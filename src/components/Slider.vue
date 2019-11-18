<template>
  <v-container>
    <a class="headline pl-12">{{ title }}</a>
    <v-sheet class="mx-auto" color="transparent">
      <v-slide-group class :show-arrows="false">
        <slot name="default"></slot>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
      required: true
    }
  }
};
</script>
