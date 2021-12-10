import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$router.options.scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
      to.meta.fromHistory = true;
      return savedPosition;
    } else {
      return { top: 0 };
    }
  };
});
