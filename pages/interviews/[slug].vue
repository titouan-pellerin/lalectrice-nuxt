<template>
  <div v-if="interview" class="interview">
    <h1 v-if="interview.titre" class="title">
      {{ interview.titre }}
    </h1>
    <nuxt-link v-if="interview.auteur" :to="'/auteurs/' + interview.auteur.slug"
      >Voir l'auteur</nuxt-link
    >
    <p v-if="interview.date" class="date">
      Date : {{ new Date(interview.date).toLocaleDateString() }}
    </p>
    <img v-if="interview.photo" :src="interview.photo.url" />
    <p v-if="interview.photo">{{ interview.photo.caption }}</p>
    <client-only>
      <vue-showdown
        class="content"
        :markdown="interview.contenu"
        flavor="github"
      ></vue-showdown>
    </client-only>
  </div>
  <div v-else class="error">
    <h1>Éditeur introuvable</h1>
  </div>
</template>

<script lang="ts">
import { AsyncData } from "nuxt3/dist/app/composables/asyncData";
import { IInterview } from "~~/typings";

export default defineComponent({
  async setup() {
    const config = useRuntimeConfig();
    const interviews = useInterviews();
    const routeSlug = useRoute().params.slug;

    let filteredInterviews: IInterview[] | null = null;
    if (interviews && interviews.value.length > 0) {
      filteredInterviews = interviews.value.filter(
        (interview) => interview.slug === routeSlug
      );
    }

    if (filteredInterviews && filteredInterviews.length === 1)
      return { interview: filteredInterviews[0] };

    const { data: interview } = (await useFetch(
      config.API_URL + "/interviews?slug=" + useRoute().params.slug
    )) as AsyncData<IInterview[]>;
    if (interview && interview.value.length === 1)
      return { interview: interview.value[0] };
    return { interview: null };
  },
});
</script>
