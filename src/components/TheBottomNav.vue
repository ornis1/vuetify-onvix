<template>
  <v-bottom-navigation grow height="70" active-class="white--text">
    <v-btn>
      <span>Главная</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn>
      <span>Категории</span>
      <v-icon>mdi-format-list-checkbox</v-icon>
    </v-btn>
    <v-btn>
      <span>Поиск</span>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn>
      <span>Настройки</span>
      <v-icon>mdi-settings</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  name: 'TheBottomNavigation',
};
</script>