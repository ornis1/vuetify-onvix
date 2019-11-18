<template>
  <v-menu offset-y>
    <template v-slot:activator="{on}">
      <v-btn v-on="on" width="64" height="64" text>
        <v-icon size="35">mdi-play-circle</v-icon>
      </v-btn>
    </template>

    <v-card class="mx-auto" light width="260" height="210">
      <v-list-item three-line>
        <v-list-item-avatar height="110" width="80" tile class="my-4 mr-4">
          <v-img
            aspect-ratio="16/9"
            src="https://image.tmdb.org/t/p/w300/rr1rALpZT6VaGmVPekCiQKLeMIs.jpg"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Игра престолов</v-list-item-title>
          <v-list-item-subtitle>5 сезон 5 серия</v-list-item-subtitle>
          <v-list-item-subtitle>19 минута 12 секунда</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-card-actions class="pt-4">
        <v-btn color="primary" block>Продолжить просмотр</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  name: "TheHeaderReplay"
};
</script>