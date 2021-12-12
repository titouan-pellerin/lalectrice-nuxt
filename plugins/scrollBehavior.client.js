import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$router.options.scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
      to.meta.fromHistory = true;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(savedPosition)
        }, 200)
      });
    } else {
      return { left: 0, top: 0 }
    }
  };
});
