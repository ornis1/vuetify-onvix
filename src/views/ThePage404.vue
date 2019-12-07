<template>
  <div>
    <v-row class="py-10 mt-10">
      <v-col offset-md="2" offset-sm="1" offset="1" sm="6" md="4">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="mb-10">
              <router-link :to="{name:'home', path: '/'}">
                <v-img height="35" contain src="@/assets/Logo.svg"></v-img>
              </router-link>
            </v-list-item-title>

            <v-list-item-subtitle class="mb-4 white--text body-1">404. That’s an error.</v-list-item-subtitle>
            <v-list-item-subtitle
              class="white--text"
            >The requested URL {{$route.path}} was not found on this server. That’s all we know.</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-btn right :to="{name:'home', path: '/'}">На главную</v-btn>
      </v-col>
      <v-col cols="6" sm="5" xs="12">
        <v-img src="https://i.gifer.com/7VE.gif"></v-img>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'ThePage404',
  metaInfo: {
    title: 'Error 404 (Not Found)!!',
  },
};
</script>
<style lang="scss" scoped>
.v-row {
  height: 100%;
  width: 100%;
}
</style>