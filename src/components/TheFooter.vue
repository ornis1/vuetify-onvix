<template>
  <v-footer class="pa-0">
    <v-container class="pa-0">
      <v-row justify="space-between">
        <v-col align-self="center" md="4">
          <v-btn text height="60" :ripple="false">
            <img src="@/assets/Logo.svg" />
          </v-btn>
        </v-col>
        <v-col class="text-center" align-self="center" md="4">
          <span>© 2016–{{year}} «Onvix»</span>
        </v-col>
        <v-col class="text-end" md="4">
          <v-btn small text>О проекте</v-btn>
          <v-btn small text>Контакты</v-btn>
          <v-btn small text>Пользовательское соглашение</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script>
export default {
  name: 'TheFooter',
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>
