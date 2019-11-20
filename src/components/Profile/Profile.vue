<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-file-input
        prepend-icon
        prepend-inner-icon="mdi-file"
        solo
        color="white"
        class="mb-4 align-baseline"
        label="Выбрать аватарку"
      >
        <v-btn slot="append-outer">
          <v-icon left>mdi-lead-pencil</v-icon>Изменить
        </v-btn>
      </v-file-input>

      <v-text-field
        v-for="input in inputs"
        :key="input.label"
        color="white"
        class="my-4 align-baseline"
        solo
        :prepend-inner-icon="input.icon"
        hide-details
        clearable
        :label="input.label"
        :type="input.type"
      >
        <v-btn slot="append-outer">
          <v-icon left>mdi-lead-pencil</v-icon>Изменить
        </v-btn>
      </v-text-field>
      <v-divider class="my-10"></v-divider>
      <v-card class="px-3 pb-5 pt-1 mb-4" :key="radio.label" v-for="(radio, index) in radios">
        <v-radio-group
          :mandatory="false"
          :label="radio.label"
          hide-details
          v-model="radiosAnswer[index]"
        >
          <v-radio
            color="white"
            v-for="(answer, index) in radio.answers"
            :key="answer"
            :label="answer"
            :value="index"
          ></v-radio>
        </v-radio-group>
      </v-card>
      <v-divider class="my-7"></v-divider>
      <div class="d-flex justify-space-between">
        <v-btn large outlined color="error">
          <v-icon left>mdi-cancel</v-icon>Отменить
        </v-btn>
        <v-btn large color="success" outlined>
          <v-icon left>mdi-content-save</v-icon>Сохранить
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Profile',
  data: () => ({
    radiosAnswer: [],
    inputs: [
      { label: 'Имя', type: 'text', icon: 'mdi-account-circle' },
      { label: 'Почта', type: 'email', icon: 'mdi-mail' },
      { label: 'Пароль', type: 'password', icon: 'mdi-lock' },
    ],
    radios: [
      {
        label: 'Показывать фильмы с рекламой ?',
        answers: [
          'Скрывать из моей ленты до появления версии без рекламы',
          ' Показывать, но предупреждать о такой рекламе',
          'Показывать и не предупреждать о рекламе',
        ],
      },
      {
        label: 'Приоритет видеопотока',
        answers: ['HLS', 'mp4'],
      },
      {
        label: 'Приоритет рейтинга',
        answers: ['IMDB', 'Кинопоиск'],
      },
    ],
    tabs: [
      { title: 'Настройки', value: 'tab1' },
      { title: 'Оплата доступа', value: 'tab2' },
      { title: 'Истории платежей', value: 'tab3' },
      { title: 'Устройства', value: 'tab4' },
      { title: 'Сессии', value: 'tab5' },
    ],
  }),
  methods: {
    deletePhoto() {
      this.$store.dispatch('updatePhoto', null);
    },
    handleClick(newTab) {
      this.currentTab = newTab;
    },
    changeAvatar(event) {
      const file = event.target.files[0];
      this.$store.dispatch('updatePhoto', file);
    },
    updateUserInfo() {
      const { login, email } = this.$data;
      this.$store.dispatch('updateProfile', { login, email });
    },
  },
};
</script>
