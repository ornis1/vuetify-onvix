<template>
  <div>
    <v-card light height="305">
      <v-row>
        <v-col sm="3" class="pa-0">
          <v-list flat class="grey lighten-3 blue--text border-left">
            <v-list-item-group mandatory v-model="model" active-class="active">
              <v-list-item v-for="link in links" :key="link">
                <span class="pl-10">{{link}}</span>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <span class="pl-10">Подборки</span>
              </v-list-item>
              <v-list-item>
                <span class="pl-10">Фильтры</span>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-divider vertical></v-divider>
        <ul class="my_list">
          <li v-for="i in 8" :key="i">
            <v-btn active-class="active" text tile width="216" height="48">{{links[model]}}</v-btn>
          </li>
        </ul>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: 1,
      loading: true,
      links: ['Фильмы', 'Сериалы', 'Мультфильмы', 'Аниме'],
    };
  },
};
</script>
<style  scoped>
.active {
  border-left: 4px solid #24b2d8;
  background-color: #fff !important;
}
.active::before {
  visibility: hidden;
}
.my_list {
  padding: 8px 0;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  height: 305px;
  width: auto;
}
.my_list li {
  width: 216px;
}

.my_list li .v-btn:hover {
  color: #24b2d8 !important;
  transition: none;
}
</style>
