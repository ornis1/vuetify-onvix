<template>
  <v-menu left offset-y>
    <template v-slot:activator="{on}">
      <v-btn v-on="on" width="64" height="64" tile text>
        <v-badge color="primary" overlap>
          <template v-if="model" v-slot:badge>{{counter}}</template>
          <v-icon v-if="model" size="32">mdi-bell-ring</v-icon>
          <v-icon v-else size="32">mdi-bell-ring-outline</v-icon>
        </v-badge>
        <!-- {{model}} -->
      </v-btn>
    </template>
    <TheHeaderNotificationContent />
  </v-menu>
</template>
<script>
export default {
  name: 'TheHeaderNotification',
  components: {
    TheHeaderNotificationContent: () =>
      import('./TheHeaderNotificationContent.vue'),
  },
  data() {
    return { model: null, counter: 0 };
  },
};
</script>