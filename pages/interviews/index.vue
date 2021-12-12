<template>
  <div class="interviews">
    <h1>Interviews</h1>
    <ul>
      <li v-for="interview in interviews" :key="interview.id">
        <nuxt-link :to="'/interviews/' + interview.slug">
          <img v-if="interview.photo" :src="interview.photo.url" />
          <p v-if="interview.date">
            {{ new Date(interview.date).toLocaleDateString() }}
          </p>
          <h2>{{ interview.titre }}</h2>
        </nuxt-link>
      </li>
    </ul>
    <button @click="$fetchInterviews()">Voir plus</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  async setup() {
    // const route = useRoute();
    const nuxtApp = useNuxtApp();

    let interviews = useInterviews();
    if (interviews.value.length === 0) {
      interviews = await nuxtApp.$fetchInterviews();
    }

    return { interviews };
  },
  data() {
    return {
      searchQuery: "",
    };
  },
});
</script>

<style lang="scss" scoped>
.chroniques {
  display: flex;
  flex-direction: column;
  align-items: center;

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    justify-content: center;
  }

  li {
    margin: 10px;
  }
}

button {
  border: 0;
  padding: 10px;
  cursor: pointer;
}
</style>
