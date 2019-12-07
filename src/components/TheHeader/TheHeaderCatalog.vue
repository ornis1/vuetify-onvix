<template>
  <v-menu light z-index="1000" absolute :close-on-content-click="false" v-model="showMenu" offset-y>
    <template v-slot:activator="{on}">
      <v-btn v-on="on" height="66" text tile>
        Каталог
        <v-icon v-if="!showMenu">mdi-menu-down</v-icon>
        <v-icon v-if="showMenu">mdi-menu-up</v-icon>
      </v-btn>
    </template>
    <TheHeaderCatalogContent />
  </v-menu>
</template>
<script>
export default {
  data() {
    return { showMenu: false };
  },
  components: {
    TheHeaderCatalogContent: () =>
      import('@/components/TheHeader/TheHeaderCatalogContent'),
  },
};
</script>
<style  scoped>
.v-menu__content {
  left: 50% !important;
  top: 66px !important;
  transform: translate(-50%, 0);
  width: 100% !important;
}
</style>