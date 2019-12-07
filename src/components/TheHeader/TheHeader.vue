<template>
  <v-toolbar max-height="66" height="66" elevation="8">
    <!-- <v-divider slot="extension"></v-divider> -->
    <v-progress-linear
      height="2"
      class="pt-n10"
      :active="loading"
      absolute
      bottom
      color="amber"
      indeterminate
    ></v-progress-linear>
    <v-container>
      <v-row align="center">
        <!-- Logo -->

        <router-link :to="{name:'home', path:'/'}">
          <v-btn text tile height="66">
            <img src="@/assets/Logo.svg" />
          </v-btn>
        </router-link>
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
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>
