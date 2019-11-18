<template>
  <v-menu v-model="showMenu" offset-y>
    <template v-slot:activator="{on}">
      <v-btn v-on="on" height="66" text>
        Каталог
        <v-icon v-if="!showMenu">mdi-menu-down</v-icon>
        <v-icon v-if="showMenu">mdi-menu-up</v-icon>
      </v-btn>
    </template>
    <v-list>
      <TheHeaderCatalogContent />
    </v-list>
  </v-menu>
</template>
<script>
import TheHeaderCatalogContent from "./TheHeaderCatalogContent";

export default {
  name: "TheHeaderCatalog",
  components: { TheHeaderCatalogContent },
  data() {
    return { showMenu: false };
  }
};
</script>
