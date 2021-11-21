<template>
  <nuxt-link :to="'/chroniques/' + book.slug">
    <img :src="coverUrl" />
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
  computed: {
    coverUrl() {
      return this.book.couverture
        ? this.book.couverture.url
        : "../assets/img/placeholder.jpg";
    },
  },
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
