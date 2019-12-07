<template>
  <v-container fluid class="px-0">
    <!-- WITH SMALL CARD -->
    <v-responsive v-show="hover && !isBig" class="text-center">
      <v-flex class="caption grey--text text--lighten-2">IMDb: {{rating}}&nbsp;/{{year}}</v-flex>
    </v-responsive>

    <!-- WITH BIG CARD -->
    <v-responsive v-if="!hover && isBig" class>
      <v-flex class="body-1 font-weight-bold">{{movie.title}}</v-flex>
      <v-flex class="body-2 grey--text text--lighten-2">IMDb: {{rating}}&nbsp;/{{year}}</v-flex>
    </v-responsive>
  </v-container>
</template>

<script>
export default {
	name: 'MovieCardFooter',
	props: {
		hover: {
			type: Boolean,
			required: true,
			default: false,
		},
		size: {
			type: String,
			required: true,
			default: 'small',
		},
		movie: {
			type: Object,
			required: true,
			default: () => {},
		},
	},
	computed: {
		isBig() {
			return this.size === 'big';
		},
		rating() {
			const rating = this.movie.vote_average;
			if (rating.length <= 1) {
				return `${rating},0`;
			}
			return `${rating}`.split('.').join(',');
		},
		year() {
			const date = this.movie.release_date;
			return date ? Number(date.slice(0, 4)) : new Date().getFullYear();
		},
	},
};
</script>
