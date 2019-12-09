<template>
  <v-menu left offset-y :close-on-content-click="false">
    <template v-slot:activator="{on}">
      <v-btn v-on="on" text tile height="66" width="66">
        <v-avatar>
          <img v-if="avatar" :src="avatar" alt />
          <v-icon v-else large>mdi-account-circle</v-icon>
        </v-avatar>
      </v-btn>

      <!-- <v-btn height="66" text v-on="on">asd</v-btn> -->
    </template>
    <v-card light width="260">
      <v-list>
        <v-list-item-group color="#2f7cda">
          <v-list-item class="pl-6">
            <v-list-item-avatar>
              <v-img v-if="avatar" :src="avatar"></v-img>
              <v-icon v-else large>mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{name}}</v-list-item-title>
              <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
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
  computed: {
    name() {
      return this.user !== null ? this.user.name : '';
    },
    email() {
      return this.user !== null ? this.user.email : '';
    },
    user() {
      return this.$store.getters.user;
    },
    avatar() {
      return this.user !== null ? this.user.photoUrl : '';
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('signOut').then(() => {
        this.$router.push('/login').catch((error) => {
          throw error;
        });
      });
    },
  },
};
</script>
<style scoped>
.v-list > .v-list-item-group > .v-list-item:hover {
  color: #2f7cda !important;
}
</style>
