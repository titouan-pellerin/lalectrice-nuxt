import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
  typescript: {
    strict: true,
  },
});
