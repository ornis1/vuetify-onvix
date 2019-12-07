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
          :success="emailSuccess"
          :error-messages="emailErrors"
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
          :success="passwordSuccess"
          :error-messages="passwordErrors"
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
        email: 'asda@asd.cas',
        password: 'asda@asd.cas',
      },
      registration: false,
      showPassword: false,
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    emailSuccess() {
      return !this.$v.form.email.$invalid && !!this.$v.form.email.$model;
    },
    passwordSuccess() {
      return !this.$v.form.password.$invalid && !!this.$v.form.password.$model;
    },
    emailErrors() {
      const { email, required } = this.$v.form.email;
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !required && errors.push('Email is required');
      !email && errors.push('Email must be a valid');
      return errors;
    },
    passwordErrors() {
      /* eslint-disable no-console */
      const { minLength, required } = this.$v.form.password;
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !required && errors.push('Password is required');
      !minLength && errors.push('Password must be at most 8 characters');
      return errors;
    },
    storeError() {
      return this.$store.getters.error;
    },
  },
  methods: {
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