<template>
  <div v-if="editor" class="editor">
    <h1>{{ editor.nom }}</h1>
    <p v-if="editor.description">Description: {{ editor.description }}</p>
    <a v-if="editor.lien">Lien: {{ editor.lien }}</a>
    <img v-if="editor.logo" :src="editor.logo.url" />
    <div>
      <h2>Livres chroniqués :</h2>
      <ul class="editor-books">
        <li v-for="book in editor.livres" :key="book.id">
          <chronique-card :book="book"></chronique-card>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="error">
    <h1>Éditeur introuvable</h1>
  </div>
</template>

<script lang="ts">
import { AsyncData } from "nuxt3/dist/app/composables/asyncData";
import { defineComponent } from "vue";
import { IEditeur } from "~~/typings";

export default defineComponent({
  async setup() {
    const config = useRuntimeConfig();

    const { data: editor } = (await useFetch(
      config.API_URL + "/editeurs?slug=" + useRoute().params.slug
    )) as AsyncData<IEditeur[]>;
    if (editor && editor.value.length === 1) return { editor: editor.value[0] };
    return { editor: null };
  },
});
</script>
