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
          v-model="field1"
          background-color="grey darken-4"
          autofocus
          prepend-inner-icon="mdi-account-circle"
          label="Имя"
          solo
          required
        ></v-text-field>

        <v-text-field
          background-color="grey darken-4"
          prepend-inner-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye':'mdi-eye-off'"
          :type="showPassword ?'text' :  'password'"
          @click:append="showPassword =! showPassword"
          v-model="field2"
          solo
          label="Пароль"
          required
        ></v-text-field>
        <v-checkbox v-model="check" color="primary" label="Зарегестрироваться"></v-checkbox>
        <v-btn block color type="submit">{{!check ? 'Войти на сайт': 'Зарегестрироваться'}}</v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "TheLogin",
  data() {
    return {
      field1: "",
      field2: "",
      check: false,
      showPassword: false
    };
  }
};
</script>