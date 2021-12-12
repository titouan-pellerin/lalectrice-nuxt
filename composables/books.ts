import { ILivre } from "../typings/livre";

import * as qs from "qs";

export const useBooks = () => {
  return useState<ILivre[]>("books", () => []);
};

export const useBooksOffset = () => {
  return useState<number>("booksOffset", () => 0);
};

export const useBooksQuery = () => {
  return useState<string>("booksQuery", () => {
    return qs.stringify({
      _limit: 20,
      _start: 0,
      _sort: "chronique.publication:DESC",
    });
  });
};

export const useBooksQueryString = () =>
  useState<string>("booksQueryString", () => "");
