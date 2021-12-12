import {
  useInterviews,
  useInterviewsQueryString,
  useInterviewsOffset,
  useInterviewsQuery,
} from "../composables/interviews";
import { IInterview } from "~~/typings";
import { defineNuxtPlugin } from "#app";
import { stringify } from "qs";

export default defineNuxtPlugin((nuxtApp) => {
  const interviews = useInterviews();
  const interviewsOffset = useInterviewsOffset();
  const interviewsQuery = useInterviewsQuery();
  const currentInterviewsQueryString = useInterviewsQueryString();

  const config = useRuntimeConfig();

  nuxtApp.provide("fetchInterviews", async () => {
    interviews.value.push(...(await fetchInterviewsData()));

    interviewsOffset.value += 20;
    return interviews;
  });

  nuxtApp.provide("searchInterviews", async (searchQuery: string) => {
    searchQuery = searchQuery.trim();

    if (
      !(currentInterviewsQueryString.value === searchQuery) &&
      searchQuery.length > 0
    ) {
      interviewsQuery.value = stringify({
        _limit: 20,
        _start: 0,
        _sort: "date:DESC",
        // _where: {
        //   _or: [
        //     { titre_contains: searchQuery },
        //     { isbn: searchQuery },
        //     { "editeur.nom_contains": searchQuery },
        //     { "chronique.contenu_contains": searchQuery },
        //     { description_contains: searchQuery },
        //     { "auteurs.nom_contains": searchQuery },
        //     { "auteurs.description_contains": searchQuery },
        //     { "auteurs.biographie_contains": searchQuery },
        //     { "collection_livre.nom_contains": searchQuery },
        //   ],
        // },
      });
      interviewsOffset.value = 0;
      interviews.value = await fetchInterviewsData();
      interviewsOffset.value = 20;

      currentInterviewsQueryString.value = searchQuery;
    }
  });

  const fetchInterviewsData = async () => {
    interviewsQuery.value = interviewsQuery.value.replace(
      /_start=\d{0,}/,
      "_start=" + interviewsOffset.value
    );
    const interviewsData = (await $fetch(
      `${config.API_URL}/interviews?${interviewsQuery.value}`
    )) as IInterview[];

    return interviewsData;
  };
});
