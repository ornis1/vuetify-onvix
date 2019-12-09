<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-row class="ma-0">
        <v-col cols="4">
          <v-img height="200" width="200" aspect-ratio="1" class="user_img grey" :src="img">
            <v-icon v-if="img" @click="deletePhoto" class="icon_close" right>mdi-close</v-icon>
            <v-icon v-if="!img" large class="icon_camera">mdi-camera</v-icon>
          </v-img>
        </v-col>
        <input class="d-flex align-self-end mb-4" type="file" @change="changeAvatar" />
      </v-row>
      <v-form v-for="input in form.inputs" :key="input.label" @submit.prevent="update(input.model)">
        <v-text-field
          color="white"
          class="my-4 align-baseline"
          solo
          :prepend-inner-icon="input.icon"
          clearable
          autocomplete
          v-model.trim.lazy="$v.form[input.model].$model"
          :success="success(input.model)"
          :error-messages="error(input.model)"
          v-model="form[input.model]"
          :label="input.label"
          :type="input.type"
        >
          <v-btn @click.prevent="update(input.model)" slot="append-outer">
            <v-icon left>mdi-lead-pencil</v-icon>Изменить
          </v-btn>
        </v-text-field>
      </v-form>
      <v-divider class="my-10"></v-divider>
      <v-card class="px-3 pb-5 pt-1 mb-4" :key="radio.label" v-for="(radio, index) in form.radios">
        <v-radio-group
          :mandatory="false"
          :label="radio.label"
          hide-details
          v-model="form.radiosAnswer[index]"
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
/* eslint-disable  */
import { validationMixin } from 'vuelidate';
import { minLength, email } from 'vuelidate/lib/validators';

export default {
  name: 'Profile',

  data: () => ({
    form: {
      name: '',
      email: '',
      password: '',
      inputsAnswer: [],
      inputs: [
        {
          label: 'Имя',
          type: 'text',
          model: 'name',
          icon: 'mdi-account-circle',
        },
        { label: 'Почта', type: 'email', model: 'email', icon: 'mdi-mail' },
        {
          label: 'Пароль',
          type: 'password',
          model: 'password',
          icon: 'mdi-lock',
        },
      ],
      radiosAnswer: [],
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
    },
  }),
  metaInfo: {
    title: 'Profile',
  },
  mixins: [validationMixin],
  validations: {
    form: {
      email: {
        email,
      },
      name: {
        minLength: minLength(3),
      },
      password: {
        minLength: minLength(8),
      },
    },
  },
  computed: {
    img() {
      /* eslint-disable  */
      const avatar = this.$store.getters.user.photoUrl;
      return avatar ? avatar : '';
    },
  },
  methods: {
    success(input) {
      return !this.$v.form[input].$invalid && !!this.$v.form[input].$model;
    },
    error(input) {
      const errors = [];
      this.$v.form[input].$touch();
      const { minLength, email } = this.$v.form[input];
      if (!this.$v.form[input].$dirty) return errors;
      const obj = {
        name: () => {
          !minLength && errors.push('Name must be at most 3 characters');
        },
        email: () => {
          !email && errors.push('Email must be a valid');
        },
        password: () => {
          !minLength && errors.push('Password must be at most 8 characters');
        },
      };
      obj[input]();
      return errors;
    },
    update(value) {
      const functions = {
        name: this.updateName,
        email: this.updateEmail,
        password: this.updatePassword,
      };
      if (this.success(value)) {
        functions[value]();
      }
    },
    /* Обновляем имя пользователя */
    updateName() {
      this.$store.dispatch('updateName', { name: this.form.name });
    },
    /* Обновляем пароль пользователя */
    updatePassword() {
      this.$store.dispatch('updatePassword', { password: this.form.password });
    },
    /* Обновляем почту пользователя */
    updateEmail() {
      this.$store.dispatch('updateEmail', { email: this.form.email });
    },
    /* Уцдаляем фотку пользователя */
    deletePhoto() {
      const url = this.img;
      this.$store.dispatch('deletePhoto', url);
    },
    /* Обновляем фотку пользователя */
    changeAvatar(event) {
      const file = event.target.files[0];
      this.$store.dispatch('updatePhoto', file);
    },
  },
};
</script>
<style lang="scss" scoped>
.user_img {
  position: relative;
  align-items: center;
}
.icon {
  &_close {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
  &_camera {
    display: flex;
    align-items: center;
  }
}
</style>