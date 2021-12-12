import { Ref } from "vue";
import { ILivre } from "~~/typings";

declare module "#app" {
  interface NuxtApp {
    $fetchBooks(): Ref<ILivre[]>;
    $searchBooks(searchQuery: string): void;
    $removeBooks(): void;
    $getCountry(code: string): string;
  }
}
