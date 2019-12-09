<template>
  <v-card width="400" class="d-flex flex-column align-center mx-auto mt-5 pb-2">
    <v-card-text>
      <v-img
        contain
        height="400"
        src="https://i.pinimg.com/originals/92/d7/ca/92d7ca41cde458798778eca8e228c837.jpg"
      ></v-img>
    </v-card-text>
    <v-card-actions>
      <v-form @submit.prevent="submit()" ref="form">
        <v-text-field
          v-model.trim.lazy="form.email"
          background-color="grey darken-4"
          autofocus
          prepend-inner-icon="mdi-email"
          label="Email"
          solo
          required
          autocomplete
          clearable
          :rules="emailRules"
          :error="!!storeError"
        ></v-text-field>

        <v-text-field
          background-color="grey darken-4"
          :prepend-inner-icon="showPassword ? 'mdi-lock-open-variant':'mdi-lock'"
          :append-icon="showPassword ? 'mdi-eye':'mdi-eye-off'"
          :type="showPassword ?'text' :  'password'"
          @click:append="showPassword =! showPassword"
          v-model.trim.lazy="form.password"
          solo
          label="Password"
          required
          autocomplete
          :rules="passwordRules"
          :error="!!storeError"
          counter
        ></v-text-field>
        <v-checkbox v-model="registration" color="primary" label="Зарегестрироваться"></v-checkbox>
        <v-btn
          :loading="loading"
          type="submit"
          @submit.prevent="submit"
          block
        >{{!registration ? 'Войти на сайт': 'Зарегестрироваться'}}</v-btn>
      </v-form>
    </v-card-actions>
    <v-snackbar color :timeout="0" :value="storeError">
      <v-icon large color="error">mdi-alert-circle</v-icon>
      <v-list-item>{{ storeError }}</v-list-item>
      <v-divider vertical></v-divider>
      <v-btn color="error" class="ml-0" text @click="$store.dispatch('clearError')">OK Boomer</v-btn>
    </v-snackbar>
  </v-card>
</template>
<script>
export default {
  name: 'TheLogin',

  metaInfo: {
    title: 'Login',
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length > 8) || 'Password must be more than 8 characters',
      ],
      registration: false,
      showPassword: false,
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    storeError() {
      return this.$store.getters.error;
    },
  },
  methods: {
    submit() {
      // Проверяем валидность формы
      // console.log(this.$refs.form);

      if (this.$refs.form.validate()) {
        // Достаем данные из формы
        const { email, password } = this.form;
        if (this.registration) {
          //Регистрируем
          this.$store.dispatch('registration', { email, password }).then(() => {
            this.$router.push('/').catch((e) => {
              throw e;
            });
          });
        } else {
          //Логиним пользователя
          this.$store.dispatch('logIn', { email, password }).then(() => {
            this.$router.push('/').catch((e) => {
              throw e;
            });
          });
        }
      }
    },
  },
};
</script>