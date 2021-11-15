<template>
    <div class="chroniques">
        <h1>Chroniques</h1>
        <ul v-for="book in books" :key="book.id">
            <li>
                <nuxt-link
                    :to="'/chroniques/' + book.slug"
                >{{ book.titre }} - {{ book.chronique?.publication }}</nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { AsyncData } from 'nuxt3/dist/app/composables/asyncData';
import { defineComponent } from 'vue';
import { ILivre } from '~~/typings';

export default defineComponent({
    async setup() {
        const config = useRuntimeConfig();

        const { data: books } = await useFetch(config.API_URL + '/livres?_limit=800&_sort=chronique.publication:ASC', { key: 'chroniques' }) as AsyncData<ILivre[]>;
        if (books.value && books.value.length > 0) return { books, config };
        return { books: null, config };
    },

})
</script>
