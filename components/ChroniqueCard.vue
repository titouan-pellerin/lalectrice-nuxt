<template>
  <nuxt-link :to="'/chroniques/' + book.slug">
    <img v-if="book.couverture" :src="book.couverture.url" />
    <img v-else src="@/assets/images/placeholder.jpg" />
    <h2 v-if="title">{{ title }}</h2>
    <h2 v-else>{{ book.titre }}</h2>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ILivre } from "~~/typings";

export default defineComponent({
  props: {
    book: {
      type: Object as PropType<ILivre>,
      required: true,
    },
    title: {
      type: String,
      required: false,
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
