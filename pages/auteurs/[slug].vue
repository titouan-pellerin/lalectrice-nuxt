<template>
  <div v-if="author">
    <h1>{{ author.nom }}</h1>
    <p v-if="author.description">Description : {{ author.description }}</p>
    <p v-if="author.biographie">Biographie : {{ author.biographie }}</p>
    <p v-if="author.nationalite">Nationalité : {{ author.nationalite }}</p>
    <img v-if="author.photo" :src="author.photo.url" />
    <div class="chroniques">
      <ul v-if="author.livres">
        <li v-for="livre in author.livres" :key="livre.id">
          <router-link :to="'/chroniques/' + livre.slug">{{ livre.titre }}</router-link>
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
