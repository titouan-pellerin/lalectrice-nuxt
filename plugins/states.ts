import {
  useOffset,
  useBooks,
  useQuery,
  useQueryString,
} from "./../composables/books";
import { ILivre } from "~~/typings";
import { defineNuxtPlugin } from "#app";

import * as qs from "qs";

export default defineNuxtPlugin((nuxtApp) => {
  const books = useBooks();
  const offset = useOffset();
  const query = useQuery();
  const currentQueryString = useQueryString();

  const config = useRuntimeConfig();

  nuxtApp.provide("fetchBooks", async () => {
    books.value.push(...(await fetchBooksData()));

    offset.value += 20;
    console.log(offset.value);

    return books;
  });

  nuxtApp.provide("searchBooks", async (searchQuery: string) => {
    searchQuery = searchQuery.trim();

    if (!(currentQueryString.value === searchQuery)) {
      query.value = qs.stringify({
        _limit: 20,
        _start: 0,
        _sort: "chronique.publication:DESC",
        _where: {
          _or: [
            { titre_contains: searchQuery },
            { isbn: searchQuery },
            { "editeur.nom_contains": searchQuery },
            { "chronique.contenu_contains": searchQuery },
            { description_contains: searchQuery },
            { "auteurs.nom_contains": searchQuery },
            { "auteurs.description_contains": searchQuery },
            { "auteurs.biographie_contains": searchQuery },
            { "collection_livre.nom_contains": searchQuery },
          ],
        },
      });
      offset.value = 0;
      books.value = await fetchBooksData();
      offset.value = 20;

      console.log(offset.value);

      currentQueryString.value = searchQuery;
    }
  });

  nuxtApp.provide("removeBooks", () => {
    books.value = [];
    query.value = qs.stringify({
      _limit: 20,
      _start: 0,
      _sort: "chronique.publication:DESC",
    });
    console.log("here");
  });

  const fetchBooksData = async () => {
    query.value = query.value.replace(
      /_start=\d{0,}/,
      "_start=" + offset.value
    );
    const booksData = (await $fetch(
      `${config.API_URL}/livres?${query.value}`
    )) as ILivre[];

    return booksData;
  };
});

declare module "#app" {
  interface NuxtApp {
    $fetchBooks(): Ref<ILivre[]>;
    $searchBooks(searchQuery: string): void;
    $removeBooks(): void;
  }
}
