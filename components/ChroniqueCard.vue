<template>
  <nuxt-link :to="'/chroniques/' + book.slug">
    <img :src="book.couverture ? book.couverture.url : 'assets/img/placeholder.jpg'" />
    <h2>{{ book.titre }}</h2>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
img {
  height: 300px;
}

a {
  text-decoration: none;
  color: #000;
}
</style>
