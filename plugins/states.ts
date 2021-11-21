import { useOffset } from "./../composables/books";
import { ILivre } from "~~/typings";
import { defineNuxtPlugin } from "#app";

import * as qs from "qs";

export default defineNuxtPlugin((nuxtApp) => {
  const books = useBooks();
  const offset = useOffset();

  const config = useRuntimeConfig();

  nuxtApp.provide("fetchBooks", async () => {
    const booksData = (await $fetch(
      `${config.API_URL}/livres?_limit=20&_start=${offset.value}&_sort=chronique.publication:DESC`
    )) as ILivre[];

    books.value.push(...booksData);
    offset.value += 20;
    return books;
  });

  nuxtApp.provide("searchBooks", async (searchQuery: string) => {
    const query = qs.stringify({
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
        ],
      },
    });
    const queryBooks = (await $fetch(
      `${config.API_URL}/livres?${query}`
    )) as ILivre[];
    books.value = queryBooks;
    offset.value = 10;
    console.log(books.value);

    return books;
  });
});

declare module "#app" {
  interface NuxtApp {
    $fetchBooks(): Ref<ILivre[]>;
    $searchBooks(): Ref<ILivre[]>;
  }
}
