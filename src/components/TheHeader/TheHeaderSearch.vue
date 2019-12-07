<template>
  <v-col class="d-flex align-center">
    <!-- <v-btn slot="prepend" text>
      <v-icon @click.stop="search">mdi-magnify</v-icon>
    </v-btn>-->
    <v-text-field
      v-model.trim="query"
      @keyup="search"
      height="66"
      class="input_search"
      hide-details
      color="#1e1e1e"
      dense
      type="text"
      placeholder="Найти"
      clearable
      flat
    ></v-text-field>
  </v-col>
</template>

<script>
export default {
  name: 'TheHeaderSearch',
  data() {
    return { query: '', timerId: null };
  },

  methods: {
    search() {
      // убираем предыдущий запрос по id таймаута
      clearTimeout(this.timerId);

      // если строка поиска пустая
      if (!this.query) {
        // и мы не на главной
        if (this.$route.path !== '/') {
          // переходим на главную
          this.$router.push('/');
          return;
        }
        // Иначе просто ничего не делаем
        return;
      }
      /* 
       иначе делаем запрос с задержкой
       задержка нужна чтобы, удалять предыдущие запросы пока пользователь еще вводит текст
      */

      //  сохраняем id таймаута
      this.timerId = setTimeout(() => {
        // делаем запрос только если он НОВЫЙ и не совпадает уже с текущим результатом
        if (this.$route.query.q !== this.query) {
          this.$router
            .push({
              name: 'result',
              query: { q: this.query },
              params: {
                title: `Поиск: ${this.query}`,
                type: 'search',
                id: 0,
              },
            })
            .catch((error) => {
              throw error;
            });
        }
      }, 300);
    },
  },
  watch: {
    // query: function(newVal) {
    // 	!newVal ? this.$router.push('/') : '';
    // },
  },
};
</script>
<style lang="scss" scoped>
.input_search {
  & ::after,
  ::before {
    display: none !important;
  }
  & :focus {
    background-color: #fff !important;

    color: black !important;
  }
  background-color: #1e1e1e !important;
}
</style>