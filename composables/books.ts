import { ILivre } from "../typings/livre";
import { useState } from "#app";

import * as qs from "qs";

export const useBooks = () => {
  return useState<ILivre[]>("books", () => []);
};

export const useOffset = () => {
  return useState<number>("offset", () => 0);
};

export const useQuery = () => {
  return useState<string>("query", () => {
    return qs.stringify({
      _limit: 20,
      _start: 0,
      _sort: "chronique.publication:DESC",
    });
  });
};

export const useQueryString = () => useState<string>("queryString", () => "");
