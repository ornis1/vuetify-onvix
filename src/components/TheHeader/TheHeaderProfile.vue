<template>
  <v-menu left offset-y :close-on-content-click="false">
    <template v-slot:activator="{on}">
      <v-btn v-on="on" text tile height="66" width="66">
        <v-avatar>
          <img src="https://cdn.vuetifyjs.com/images/lists/2.jpg" alt />
        </v-avatar>
      </v-btn>

      <!-- <v-btn height="66" text v-on="on">asd</v-btn> -->
    </template>
    <v-card light width="260">
      <v-list>
        <v-list-item-group color="#2f7cda">
          <v-list-item class="pl-6">
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Marat</v-list-item-title>
              <v-list-item-subtitle>fastmarat23@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item disabled class="pl-6">Оплата доступа</v-list-item>
          <v-list-item disabled class="pl-6">Пригласить друзей</v-list-item>
          <v-divider></v-divider>
          <v-list-item disabled class="pl-6">Смотрю сейчас</v-list-item>
          <v-list-item
            :to="{name: 'result', params:{type:'watchLater'}}"
            class="pl-6"
          >Смотреть позже</v-list-item>
          <v-list-item :to="{name: 'result', params:{type:'favorite'}}" class="pl-6">Избранное</v-list-item>
          <v-list-item :to="{name: 'result', params:{type:'watched'}}" class="pl-6">Просмотренное</v-list-item>
          <v-list-item disabled class="pl-6">Подписки</v-list-item>
          <v-divider></v-divider>
          <v-list-item disabled class="pl-6">Подключить устройство</v-list-item>
          <v-list-item :to="{name: 'profile'}" class="pl-6">Настройки</v-list-item>
          <v-list-item @click="logout()" class="pl-6">Выход</v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  name: 'TheHeaderProfile',
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch('signOut');
      this.$router.push('/login');
    },
  },
};
</script>
<style scoped>
.v-list > .v-list-item-group > .v-list-item:hover {
  color: #2f7cda !important;
}
</style>
