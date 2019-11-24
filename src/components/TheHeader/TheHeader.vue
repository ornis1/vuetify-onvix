<template>
  <v-toolbar max-height="66" height="66">
    <v-container>
      <v-row align="center">
        <!-- Logo -->
        <v-btn text tile height="66">
          <img src="@/assets/Logo.svg" />
        </v-btn>
        <!-- Logo end -->
        <TheHeaderCatalog />
        <TheHeaderSearch />
        <TheHeaderReplay />
        <TheHeaderNotification />
        <TheHeaderProfile />
      </v-row>
    </v-container>
  </v-toolbar>
</template>
<script>
export default {
  name: 'TheHeader',
  components: {
    TheHeaderCatalog: () => import('./TheHeaderCatalog'),
    TheHeaderReplay: () => import('./TheHeaderSearch'),
    TheHeaderProfile: () => import('./TheHeaderProfile'),
    TheHeaderNotification: () => import('./TheHeaderReplay'),
    TheHeaderSearch: () => import('./TheHeaderNotification'),
  },
};
</script>
