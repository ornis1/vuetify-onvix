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
      <v-form>
        <v-text-field
          v-model.trim.lazy="$v.form.email.$model"
          background-color="grey darken-4"
          autofocus
          prepend-inner-icon="mdi-email"
          label="Email"
          solo
          required
          autocomplete
          clearable
          :success="success('email')"
          :error-messages="error('email')"
          :error="!!storeError"
        ></v-text-field>

        <v-text-field
          background-color="grey darken-4"
          :prepend-inner-icon="showPassword ? 'mdi-lock-open-variant':'mdi-lock'"
          :append-icon="showPassword ? 'mdi-eye':'mdi-eye-off'"
          :type="showPassword ?'text' :  'password'"
          @click:append="showPassword =! showPassword"
          v-model.trim.lazy="$v.form.password.$model"
          solo
          label="Password"
          required
          autocomplete
          :success="success('password')"
          :error-messages="error('password')"
          :error="!!storeError"
          counter
        ></v-text-field>
        <v-checkbox v-model="registration" color="primary" label="Зарегестрироваться"></v-checkbox>
        <v-btn
          :loading="loading"
          @click="submit"
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
import { validationMixin } from 'vuelidate';
import { minLength, required, email } from 'vuelidate/lib/validators';

export default {
  name: 'TheLogin',

  mixins: [validationMixin],
  validations: {
    form: {
      email: {
        email,
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
  metaInfo: {
    title: 'Login',
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
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
    success(input) {
      return !this.$v.form[input].$invalid && !!this.$v.form[input].$model;
    },
    error(input) {
      const errors = [];
      this.$v.form[input].$touch();
      const { minLength, email } = this.$v.form[input];
      if (!this.$v.form[input].$dirty) return errors;
      const obj = {
        email: () => {
          !required && errors.push('Email is required');
          !email && errors.push('Email must be a valid');
        },
        password: () => {
          !required && errors.push('Password is required');
          !minLength && errors.push('Password must be at most 8 characters');
        },
      };
      obj[input]();
      return errors;
    },
    submit() {
      this.$v.form.$touch();

      // Проверяем валидность формы
      if (!this.$v.$invalid) {
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