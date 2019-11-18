<template>
  <div>
    <v-skeleton-loader
      :loading="loading"
      type="card-heading,image,list-item"
      width="200"
      height="332"
    >
      <v-hover v-slot:default="{ hover }">
        <v-card :class="{'hover' : hover }" width="200" color="transparent" flat>
          <v-img
            src="https://image.tmdb.org/t/p/w300/rr1rALpZT6VaGmVPekCiQKLeMIs.jpg"
            :class="[hover ? 'hover-gradient': '']"
          >
            <v-card-title class="pa-2 justify-space-between">
              <v-chip label color="#ffc000" class="black--text font-weight-regular" active>HD</v-chip>
              <v-btn fab text small>
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text :class="['mt-12', hover ? 'visibility': 'hidden']">
              <v-btn height="32" class="body-2 my-4" block color="primary">Смотерть</v-btn>
              <v-btn
                height="32"
                class="body-2 my-4 btn--hover"
                color="white"
                block
                outlined
              >Описание</v-btn>
            </v-card-text>
            <p :class="['body-2', 'text-center', 'mb-0', 'mt-12', hover ? 'visibility': 'hidden']">
              IMDb: 7,7
              / 2019
            </p>
          </v-img>
          <v-card-actions>
            <span
              :class="['subtitle-2', 'grey--text', ,hover ? 'text--lighten-5': 'text--lighten-1']"
            >Название фильма</span>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-skeleton-loader>
  </div>
</template>
<script>
export default {
  data() {
    return { loading: true };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 400);
  }
};
</script>
<style lang="scss" scoped>
.v-chip {
  z-index: 3;
}
.v-card {
  position: relative;
}
.hover {
  transform: scale(1.1);
  transition: 0.3s;
}
.hover-gradient::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    rgba(23, 23, 23, 0.5) 0%,
    rgb(36, 178, 216) 100%
  );
}
.hidden {
  visibility: hidden;
}
.visible {
  visibility: visible;
}
.v-btn {
  &.btn--hover:hover {
    transition: 0.2s;
    border: none;
    background-color: #fff;
    color: black !important;
  }
  & .mdi-menu {
    color: rgba(0, 0, 0, 0.2);
    &:hover {
      color: white !important;
    }
  }
}
</style>