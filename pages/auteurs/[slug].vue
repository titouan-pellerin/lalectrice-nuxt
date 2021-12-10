<template>
  <div v-if="author">
    <h1>{{ author.nom }}</h1>
    <p v-if="author.description">Description : {{ author.description }}</p>
    <p v-if="author.biographie">Biographie : {{ author.biographie }}</p>
    <p v-if="author.nationalite">Nationalité : {{ author.nationalite }}</p>
    <img v-if="author.photo" :src="author.photo.url" />
    <div class="author-books">
      <h2>Livres chroniqués :</h2>
      <ul v-if="author.livres">
        <li v-for="book in author.livres" :key="book.id">
          <chronique-card :book="book"></chronique-card>
        </li>
      </ul>
    </div>
    <div class="author-interview">
      <h2>Interviews :</h2>
      <ul v-if="author.interviews">
        <li v-for="interview in author.interviews" :key="interview.id">
          <nuxt-link :to="'/interviews/' + author.slug">{{ interview.titre }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="error">
    <h1>Auteur introuvable</h1>
  </div>
</template>

<script lang="ts">
import { AsyncData } from "nuxt3/dist/app/composables/asyncData";
import { defineComponent } from "vue";
import { IAuteur } from "~~/typings";

export default defineComponent({
  async setup() {
    const config = useRuntimeConfig();

    const { data: author } = (await useFetch(
      config.API_URL + "/auteurs?slug=" + useRoute().params.slug
    )) as AsyncData<IAuteur[]>;
    if (author && author.value.length === 1) return { author: author.value[0] };
    return { author: null };
  },
});
</script>
