<template>
  <div class="chroniques">
    <h1>Chroniques</h1>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Rechercher une chronique par mot clé"
      @input="$searchBooks(searchQuery)"
    />
    <ul>
      <li v-for="book in books" :key="book.id">
        <chronique-card :book="book"></chronique-card>
      </li>
    </ul>
    <button @click="$fetchBooks()">Voir plus</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  async setup() {
    let books = useBooks();
    if (books.value.length === 0) {
      books = await useNuxtApp().$fetchBooks();
    }
    return { books };
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
