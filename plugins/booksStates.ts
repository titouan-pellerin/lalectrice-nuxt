import {
  useBooks,
  useBooksQueryString,
  useBooksOffset,
  useBooksQuery,
} from "../composables/books";
import { ILivre } from "~~/typings";
import { defineNuxtPlugin } from "#app";
import { stringify } from "qs";

export default defineNuxtPlugin((nuxtApp) => {
  const books = useBooks();
  const booksOffset = useBooksOffset();
  const booksQuery = useBooksQuery();
  const currentBooksQueryString = useBooksQueryString();

  const config = useRuntimeConfig();

  nuxtApp.provide("fetchBooks", async () => {
    books.value.push(...(await fetchBooksData()));

    booksOffset.value += 20;
    return books;
  });

  nuxtApp.provide("searchBooks", async (searchQuery: string) => {
    searchQuery = searchQuery.trim();

    if (
      !(currentBooksQueryString.value === searchQuery) &&
      searchQuery.length > 0
    ) {
      booksQuery.value = stringify({
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
      booksOffset.value = 0;
      books.value = await fetchBooksData();
      booksOffset.value = 20;

      currentBooksQueryString.value = searchQuery;
    }
  });

  nuxtApp.provide("removeBooks", () => {
    books.value = [];
    booksOffset.value = 0;
    booksQuery.value = stringify({
      _limit: 20,
      _start: 0,
      _sort: "chronique.publication:DESC",
    });
  });

  const fetchBooksData = async () => {
    booksQuery.value = booksQuery.value.replace(
      /_start=\d{0,}/,
      "_start=" + booksOffset.value
    );
    const booksData = (await $fetch(
      `${config.API_URL}/livres?${booksQuery.value}`
    )) as ILivre[];

    return booksData;
  };
});
