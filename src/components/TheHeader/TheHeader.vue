<template>
  <v-toolbar max-height="66" height="66">
    <v-container>
      <v-row align="center">
        <!-- Logo -->
        <v-btn text height="66">
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
import TheHeaderCatalog from "./TheHeaderCatalog";
import TheHeaderSearch from "./TheHeaderSearch";
import TheHeaderProfile from "./TheHeaderProfile";
import TheHeaderReplay from "./TheHeaderReplay";
import TheHeaderNotification from "./TheHeaderNotification";

export default {
  name: "TheHeader",
  components: {
    TheHeaderCatalog,
    TheHeaderReplay,
    TheHeaderProfile,
    TheHeaderNotification,
    TheHeaderSearch
  }
};
</script>
