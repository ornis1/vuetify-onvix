<template>
  <v-container>
    <a class="headline pl-12">{{title}}</a>
    <v-sheet class="mx-auto" color="transparent">
      <v-slide-group class :show-arrows="false">
        <v-slide-item class="mx-3 my-4" v-for="n in 2" :key="n" v-slot:default="{ active, toggle }">
          <div>
            <slot name="default"></slot>
          </div>
        </v-slide-item>
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