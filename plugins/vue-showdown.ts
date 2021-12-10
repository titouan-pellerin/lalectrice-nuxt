import { defineNuxtPlugin } from "#app";
import { VueShowdownPlugin, showdown } from "vue-showdown";

// showdown.setFlavor("github");

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueShowdownPlugin);
});
